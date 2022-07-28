export type Movie = {
  id: number;
  attributes: {
    preview_src: string;
  };
};

export type MoviesResponse = {
  data: Movie[];
};
