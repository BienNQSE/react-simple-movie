export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const ApiKey = "dc525ed265b2736ed92de1b1b03ba699";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${ApiKey}&page=${page}`,
  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${ApiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${ApiKey}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}/movie?api_key=${ApiKey}&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
