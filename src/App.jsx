import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Container from "./components/Container";




const HomePageLazy = lazy(()=> import('./views/HomePage'));
const MoviesPageLazy = lazy(()=> import('./views/MoviesPage'));
const MovieDetailsPageLazy = lazy(()=> import('./views/MovieDetailsPage'));
const CastPageLazy = lazy(()=> import('./views/Cast'));
const ReviewsPageLazy = lazy(()=> import('./views/Reviews'));



export const App = () => {
  return (
    <Container>

      

      
        <Routes>

          <Route path="/" element={ <Navigation/>} >
            <Route index element={<HomePageLazy /> } />
            <Route path="movies" element={<MoviesPageLazy />} />
            <Route path="movies/:id" element={<MovieDetailsPageLazy/>}>
              <Route path="cast" element={<CastPageLazy />} />
              <Route path="reviews" element={<ReviewsPageLazy />} />
            </Route>
            <Route path="*" element={<HomePageLazy />} />
            </Route>

        </Routes>
     

    </Container>
  );
};

export default App;