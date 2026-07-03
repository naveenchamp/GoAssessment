import './index.css';

const Overview = ({ metrics }) => {
  const metricItems = Array.isArray(metrics) ? metrics : [];

  return (
    <section className="overview mb-4" aria-labelledby="overview-title">
      <h2 className="h4 fw-bold mb-3" id="overview-title">
        Overview
      </h2>

      {metricItems.length === 0 ? (
        <p className="text-secondary mb-0">No metrics available.</p>
      ) : (
        <div className="row g-3">
          {metricItems.map((metric) => (
            <div className="col-12 col-sm-6 col-lg-3" key={metric.id}>
              <div className="overview__card p-3 h-100">
                <p className="overview__label small mb-1">{metric.label}</p>
                <p className="overview__value h4 fw-bold mb-0">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Overview;
