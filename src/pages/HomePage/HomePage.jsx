import { useEffect, useState } from 'react';
import { fetchMovieTrendy } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import css from '../HomePage/HomePage.module.css';

export default function HomePage() {
  const [trendyFilms, setTrendyFilms] = useState([]);

  useEffect(() => {
    async function getMovieTrendy() {
      try {
        const data = await fetchMovieTrendy();
        setTrendyFilms(data);
      } catch (error) {
        console.error(error);
      }
    }
    getMovieTrendy();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending today</h1>

      <ul className={css.list}>
        <MovieList films={trendyFilms} />
      </ul>
    </div>
  );
}
