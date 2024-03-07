import useMangas from "@/hooks/useMangas"
import CardManga from "../CardManga"
import { useEffect, useState } from "react"
import useSources from "@/hooks/useSources"
import Link from "next/link"
import SkeletonManga from "../SkeletonManga"

const MangaSection: React.FC<{
    source: string
}> = ({ source }) => {
    const { mangas, isLoading, search, page } = useMangas(source)
    const { sources } = useSources()
    const [sourceName, setSourceName] = useState("")

    useEffect(() => {
        setSourceName(sources.find(item => item.url === source)?.name || "")
    }, [source, sources])
    return (
        <div className="py-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">
                    Latest {sourceName}
                </h1>

                <Link
                    href={`${source}${search ? `?search=${search}` : ""}${page > 1 ? `&page=${page}` : ""}`}
                >
                    <span
                        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-indigo-500 hover:text-white font-semibold text-sm"
                    >
                        View All
                    </span>
                </Link>
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
    )
}

export default MangaSection