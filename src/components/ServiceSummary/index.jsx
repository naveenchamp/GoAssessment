import { formatUsd, normalizeService } from '../../utils/referrals.js';
import './index.css';

const ServiceSummary = ({ services }) => {
  const service = normalizeService(services);
  const hasServiceSummary = Boolean(
    service.service || service.yourReferrals || service.activeReferrals || service.totalRefEarnings
  );

  return (
    <section className="service-summary mb-4" aria-labelledby="service-summary-title">
      <h2 className="h4 fw-bold mb-3" id="service-summary-title">
        Service Summary
      </h2>

      <div className="table-responsive service-summary__table-wrap">
        <table className="table table-hover align-middle mb-0 table-dark-premium">
          <caption className="visually-hidden">Referral service performance summary</caption>
          <thead className="table-light">
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Your Referrals</th>
              <th scope="col">Active Referrals</th>
              <th scope="col">Total Ref. Earnings</th>
            </tr>
          </thead>
          <tbody>
            {!hasServiceSummary ? (
              <tr>
                <td className="text-secondary text-center py-4" colSpan="4">
                  No service summary available.
                </td>
              </tr>
            ) : (
              <tr>
                <td>{service.service}</td>
                <td>{service.yourReferrals}</td>
                <td>{service.activeReferrals}</td>
                <td>{formatUsd(service.totalRefEarnings)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ServiceSummary;
