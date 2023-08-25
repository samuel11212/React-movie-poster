import s from './MoviesPage.module.css';
import PageHeading from "components/PageHeading/PageHeading";
import { useEffect, useState } from "react";
import { fetchSearchMovies } from "services/filmApi";
import MoviesList from "components/MovieList";
import { useSearchParams } from 'react-router-dom';


const MoviesPage = () => {
    const [film, setFilm] = useState(null);
    const [query, setQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams({});
    const queryValue = searchParams.get('query');

  

    useEffect(() => {
        if (!queryValue) {
          return;
        }
        fetchSearchMovies(queryValue).then(setFilm);
      }, [queryValue]);


    const onQuerySubmit = e => {
        e.preventDefault();
        if (!query) {
          alert('Please, enter movie name');
          return;
        }
        setSearchParams({ query });
      };

    return(
   
    <>
        <form onSubmit={onQuerySubmit} className={s.searchForm}>
            <input
                className={s.search}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => {setQuery(e.currentTarget.value)}}
            />
        
            </form>
            
    
    {film && 
    (<><PageHeading>List of found films</PageHeading>
    <MoviesList response={film} /></>)}

    {film && film.total_results === 0 && 
    (<PageHeading>There are no movies matching your search</PageHeading>)}
   
    
    
</>
);
};

export default MoviesPage;