import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";

function App() {
  return (
    <Fragment>
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
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
