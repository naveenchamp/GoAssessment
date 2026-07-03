export const formatLabel = (value) => {
  return String(value)
    .replace(/[_-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export const formatDate = (value) => {
  if (!value) {
    return '';
  }

  return String(value).slice(0, 10).replaceAll('-', '/');
};

export const formatUsd = (value) => {
  const amount = Number(value) || 0;

  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency'
  }).format(amount);
};

export const parseReferralResponse = (response) => {
  const payload = response?.data || response || {};
  const data = response?.data || {};
  const metrics = data.metrics || response?.metrics || payload.metrics || [];
  const shareReferral = payload.shareReferral || payload.referral || {};

  return {
    metrics: getMetrics(metrics),
    referrals: getReferrals(payload, response),
    referralCode: payload.referralCode || payload.referral_code || shareReferral.code || '',
    referralLink: payload.referralLink || payload.referral_link || shareReferral.link || '',
    serviceSummary: getServiceSummary(payload, response)
  };
};

export const parseReferralDetailsResponse = (response, referralId) => {
  const payload = response?.data || response || {};
  const referrals = Array.isArray(payload) ? payload : Array.isArray(payload.referrals) ? payload.referrals : null;

  if (referrals) {
    return (
      referrals.find((referral) => String(getReferralId(referral)) === String(referralId)) ||
      (referrals.length === 1 ? referrals[0] : null)
    );
  }

  if (payload && typeof payload === 'object' && !Array.isArray(payload) && hasReferralFields(payload)) {
    return payload;
  }

  return null;
};

const getReferrals = (payload, response) => {
  if (Array.isArray(payload.referrals)) {
    return payload.referrals;
  }

  if (Array.isArray(response?.referrals)) {
    return response.referrals;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};

const getMetrics = (metrics) => {
  if (Array.isArray(metrics)) {
    return metrics.map((metric, index) => normalizeMetric(metric, index));
  }

  if (metrics && typeof metrics === 'object') {
    return Object.entries(metrics).map(([key, value], index) => {
      if (value && typeof value === 'object') {
        return normalizeMetric(
          {
            id: value.id || key,
            label: value.label || key,
            value: value.value ?? value.count ?? value.total ?? ''
          },
          index
        );
      }

      return normalizeMetric(
        {
          id: key,
          label: key,
          value
        },
        index
      );
    });
  }

  return [];
};

const normalizeMetric = (metric = {}, index) => {
  return {
    id: metric.id || metric.key || metric.label || index,
    label: metric.label || metric.name || metric.title || formatLabel(metric.key || metric.id || `Metric ${index + 1}`),
    value: metric.value ?? metric.count ?? metric.total ?? 0
  };
};

const getServiceSummary = (payload, response) => {
  const summary =
    payload.serviceSummary ||
    payload.service_summary ||
    response?.serviceSummary ||
    response?.service_summary ||
    {};

  if (Array.isArray(summary)) {
    return summary[0] || {};
  }

  return summary || {};
};

export const normalizeReferral = (referral = {}) => {
  const name = referral.partnerName || referral.partner_name || referral.name || referral.customerName || referral.customer_name || '';

  return {
    date: referral.date || referral.createdAt || referral.created_at || '',
    id: getReferralId(referral),
    name,
    partnerName: name,
    profit: referral.profit || referral.earnings || referral.totalProfit || referral.total_profit || 0,
    service: referral.service || referral.serviceName || referral.service_name || ''
  };
};

const getReferralId = (referral) => {
  return referral?.id || referral?.referralId || referral?.referral_id;
};

const hasReferralFields = (referral) => {
  return Boolean(
    getReferralId(referral) ||
      referral?.partnerName ||
      referral?.partner_name ||
      referral?.name ||
      referral?.customerName ||
      referral?.customer_name ||
      referral?.service ||
      referral?.serviceName ||
      referral?.service_name
  );
};

export const normalizeService = (service = {}) => {
  return {
    activeReferrals: service.activeReferrals || service.active_referrals || service.active || 0,
    service: service.service || service.serviceName || service.service_name || '',
    totalRefEarnings:
      service.totalRefEarnings || service.total_ref_earnings || service.totalReferralEarnings || service.earnings || 0,
    yourReferrals: service.yourReferrals || service.your_referrals || service.totalReferrals || service.total || 0
  };
};
