import { Link, useLocation } from 'react-router-dom';
import css from '../MovieList/MovieList.module.css';
export default function MovieList({ filmTitle, filmId }) {
  const location = useLocation();
  return (
    <>
      <Link
        className={css.link}
        to={`/movies/${filmId}`}
        state={{ from: location }}
      >
        {filmTitle}
      </Link>
    </>
  );
}
