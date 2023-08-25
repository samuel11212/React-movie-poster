import axios from 'axios';


const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '43826aff38e7e981731c2a4c4f74555d';

async function fetchWithErrorHandling(url) {
    try {
        const response = await axios.get(url);
        const movies = await response.data;
        return movies;
      } catch (error) {
        alert(`${error}`);
        console.log(error)
        return Promise.reject(error);
      }
}

export function fetchPopularFilms() {

    return fetchWithErrorHandling(`${BASE_URL}trending/movie/day?page=1&api_key=${KEY}`)
}

export function fetchSearchMovies(query) {
    return fetchWithErrorHandling(`${BASE_URL}search/movie?api_key=${KEY}&page=1&include_adult=false&query=${query}`)  
}

export function fetchGetMovieDetails(id) {
    return fetchWithErrorHandling(`${BASE_URL}movie/${id}?api_key=${KEY}`);
  }

export function fetchGetMovieCredits(id) {
    return fetchWithErrorHandling(`${BASE_URL}movie/${id}/credits?api_key=${KEY}`) 
}

export function fetchGetMovieReviews(id) {
    return fetchWithErrorHandling(`${BASE_URL}movie/${id}/reviews?api_key=${KEY}&page=1`) 
}

