import axios from "@/config/axios";

export interface Manga {
    title: string;
    alternative_title: string
    thumbnail: string
    synopsis: string
    released: string
    author: string
    artist: string
    serialization: string
    posted_by: string
    posted_on: string
    updated_on: string
    genres: string[]
    rating: string
    status: string
    type: string
    chapters: {
        title: string
        uploaded_at: string
        url: string
    }[]
    url: string
}

export interface Chapter {
    title: string
    images: string[]
    parent: string
    url: string
}

class ScrapeService {
  static sources = async (): Promise<
    ApiResponse<
      {
        name: string;
        url: string;
      }[]
    >
  > => {
    const { data } = await axios.get("");

    return data;
  };

  static latest = async (payload: {
    source: string;
    page: number;
    search?: string;
  }): Promise<
    ApiResponse<
      {
        title: string;
        thumbnail: string;
        type: string;
        status: string;
        last_chapter: string;
        url: string;
      }[]
    >
  > => {
    const params = new URLSearchParams();
    params.append("page", payload.page.toString());
    if (payload.search) params.append("search", payload.search);

    const { data } = await axios.get(`${payload.source}`, {
      params,
    });

    return data;
  };

  static detail = async (payload: {
    source: string;
    url: string;
  }): Promise<ApiResponse<Manga>> => {
    const { data } = await axios.get(`${payload.source}/${payload.url}`);

    return data;
  };

  static chapter = async (payload: {
    source: string;
    url: string;
  }): Promise<ApiResponse<Chapter>> => {
    const { data } = await axios.get(`${payload.source}/${payload.url}/chapter`);

    return data;
  };
}

export default ScrapeService;
