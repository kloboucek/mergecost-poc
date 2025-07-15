import React, { useState } from 'react';
import CompanyForm from './components/CompanyForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [result, setResult] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://backend:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>M&A Integration Cost Estimator</h1>
      {!result ? (
        <CompanyForm onSubmit={handleSubmit} />
      ) : (
        <ResultDisplay result={result} onReset={() => setResult(null)} />
      )}
    </div>
  );
}

export default App;
