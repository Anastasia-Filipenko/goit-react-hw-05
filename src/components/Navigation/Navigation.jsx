import { NavLink } from 'react-router-dom';
import css from '../Navigation/Navigation.module.css';
import clsx from 'clsx';

const activeLink = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};
export default function Navigation() {
  return (
    <>
      <nav className={css.navigation}>
        <NavLink to="/" className={activeLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={activeLink}>
          Movies
        </NavLink>
      </nav>
    </>
  );
}
