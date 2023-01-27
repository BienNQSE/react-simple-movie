import React, { useEffect, useState } from "react";
import "swiper/scss";

import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";

const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  //   https://api.themoviedb.org/3/movie/now_playing?api_key=dc525ed265b2736ed92de1b1b03ba699
  console.log("🚀 ~ file: MovieList.js:11 ~ MovieList ~ data", data);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} slidesPerView="auto" spaceBetween={40}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
