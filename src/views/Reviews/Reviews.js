import { fetchGetMovieReviews } from '../../services/filmApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import s from './Reviews.module.css';

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchGetMovieReviews(id).then(setReviews);
  }, [id]);

  return (
    <>
      {reviews && reviews.total_results === 0 && (
        <p>We don't have any reviews for this movie</p>
      )}
      <ul className={s.reviewList}>
        {reviews &&
          reviews.results.map(review => (
            <li key={review.id} className={s.reviewBox}>
              <h3 className={s.reviewAuthor}>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Reviews;