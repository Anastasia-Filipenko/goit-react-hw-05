import { useEffect, useRef, useState } from 'react';
import { fetchMovieById } from '../../api';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from '../MovieDetailsPage/MovieDetailsPage.module.css';
import { HiChevronLeft } from 'react-icons/hi2';

export default function MovieDetailsPage() {
  const [movieById, setMovieById] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    setLoading(true);

    async function getMovieById() {
      try {
        const data = await fetchMovieById(movieId);
        setMovieById(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieById();
  }, [movieId]);

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <Link className={css.backLink} to={backLinkRef.current}>
        <HiChevronLeft /> Go back
      </Link>

      {movieById && (
        <div className={css.containerInfo}>
          <img
            className={css.img}
            src={`https://image.tmdb.org/t/p/w500/${movieById.poster_path}`}
            alt={`Poster by film: ${movieById.title}`}
          />
          <div className={css.info}>
            <h2>
              {movieById.title} ({movieById.release_date.slice(0, 4)})
            </h2>
            <p>User Score: {Math.round(movieById.vote_average * 10)}%</p>
            <h2>Overview</h2>
            <p>{movieById.overview}</p>

            <div>
              <h2>Genres:</h2>
              <div>
                {movieById.genres.map(genre => {
                  return <p key={genre.id}>{genre.name}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={css.additional}>
        <p className={css.additionalTitle}>Additional information</p>

        <NavLink className={css.additionalLink} to="cast">
          Cast
        </NavLink>
        <NavLink className={css.additionalLink} to="reviews">
          Reviews
        </NavLink>
        <Outlet />
      </div>
    </div>
  );
}
