import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles } from 'lucide-react';
import ErrorView from '../../components/ErrorView';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext.jsx';
import { signIn } from '../../utils/api.js';
import { isAuthenticated } from '../../utils/auth.js';
import loginIllustration from '../../assets/images/login-doodle.png';
import './index.css';

const Login = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated()) {
    return <Navigate replace to="/" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await signIn({ email, password });

      const token = response?.data?.token;

      if (!token) {
        setErrorMessage(
          response?.message || 'Unable to sign in. Please try again.'
        );
        return;
      }

      saveToken(token);
      navigate('/', { replace: true });
    } catch (error) {
      setErrorMessage(
        error.message || 'Unable to sign in. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <section className="login-page container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12">
          <div className="login-card">
            {/* LEFT PANEL */}

            <div className="login-card__left">
              <div className="login-card__badge">
                <Sparkles size={16} />
                <span>Welcome Back</span>
              </div>

              <img
                src={loginIllustration}
                alt="Welcome illustration"
                className="login-card__illustration"
              />

              <h1 className="login-card__brand">
                Go Business
              </h1>

              <p className="login-card__subtitle">
                Sign in to open your referral dashboard and manage referrals,
                earnings, and partner activity from one place.
              </p>
            </div>

            {/* RIGHT PANEL */}

            <div className="login-card__right">
              <div className="login-form-card">
                <h2 className="login-form-title">
                  Sign In
                </h2>

                <p className="login-form-subtitle">
                  Continue to your dashboard
                </p>

                <ErrorView message={errorMessage} />

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="form-label"
                    >
                      Email
                    </label>

                    <div className="input-group doodle-input">
                      <span className="input-group-text">
                        <Mail size={18} />
                      </span>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="form-control form-control-premium"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label"
                    >
                      Password
                    </label>

                    <div className="input-group doodle-input">
                      <span className="input-group-text">
                        <Lock size={18} />
                      </span>

                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="form-control form-control-premium"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-premium login-btn w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>

                {isLoading && (
                  <div className="mt-4">
                    <Loader label="Signing in..." />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;