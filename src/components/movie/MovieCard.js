import React from "react";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path } = item;
  return (
    <div className="flex flex-col movie-card rounded-lg p-3 bg-slate-800 select-none h-full">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-[250px] rounded-lg object-cover mb-5"
      />
      <div className="flex flex-col flex-1 text-white">
        <h3 className=" text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between opacity-50 text-sm mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <button className="capitalize py-3 px-6 rounded-lg bg-primary w-full mt-auto">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
