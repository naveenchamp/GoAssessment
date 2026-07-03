import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorView from '../../components/ErrorView';
import Loader from '../../components/Loader';
import ReferralDetailsCard from '../../components/ReferralDetailsCard';
import { useAuth } from '../../context/AuthContext.jsx';
import { fetchReferralById, isUnauthorizedError } from '../../utils/api.js';
import { getAuthToken } from '../../utils/auth.js';
import { parseReferralDetailsResponse } from '../../utils/referrals.js';
import './index.css';

const ReferralDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clearToken } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [referral, setReferral] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const token = getAuthToken();

    const loadReferralDetails = async () => {
      setIsLoading(true);
      setErrorMessage('');
      setReferral(null);

      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetchReferralById({
          id,
          signal: controller.signal,
          token
        });

        setReferral(parseReferralDetailsResponse(response, id));
      } catch (error) {
        if (error.name !== 'AbortError') {
          if (isUnauthorizedError(error)) {
            clearToken();
            navigate('/login', { replace: true });
            return;
          }

          setErrorMessage(error.message || 'Unable to load referral details');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadReferralDetails();

    return () => controller.abort();
  }, [id]);

  return (
    <section className="referral-details-page container py-5">
      <div className="mb-4">
        <Link className="referral-details-page__back btn btn-link px-0 mb-3" to="/">
          &larr; Back to dashboard
        </Link>
        <h1 className="h2 fw-bold">Referral Details</h1>
        <p className="referral-details-page__subtitle mb-0">View the selected referral record.</p>
      </div>

      {isLoading && <Loader label="Loading referral details" />}
      <ErrorView message={errorMessage} />

      {!isLoading && !errorMessage && referral && <ReferralDetailsCard referral={referral} />}

      {!isLoading && !errorMessage && !referral && (
        <div className="referral-details-page__empty p-4 text-center" role="status">
          <p className="h5 mb-0">Referral not found</p>
        </div>
      )}
    </section>
  );
};

export default ReferralDetails;
