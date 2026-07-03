import { useNavigate } from 'react-router-dom';
import { formatDate, formatUsd, normalizeReferral } from '../../utils/referrals.js';
import './index.css';

const ReferralTable = ({ currentPage, onPageChange, referrals, rowsPerPage, totalEntries }) => {
  const navigate = useNavigate();
  const totalPages = Math.max(Math.ceil(totalEntries / rowsPerPage), 1);
  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);

  const handleRowClick = (id) => {
    if (id) {
      navigate(`/referral/${id}`);
    }
  };

  return (
    <section className="referral-table-section" aria-labelledby="referral-table-title">
      <h2 className="h4 fw-bold mb-3" id="referral-table-title">
        Referral Table
      </h2>

      <div className="table-responsive referral-table-section__wrap">
        <table className="table table-hover align-middle mb-0 referral-table table-dark-premium">
          <caption className="visually-hidden">Referral records</caption>
          <thead className="table-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Service</th>
              <th scope="col">Date</th>
              <th scope="col">Profit</th>
            </tr>
          </thead>
          <tbody>
            {referrals.length === 0 ? (
              <tr>
                <td className="referral-table-section__empty text-center py-4" colSpan="4">
                  No referrals found.
                </td>
              </tr>
            ) : (
              referrals.map((referral, index) => {
                const row = normalizeReferral(referral);

                return (
                  <tr
                    className="clickable-row"
                    key={row.id || index}
                    aria-label={`Open referral details for ${row.name || 'selected referral'}`}
                    onClick={() => handleRowClick(row.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleRowClick(row.id);
                      }
                    }}
                    role="button"
                    tabIndex="0"
                  >
                    <td>{row.name}</td>
                    <td>{row.service}</td>
                    <td>{formatDate(row.date)}</td>
                    <td>{formatUsd(row.profit)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mt-3">
        <p className="mb-0 text-secondary">
          Showing {startEntry}&ndash;{endEntry} of {totalEntries} entries
        </p>

        <nav aria-label="Referral pagination">
          <div className="d-flex flex-wrap gap-2 pagination-actions" role="group" aria-label="Referral pages">
            <button
              aria-label="Go to previous page"
              className="btn btn-premium-outline"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              type="button"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                aria-current={page === currentPage ? 'page' : undefined}
                aria-label={`Go to page ${page}`}
                className={`btn ${page === currentPage ? 'btn-premium' : 'btn-premium-outline'}`}
                key={page}
                onClick={() => onPageChange(page)}
                type="button"
              >
                {page}
              </button>
            ))}

            <button
              aria-label="Go to next page"
              className="btn btn-premium-outline"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              type="button"
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default ReferralTable;
