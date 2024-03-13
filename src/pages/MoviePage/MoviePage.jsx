import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieSearch } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from '../MoviePage/MoviePage.module.css';

export default function MoviePage() {
  const [movieBySearch, setMovieBySearch] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();
  const searchValue = params.get('query') ?? '';

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    let inputValue = e.target.elements.query.value;
    params.set('query', inputValue);
    setParams(params);
    form.reset();
  };

  useEffect(() => {
    async function getMovieBySearch() {
      try {
        const data = await fetchMovieSearch(searchValue);
        setMovieBySearch(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieBySearch();
  }, [searchValue]);

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input className={css.input} type="text" name="query" />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>

      <ul className={css.list}>
        {isLoading && <Loader />}
        {error && <ErrorMessage />}

        {movieBySearch &&
          movieBySearch.map(films => {
            return (
              <li className={css.item} key={films.id}>
                <MovieList filmTitle={films.title} filmId={films.id} />
              </li>
            );
          })}
      </ul>
    </>
  );
}
