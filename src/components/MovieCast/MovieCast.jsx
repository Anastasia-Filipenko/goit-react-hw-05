import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from '../MovieCast/MovieCast.module.css';

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    async function getMovieCast() {
      try {
        const data = await fetchMovieCast(movieId);
        setMovieCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ul className={css.list}>
        {movieCast.length > 0 ? (
          movieCast.map(cast => {
            return (
              <li className={css.item} key={cast.id}>
                <img
                  className={css.img}
                  src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                  alt={`Photo of the actor `}
                />
                <p className={css.actorName}>{cast.name}</p>
                <p>Character: {cast.character}</p>
              </li>
            );
          })
        ) : (
          <p>We have not found a cast for this movie</p>
        )}
      </ul>
    </div>
  );
}
