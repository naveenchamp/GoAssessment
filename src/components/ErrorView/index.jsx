import './index.css';

const ErrorView = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="alert error-view" role="alert" aria-live="assertive">
      {message}
    </div>
  );
};

export default ErrorView;
