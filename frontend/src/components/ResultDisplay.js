import React from 'react';

const ResultDisplay = ({ result, onReset }) => {
  const { total_estimate, breakdown } = result;
  
  return (
    <div className="result-container">
      <h2>Cost Estimate: ${total_estimate.toLocaleString()}</h2>
      
      <div className="breakdown-section">
        <h3>Cost Breakdown</h3>
        <ul>
          <li>Site Costs: ${breakdown.site_costs.toLocaleString()}</li>
          <li>System Costs: ${breakdown.system_costs.toLocaleString()}</li>
          <li>Financing Model: {breakdown.financing_model} (Factor: {breakdown.financing_factor})</li>
          <li>Industry: {breakdown.industry} (Multiplier: {breakdown.industry_factor})</li>
        </ul>
      </div>
      
      <div className="financing-summary">
        <h3>Financing Summary</h3>
        <p>
          {breakdown.financing_model === 'purchase' 
            ? 'Outright purchase provides long-term cost savings but requires higher upfront investment'
            : `${breakdown.financing_model.replace('yr_', '-year ')} option reduces upfront costs through periodic payments`}
        </p>
      </div>
      
      <button onClick={onReset} className="reset-btn">
        Calculate Another Estimate
      </button>
    </div>
  );
};

export default ResultDisplay;
