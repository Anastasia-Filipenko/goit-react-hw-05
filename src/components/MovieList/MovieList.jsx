import { Link, useLocation } from 'react-router-dom';
import css from '../MovieList/MovieList.module.css';

export default function MovieList({ films }) {
  const location = useLocation();
  return (
    <>
      {films.map(film => {
        return (
          <li className={css.item} key={film.id}>
            <Link
              className={css.link}
              to={`/movies/${film.id}`}
              state={{ from: location }}
            >
              {film.title}
            </Link>
          </li>
        );
      })}
      {}
    </>
  );
}
