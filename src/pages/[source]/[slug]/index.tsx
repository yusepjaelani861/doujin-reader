import Card from "@/components/Card"
import MainLayout from "@/layouts/MainLayout"
import ScrapeService, { Manga } from "@/services/scrape.service"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { Book } from "react-feather"

const MangaView: React.FC<{
    manga: Manga
    source: string
}> = ({ manga, source }) => {
    return (
        <MainLayout>
            <Head>
                <title>{`${manga.title} - Doujin Reader`}</title>
            </Head>
            <div className="flex flex-col gap-4">
                <Card>
                    <div className="flex items-start md:gap-8 gap-4 md:flex-row flex-col">
                        <div className="w-fit flex-shrink-0">
                            <picture className="relative">
                                <img
                                    src={manga.thumbnail}
                                    title={manga.title}
                                    alt={manga.title}
                                    className="rounded-lg duration-300 h-[400px] object-cover object-top w-full hover:scale-105"
                                />
                                {/* <Image src={manga.thumbnail} title={manga.title} alt={manga.title} /> */}
                                <div className="absolute top-0 left-0 bg-gradient-to-r from-indigo-900 to-neutral-500 py-1.5 rounded-sm text-white font-bold text-xs px-2">
                                    {manga.status}
                                </div>
                                <div className="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-900 to-neutral-500 py-1.5 rounded-sm text-white font-bold text-xs px-2">
                                    {manga.type}
                                </div>
                            </picture>
                        </div>

                        <div className="w-full flex-grow">
                            <h1 className="text-2xl font-bold">
                                {manga?.title}
                            </h1>

                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-sm font-semibold">
                                        Status: {manga?.status}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        Author: {manga.author ?? "-"}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        Type: {manga?.type}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        Posted On: {manga?.posted_on}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        Uploaded On: {manga?.updated_on}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        Genres: {manga?.genres.join(", ")}
                                    </p>

                                    <div className="flex flex-col gap-1 mt-4">
                                        <p className="text-sm font-semibold">
                                            Synopsis:
                                        </p>
                                        <p className="text-xs" dangerouslySetInnerHTML={{ __html: manga.synopsis }}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h1 className="text-xl font-bold">
                        Chapters
                    </h1>

                    <div className="flex flex-col gap-2 mt-4">
                        {manga.chapters.reverse().map((item, index) => (
                            <Link
                                key={index}
                                href={`/${source}/${item.url}/read`}
                                className="flex items-center gap-4 p-2 px-4 border-2 border-transparent hover:border-black hover:bg-gray-100 rounded-lg"
                            >
                                <Book />
                                <p className="text-sm font-semibold">
                                    {item.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {item.uploaded_at}
                                </p>
                            </Link>
                        ))}
                    </div>
                </Card>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const source = ctx.params?.source as string
    const slug = ctx.params?.slug as string

    try {
        const data = await ScrapeService.detail({
            source,
            url: slug
        })

        if (!data.success) {
            throw new Error(data.message)
        }

        return {
            props: {
                manga: data.data,
                source
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

export default MangaView