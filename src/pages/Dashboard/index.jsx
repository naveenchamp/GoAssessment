import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorView from '../../components/ErrorView';
import Loader from '../../components/Loader';
import Overview from '../../components/Overview';
import ReferralTable from '../../components/ReferralTable';
import ServiceSummary from '../../components/ServiceSummary';
import ShareReferral from '../../components/ShareReferral';
import { useAuth } from '../../context/AuthContext.jsx';
import { fetchReferrals, isUnauthorizedError } from '../../utils/api.js';
import { getAuthToken } from '../../utils/auth.js';
import { ROWS_PER_PAGE, SORT_OPTIONS } from '../../utils/constants.js';
import { parseReferralResponse } from '../../utils/referrals.js';
import './index.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { clearToken } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    metrics: [],
    referralCode: '',
    referralLink: '',
    referrals: [],
    serviceSummary: {}
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(SORT_OPTIONS.newest);

  useEffect(() => {
    const controller = new AbortController();
    const token = getAuthToken();

    const loadReferrals = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await fetchReferrals({
          search,
          signal: controller.signal,
          sort,
          token
        });

        setDashboardData(parseReferralResponse(response));
      } catch (error) {
        if (error.name !== 'AbortError') {
          if (isUnauthorizedError(error)) {
            clearToken();
            navigate('/login', { replace: true });
            return;
          }

          setErrorMessage(error.message || 'Unable to load referrals');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadReferrals();

    return () => controller.abort();
  }, [search, sort]);

  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const visibleReferrals = dashboardData.referrals.slice(startIndex, startIndex + ROWS_PER_PAGE);

  return (
    <section className="dashboard-page container py-5">
      <div className="dashboard-page__hero mb-4">
        <div>
          <p className="dashboard-page__eyebrow mb-2">Elite Partner Console</p>
          <h1 className="dashboard-page__title h2 fw-bold">Referral Dashboard</h1>
          <p className="dashboard-page__subtitle mb-0">Track your referrals, earnings, and partner activity in one place.</p>
        </div>
      </div>

      <div className="dashboard-page__controls row g-3 align-items-end mb-4">
        <div className="col-12 col-lg-8">
          <label className="form-label" htmlFor="referral-search">
            Search
          </label>
          <input
            className="form-control form-control-premium"
            id="referral-search"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name or service…"
            type="search"
            value={search}
          />
        </div>

        <div className="col-12 col-lg-4">
          <label className="form-label" htmlFor="referral-sort">
            Sort
          </label>
          <select
            className="form-select form-control-premium"
            id="referral-sort"
            onChange={(event) => setSort(event.target.value)}
            value={sort}
          >
            <option value={SORT_OPTIONS.newest}>Newest first</option>
            <option value={SORT_OPTIONS.oldest}>Oldest first</option>
          </select>
        </div>
      </div>

      {isLoading && <Loader label="Loading referrals" />}
      <ErrorView message={errorMessage} />

      {!isLoading && !errorMessage && (
        <>
          <Overview metrics={dashboardData.metrics} />
          <ServiceSummary services={dashboardData.serviceSummary} />
          <ShareReferral referralCode={dashboardData.referralCode} referralLink={dashboardData.referralLink} />
          <ReferralTable
            currentPage={page}
            onPageChange={setPage}
            referrals={visibleReferrals}
            rowsPerPage={ROWS_PER_PAGE}
            totalEntries={dashboardData.referrals.length}
          />
        </>
      )}
    </section>
  );
};

export default Dashboard;
