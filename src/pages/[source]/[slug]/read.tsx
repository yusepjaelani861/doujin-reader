import Button from "@/components/Button"
import Card from "@/components/Card"
import MainLayout from "@/layouts/MainLayout"
import ScrapeService, { Chapter, Manga } from "@/services/scrape.service"
import { useQuery } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"

const ReadChapter: React.FC<{
    chapter: Chapter
    source: string
}> = ({ chapter, source }) => {
    const [manga, setManga] = useState<Manga | null>(null)
    const { data } = useQuery({
        queryKey: [
            "manga",
            source,
            chapter.parent
        ],
        queryFn: () => ScrapeService.detail({
            source,
            url: chapter.parent
        })
    })

    useEffect(() => {
        if (data) {

            setManga({
                ...data.data,
                chapters: data.data.chapters.reverse()
            })
        }
    }, [data])


    return (
        <MainLayout>
            <Head>
                <title>{`${chapter.title} - Doujin Reader`}</title>
            </Head>
            {manga && (
                <CardCoy
                    manga={manga}
                    chapter={chapter.url}
                    source={source}
                    url={chapter.parent}
                />
            )}

            <h1 className="text-xl font-bold text-center py-4">
                {chapter.title}
            </h1>

            <div className="w-full py-4">
                <div className="flex flex-col items-center justify-center">
                    {chapter.images.map((image, index) => (
                        <picture key={index}>
                            <img
                                src={image}
                                alt={chapter.title}
                                className="w-full"
                            />
                        </picture>
                    ))}
                </div>
            </div>

            {manga && (
                <CardCoy
                    manga={manga}
                    chapter={chapter.url}
                    source={source}
                    url={chapter.parent}
                />
            )}
        </MainLayout>
    )
}

export const CardCoy: React.FC<{
    manga: Manga | null
    chapter: string
    source: string,
    url: string,
}> = ({
    manga,
    chapter,
    source,
    url
}) => {
        const [nextURL, setNextURL] = useState<string | null>(null)
        const [prevURL, setPrevURL] = useState<string | null>(null)

        useEffect(() => {
            if (manga) {
                const index = manga.chapters.findIndex((item) => item.url === chapter)

                if (index !== -1) {
                    if (index !== 0) {
                        setPrevURL(manga.chapters[index - 1].url)
                    }

                    if (index !== manga.chapters.length - 1) {
                        setNextURL(manga.chapters[index + 1].url)
                    }
                }
            }
        }, [manga, chapter])

        return (
            <Card>
                <div className="flex items-center justify-between gap-4">
                    <picture>
                        <img
                            src={manga?.thumbnail}
                            about={manga?.title}
                            alt={manga?.title}
                            className="w-14 rounded-lg flex-shrink-0"
                        />
                    </picture>

                    <div className="flex flex-col flex-grow">
                        <p className="text-lg font-bold">
                            {manga?.title}
                        </p>
                        <p className="text-xs font-semibold">
                            Total Chapter {manga?.chapters.length}
                        </p>

                        <p className="mt-4">
                            <select
                                className="py-2 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent w-full"
                                onChange={(e) => window.location.href = `/${source}/${e.target.value}/read`}
                            >
                                {manga?.chapters.map((item, index) => (
                                    <option
                                        key={index}
                                        value={item.url}
                                        selected={item.url === chapter}
                                    >
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            disabled={prevURL === null}
                            onClick={() => window.location.href = `/${source}/${prevURL}/read`}
                            className="!px-2"
                        >
                            <ChevronLeft size={20} />
                        </Button>
                        <Button
                            type="button"
                            disabled={nextURL === null}
                            onClick={() => window.location.href = `/${source}/${nextURL}/read`}
                            className="!px-2"
                        >
                            <ChevronRight size={20} />
                        </Button>
                    </div>
                </div>
            </Card>
        )
    }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const source = ctx.params?.source as string
    const slug = ctx.params?.slug as string

    try {
        const data = await ScrapeService.chapter({
            source,
            url: slug
        })

        if (!data.success) {
            throw new Error("Chapter not found")
        }

        return {
            props: {
                chapter: data.data,
                source
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

export default ReadChapter