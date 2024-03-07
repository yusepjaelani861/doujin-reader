import useSources from "@/hooks/useSources";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
    manga: {
        title: string;
        thumbnail: string;
        type: string;
        status: string;
        last_chapter: string;
        url: string;
    }
    source: string
}

const CardManga: React.FC<Props> = ({ manga, source }) => {
    const { sources } = useSources()
    const [sourceName, setSourceName] = useState("")

    useEffect(() => {
        setSourceName(sources.find(item => item.url === source)?.name || "")
    }, [source, sources])
    return (
        <Link
            href={`${source}/${manga.url}`}
            className="bg-white rounded-lg shadow-lg p-2 hover:text-indigo-500">
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

            <div className="mt-2">
                <p className="text-sm font-semibold line-clamp-2" title={manga.title}>
                    {manga.title}
                </p>

                <p className="text-xs text-gray-500">
                    {manga.last_chapter}
                </p>
            </div>
        </Link>
    )
}

// const Image: React.FC<{
//     src: string;
//     title: string;
//     alt: string;
// }> = ({ src, title, alt }) => {
//     const [source, setSource] = useState<any>(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         if (!source) {
//             axios.post('/api/image', { url: src }, {
//             }).then((res) => {
//                 setSource(res.data.image)
//                 setLoading(false)
//             }).catch(() => {
//                 setSource(src)
//                 setLoading(false)
//             })
//         }
//     }, [src])

//     return (
//         <div>
//             {source && (
//                 <picture>
//                     <img
//                         src={source ?? ""}
//                         title={title}
//                         alt={alt}
//                         className="rounded-lg duration-300 h-[400px] object-cover object-top w-full hover:scale-105"
//                     />
//                 </picture>
//             )}

//             {loading && (
//                 <div className="relative">
//                     <div className="animate-pulse bg-gray-200 h-[400px] w-full rounded-lg"></div>
//                     <Loader
//                         className="absolute top-1/2 left-1/2 animate-spin"
//                         size={40}
//                     />
//                 </div>
//             )}
//         </div>
//     )
// }

export default dynamic(() => Promise.resolve(CardManga), {
    ssr: false
})