import { useState } from 'react';
import './index.css';

const ShareReferral = ({ referralCode, referralLink }) => {
  const [copyMessage, setCopyMessage] = useState('');

  const handleCopy = async (value, field) => {
    try {
      await navigator.clipboard.writeText(value || '');
      setCopyMessage(`${field === 'link' ? 'Referral Link' : 'Referral Code'} copied.`);
    } catch {
      setCopyMessage('Unable to copy. Please try again.');
    }
  };

  return (
    <section className="share-referral mb-4" aria-labelledby="share-referral-title">
      <h2 className="h4 fw-bold mb-3" id="share-referral-title">
        Share Referral
      </h2>

      <div className="share-referral__card p-3">
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <label className="form-label" htmlFor="referral-link">
              Referral Link
            </label>
            <div className="input-group share-referral__input-group">
              <input className="form-control form-control-premium" id="referral-link" readOnly type="text" value={referralLink} />
              <button
                aria-label="Copy referral link"
                className="btn btn-premium"
                type="button"
                onClick={() => handleCopy(referralLink, 'link')}
              >
                Copy
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <label className="form-label" htmlFor="referral-code">
              Referral Code
            </label>
            <div className="input-group share-referral__input-group">
              <input className="form-control form-control-premium" id="referral-code" readOnly type="text" value={referralCode} />
              <button
                aria-label="Copy referral code"
                className="btn btn-premium"
                type="button"
                onClick={() => handleCopy(referralCode, 'code')}
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="small text-secondary mt-2" role="status" aria-live="polite">
          {copyMessage}
        </div>
      </div>
    </section>
  );
};

export default ShareReferral;
