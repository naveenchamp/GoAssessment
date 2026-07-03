import './index.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container py-3 d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 text-secondary small">
        <div className="app-footer__brand fw-semibold">Go Business</div>
        <nav aria-label="Footer navigation">
          <a className="app-footer__link text-decoration-none me-3" href="#about">
            About
          </a>
          <a className="app-footer__link text-decoration-none" href="#privacy">
            Privacy
          </a>
        </nav>
        <div>&copy; 2024 Go Business</div>
      </div>
    </footer>
  );
};

export default Footer;
