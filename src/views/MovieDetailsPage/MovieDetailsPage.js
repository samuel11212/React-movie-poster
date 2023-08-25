import s from './MovieDetailsPage.module.css';
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { IconContext } from 'react-icons';
import { useState, useEffect, Suspense } from 'react';
import { fetchGetMovieDetails } from '../../services/filmApi';
import { GoReply } from 'react-icons/go';
import Container from 'components/Container';
import { FaSpinner } from 'react-icons/fa';

const fallbackStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    color: '#010101'
  }

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchDetails(id) {
      try {
        await fetchGetMovieDetails(id).then(setMovieDetails);
      } catch (error) {
        setError(error)
        console.alert(error.message)
      }
    }
    fetchDetails(id)
  }, [id, error]);

  return (
    movieDetails && (
      <Container className={s.movieDetails}>        
      <div className={s.buttonBox}>
      <button
        type="button"
        onClick={() => {navigate(-1)}}
        className={s.goBackButton}
      >
        <IconContext.Provider value={{ className: `${s.searchIcon}` }}>
          <GoReply />
        </IconContext.Provider>
      </button>
    </div>
    <div className={s.movieBox}>
      <div className={s.imageBox}>
        <img
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`
              : `https://cdn.pixabay.com/photo/2016/03/31/18/36/cinema-1294496_1280.png`
          }
          alt={movieDetails.original_title}
          width="280"
        />
      </div>
      <div className={s.infoBox}>
        <h1 className={s.title}>{movieDetails.original_title} </h1>
        <p className={s.userScore}>{`User Score: ${Math.floor(movieDetails.vote_average)}`}</p>
        <h2 className={s.overview}>Overview</h2>
        <p className={s.overviewDescription}>{movieDetails.overview}</p>
        <h3 className={s.genres}>Genres</h3>
        <p>
          {movieDetails.genres.map(genre => (
            <span key={genre.id} className={s.genreItem}>
              {genre.name}
            </span>
          ))}
        </p>
      </div>
    </div>
    <div>
      <h3 className={s.additInfo}>Additional information</h3>
      <ul className={s.linkList}>
        <li>
          <Link className={s.link} to="cast">
            Cast
          </Link>
        </li>
        <li>
          <Link className={s.link} to="reviews">
            Reviews
          </Link>
        </li>
      </ul>

  <Suspense fallback={<div style={fallbackStyle}><FaSpinner /></div>}>
  <Outlet/>
</Suspense >
    </div>
        </Container>
    )
  );
};

export default MovieDetailsPage;