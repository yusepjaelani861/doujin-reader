import ScrapeService from "@/services/scrape.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"

const useMangas = (source: string) => {
    const [mangas, setMangas] = useState<{
        title: string;
        thumbnail: string;
        type: string;
        status: string;
        last_chapter: string;
        url: string;
    }[]>([])
    const [page, setPage] = useState<number>(parseInt(new URLSearchParams(window.location.search).get("page") ?? "1") || 1);
    const [search, setSearch] = useState<string>(new URLSearchParams(window.location.search).get("search") || "");

    const { data, isLoading } = useQuery({
        queryKey: [
            "mangas",
            source,
            page,
            search
        ],
        queryFn: () => ScrapeService.latest({
            page,
            source,
            search
        })
    })

    useEffect(() => {
        if (data) {
            setMangas(data.data)
        }
    }, [data])

    useEffect(() => {
        if (isLoading) {
            setMangas([])
        }
    }, [isLoading])

    useEffect(() => {
        window.history.pushState({}, "", `?page=${page}${search ? `&search=${search}` : ""}`)
    }, [search, page])

    return {
        data,
        mangas,
        isLoading,
        page,
        setPage,
        search,
        setSearch
    }
}

export default useMangas