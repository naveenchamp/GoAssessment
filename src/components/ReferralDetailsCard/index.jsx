import { formatDate, formatUsd, normalizeReferral } from '../../utils/referrals.js';
import './index.css';

const ReferralDetailsCard = ({ referral }) => {
  const details = normalizeReferral(referral);
  const rows = [
    ['Partner Name', details.partnerName],
    ['Referral ID', details.id],
    ['Service Name', details.service],
    ['Date', formatDate(details.date)],
    ['Profit', formatUsd(details.profit)]
  ];

  return (
    <div className="referral-details-card p-3 p-md-4" aria-label="Referral details">
      <dl className="row mb-0">
        {rows.map(([label, value]) => (
          <div className="col-12 col-md-6 mb-3" key={label}>
            <dt className="referral-details-card__label small fw-semibold">{label}</dt>
            <dd className="referral-details-card__value fs-5 mb-0">{value || 'Not available'}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ReferralDetailsCard;
