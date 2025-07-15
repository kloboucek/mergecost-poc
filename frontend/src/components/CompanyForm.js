import React, { useState } from 'react';

const CompanyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'Manufacturing',
    financingModel: 'purchase',
    site_counts: {
      headquarters: 0,
      manufacturingPlants: 0,
      salesOffices: 0,
      engineeringHubs: 0,
      warehouses: 0
    },
    criticalSystems: []
  });

  const industries = ["Manufacturing", "Retail", "Tech", "Healthcare", "Other"];
  const financingOptions = [
    { value: 'purchase', label: 'Outright Purchase' },
    { value: '3yr_lease', label: '3-Year Lease' },
    { value: '5yr_lease', label: '5-Year Lease' }
  ];
  const systemOptions = ["ERP", "SCADA", "CRM", "Custom Applications"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSiteCountChange = (siteType, value) => {
    setFormData({
      ...formData,
      site_counts: {
        ...formData.site_counts,
        [siteType]: parseInt(value) || 0
      }
    });
  };

  const handleSystemChange = (system) => {
    setFormData(prev => {
      const systems = prev.criticalSystems.includes(system)
        ? prev.criticalSystems.filter(s => s !== system)
        : [...prev.criticalSystems, system];
      return { ...prev, criticalSystems: systems };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Company Information</h2>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Industry</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
          >
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Financing Model</label>
          <select
            name="financingModel"
            value={formData.financingModel}
            onChange={handleInputChange}
          >
            {financingOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="form-section">
        <h2>Site Information</h2>
        <div className="site-grid">
          {Object.entries(formData.site_counts).map(([siteType, count]) => (
            <div key={siteType} className="site-input">
              <label>{siteType.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="number"
                min="0"
                value={count}
                onChange={(e) => handleSiteCountChange(siteType, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="form-section">
        <h2>Critical Systems</h2>
        <div className="systems-grid">
          {systemOptions.map(system => (
            <label key={system} className="system-option">
              <input
                type="checkbox"
                checked={formData.criticalSystems.includes(system)}
                onChange={() => handleSystemChange(system)}
              />
              {system}
            </label>
          ))}
        </div>
      </div>
      
      <button type="submit" className="submit-btn">
        Calculate Integration Costs
      </button>
    </form>
  );
};

export default CompanyForm;
