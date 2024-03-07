import Button from "@/components/Button";
import CardManga from "@/components/CardManga";
import SkeletonManga from "@/components/SkeletonManga";
import useMangas from "@/hooks/useMangas";
import MainLayout from "@/layouts/MainLayout";
import ScrapeService from "@/services/scrape.service";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";

const SourceList: React.FC<{ source: string, sourceName: string }> = ({ source, sourceName }) => {

    return (
        <MainLayout>
            <Head>
                <title>Doujin Reader</title>
            </Head>

            <SectionManga source={source} sourceName={sourceName} />
        </MainLayout>
    )
}

const SectionManga = dynamic(() => Promise.resolve(Section), {
    ssr: false
})

const Section: React.FC<{ source: string, sourceName: string }> = ({ source, sourceName }) => {
    const { mangas, isLoading, page, setPage, data } = useMangas(source)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [page])

    return (
        <>
            <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold">
                        Latest {sourceName}
                    </h1>
                </div>
                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                    {isLoading && Array.from({ length: 5 }).map((_, index) => (
                        <SkeletonManga key={index} />
                    ))}
                    {!isLoading && mangas.map((manga, index) => (
                        <CardManga key={index} manga={manga} source={source} />
                    ))}
                </div>
                {!isLoading && mangas.length === 0 && (
                    <div className="col-span-full text-center">
                        <p className="text-sm text-gray-500">
                            No data found
                        </p>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 justify-center mt-4">
                <Button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1 || isLoading}
                >
                    Previous
                </Button>
                <Button
                    type="button"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={isLoading || data && data?.data.length === 0}
                >
                    Next
                </Button>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const data = await ScrapeService.sources()
        const source = ctx.params?.source as string

        if (data.data.findIndex((item) => item.url.includes(source)) === -1) {
            throw new Error("Source not found")
        }

        return {
            props: {
                source: source,
                sourceName: data.data.find((item) => item.url.includes(source))?.name || ""
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

export default SourceList;