const BASE_URL = "https://api.tvmaze.com";

type ShowApiResType = {
  show: {
    id: number;
    name: string;
    image?: {
      medium: string;
    };
    summary: string
  };
};

export type ShowType = {
  id: number;
  title: string;
  image?: string;
  description?: string;
};

export const getShowsBySearch = async (query: string) => {
  query = query.trim();

  if (query.length === 0) {
    return [];
  }

  const res = await fetch(`${BASE_URL}/search/shows?q=${query}`);

  const data: ShowApiResType[] = (await res.json()) as ShowApiResType[];

  const mappedData: ShowType[] = data.map((el) => ({
    id: el.show.id,
    title: el.show.name,
    image: el.show.image?.medium === undefined || el.show.image?.medium === ''? require('../images/background.jpeg') : el.show.image?.medium,
    description: el.show.summary,
  }));

  return mappedData;
};

type ShowDetailResApiType = {
  id: number;
  name: string;
  genres: string[];
  premiered: string;
  ended?: string;
  rating?: {
    average: number;
  };
  image?: {
    original: string;
  };
  summary: string;
};

export type ShowDetailType = {
  id: number;
  title: string;
  genres: string[];
  startDate: string;
  endDate?: string;
  avgRating?: number;
  image?: string;
  summary?: string;
};

export const getShowsById = async (id: number) => {
  if (id < 0) {
    return null;
  }

  const res = await fetch(`${BASE_URL}/shows/${id}`);

  const data: ShowDetailResApiType = (await res.json()) as ShowDetailResApiType;

  const mappedData: ShowDetailType = {
    id: data.id,
    title: data.name,
    genres: data.genres,
    startDate: data.premiered,
    endDate: data.ended,
    avgRating: data.rating?.average,
    image: data.image?.original === undefined || data.image?.original === '' ? require('../images/background.jpeg') : data.image?.original,
    summary: data.summary,
  };
  return mappedData;
};
