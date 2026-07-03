import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import darkDoodle from '../../assets/images/dark-404.png';
import lightDoodle from '../../assets/images/light-404.png';
import './index.css';

const NotFound = () => {
  const { theme } = useTheme();

  const doodleImage =
    theme === 'light'
      ? lightDoodle
      : darkDoodle;

  return (
    <section className="not-found-page">

      <div className="container">

        <div className="not-found-card">

          <p className="not-found-page__code">
            404
          </p>

          <h1 className="not-found-page__title">
            Page Not Found
          </h1>

          <img
            src={doodleImage}
            alt="Confused person using a laptop"
            className="not-found-page__image"
          />

          <p className="not-found-page__subtitle">
            Looks like you've wandered off.
            <br />
            Let's get you back to your dashboard.
          </p>

          <Link
            to="/"
            className="btn btn-premium not-found-page__button"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

        </div>

      </div>

    </section>
  );
};

export default NotFound;