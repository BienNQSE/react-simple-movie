import React from "react";
import MovieCard from "../components/movie/MovieCard";
import useSWR from "swr";
import { fetcher } from "../config";

const MoviesPage = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=dc525ed265b2736ed92de1b1b03ba699`,
    fetcher
  );

  const movies = data?.results || [];
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1 ">
          <input
            type="text"
            className="w-full bg-slate-500 outline-none text-white p-4 rounded-l-lg"
            placeholder="Enter your keyword..."
          />
        </div>
        <button className="bg-primary text-white p-4 rounded-r-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
    </div>
  );
};

export default MoviesPage;
