import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTllNTBmMDE3N2M1MjE1YzU3YWY1YmQzYTViMzdjMCIsInN1YiI6IjYzYmQ0NjllNWJlMDBlMDBlN2EyMWRiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hptj1MOyAKiUfctb-oVosPSZWmgLE6y0bZrSXMOMJI0',
  },
};

export const fetchMovieTrendy = async () => {
  try {
    const response = await axios.get(
      `trending/movie/day?language=en-US`,
      options
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovieById = async ({ movieId }) => {
  try {
    const response = await axios.get(
      `movie/${movieId}?language=en-US`,
      options
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieCast = async ({ movieId }) => {
  try {
    const response = await axios.get(
      `movie/${movieId}/credits?language=en-US`,
      options
    );
    return response.data.cast;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieReviews = async ({ movieId }) => {
  try {
    const response = await axios.get(
      `movie/${movieId}/reviews?language=en-US&page=1`,
      options
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieSearch = async query => {
  try {
    const response = await axios.get(
      `search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
