export interface PostI {
  ranked: number;
  subr: string;
  created_utc: {
    value: string;
  };
  id: string;
  title: string;
  author: string;
  ups: number;
  downs: number;
  permalink: string;
  thumbnail: string;
  url: string;
}

export interface postRequestI {
  count?: boolean;
  full?: boolean;
  id?: string;
  where?: [string, string];
  orderBy?: string;
  orderDir?: "asc" | "desc";
  offset: number;
  limit: number;
}

export interface orderByRowI {
  row: string;
  order: boolean;
}
