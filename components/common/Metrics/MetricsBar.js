import React, { useEffect, useState, useCallback } from 'react';

const MetricsBar = () => {
  const [metrics, setMetrics] = useState(new Map());

  const handleMetricEvent = useCallback(event => {
    setMetrics(metrics => new Map(metrics.set(event.detail.name, event.detail.value)));
  },[]);

  useEffect(() => {
    window?.addEventListener(`metric-event`, handleMetricEvent);

    return () => window?.removeEventListener(`metric-event`, handleMetricEvent);
  }, []);
  
  return (
    <div className="bottom-bar">
      <h2>METRICS</h2>
      <div className="bottom-bar__data-wrapper">
      {[...metrics].map(([name, value]) => {
        return (
            <div key={name} className="bottom-bar__value-wrapper">
              <h3>{name}</h3>
              <span>{`${value?.toFixed(2)} ms`}</span>
            </div>
          )
      })}
      </div>
    </div>
  );
};

export default MetricsBar;
