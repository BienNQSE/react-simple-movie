import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";
// import HomePage from "./pages/HomePage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";
// import MoviesPage from "./pages/MoviesPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviesPage></MoviesPage>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
