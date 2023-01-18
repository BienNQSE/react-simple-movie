import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=dc525ed265b2736ed92de1b1b03ba699`,
    fetcher
  );
  const movies = data?.results || [];
  console.log("🚀 ~ file: Banner.js:10 ~ Banner ~ movies", movies);
  return (
    <section className="banner h-[600px] page-container pb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { poster_path, title } = item;
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 rounded-lg bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.0)]"></div>
      <img
        className="w-full h-full object-cover rounded-lg object-top"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Action
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Drama
          </span>
        </div>

        <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
          Watch Now
          <i className="fa fa-play ml-2 "></i>
        </button>
      </div>
    </div>
  );
}

export default Banner;
