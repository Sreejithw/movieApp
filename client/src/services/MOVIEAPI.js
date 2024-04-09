import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const movieAPIKey = import.meta.env.VITE_REACT_APP_MOVIEAPI_KEY;
// /movie/popular?language=en-US&page=1

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    // prepareHeaders: (headers) => {
    //   headers.set("Authorization", `Bearer ${movieAPIKey}`);
    // },
  }),
  endpoints: (builder) => ({
    // Get Genre
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${movieAPIKey}`
    }),
    // Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Get Movies by Search
        if(searchQuery){
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${movieAPIKey}`;
        }
        //* Get Movies by Category
        if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string'){
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${movieAPIKey}`;
        }
        //* Get Movies by Genre ID
        if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number'){
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${movieAPIKey}`;
        }
        return `movie/popular?page=${page}&api_key=${movieAPIKey}`;
      }
    }),
    //* Get Specific Movie
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${movieAPIKey}`
    }),
    //* Get Recommendations
    getRecommendations: builder.query({
      query: ({movie_id, list}) => `/movie/${movie_id}/${list}?api_key=${movieAPIKey}`
    }),
    //* Get Individual Cast Details
    getCastInfo: builder.query({
      query: (id) => `person/${id}?api_key=${movieAPIKey}`
    }),
    //* Get Movies by Actor
    getMoviesByActorName: builder.query({
      query: ({id, page}) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${movieAPIKey}`
    })
  }),
});

export const { 
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetCastInfoQuery,
  useGetMoviesByActorNameQuery,
} = movieApi;
