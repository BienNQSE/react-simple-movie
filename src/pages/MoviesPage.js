import React, { useEffect, useState } from "react";
import MovieCard from "../components/movie/MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";

const itemsPerPage = 20;

const MoviesPage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);

  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];
  useEffect(() => {
    if (!data || !data.total_pages) return;

    setPageCount(Math.ceil(data.total_pages / itemsPerPage));
  }, [data, itemOffset]);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_pages.length;

    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  if (!data) return null;
  // const { page, total_pages } = data;

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1 ">
          <input
            type="text"
            className="w-full bg-slate-500 outline-none text-white p-4 rounded-l-lg"
            placeholder="Enter your keyword..."
            onChange={handleFilterChange}
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
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10 mb-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default MoviesPage;
