import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import './index.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { clearToken, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    clearToken();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg app-navbar" aria-label="Primary navigation">
      <div className="container py-2">
        <Link className="navbar-brand app-navbar__brand fw-bold" to="/">
          Go Business
        </Link>

        <div className="d-flex align-items-center gap-3">
          <button
            aria-label="Toggle theme"
            className="theme-toggle"
            onClick={toggleTheme}
            type="button"
          >
            {theme === 'light' ? (
              <svg aria-hidden="true" className="theme-toggle__icon" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.95-6.95 1.41-1.41M3.64 20.36l1.41-1.41m0-13.9L3.64 3.64m16.72 16.72-1.41-1.41M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg aria-hidden="true" className="theme-toggle__icon" fill="none" viewBox="0 0 24 24">
                <path
                  d="M21 14.6A8.2 8.2 0 0 1 9.4 3 8.5 8.5 0 1 0 21 14.6Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            )}
          </button>

          {isAuthenticated && (
            <>
              <NavLink
                className={({ isActive }) =>
                  `nav-link app-navbar__link px-0 ${isActive ? 'app-navbar__link--active fw-semibold' : ''}`
                }
                to="/"
              >
                Dashboard
              </NavLink>
              <button className="btn btn-sm btn-premium-outline" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
