import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    async function getMovieReviews() {
      try {
        const data = await fetchMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ul>
        {movieReviews.length > 0 ? (
          movieReviews.map(reviews => {
            return (
              <li key={reviews.id}>
                <h3>Author: {reviews.author}</h3>
                <p>{reviews.content}</p>
              </li>
            );
          })
        ) : (
          <p>We don`t have any reviews for this film</p>
        )}
      </ul>
    </div>
  );
}
