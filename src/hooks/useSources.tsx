import ScrapeService from "@/services/scrape.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"

const useSources = () => {
    const [sources, setSources] = useState<{
        name: string;
        url: string;
    }[]>([])

    const { data, isLoading } = useQuery({
        queryKey: [
            "sources"
        ],
        queryFn: () => ScrapeService.sources()
    })

    useEffect(() => {
        if (data) {
            setSources(data.data)
        }
    }, [data])

    return {
        sources,
        isLoading
    }
}

export default useSources