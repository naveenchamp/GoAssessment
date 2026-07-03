import './index.css';

const Loader = ({ label = 'Loading' }) => {
  return (
    <div className="loader d-flex align-items-center justify-content-center gap-2 py-4" role="status" aria-live="polite">
      <span className="spinner-border spinner-border-sm loader__spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
};

export default Loader;
