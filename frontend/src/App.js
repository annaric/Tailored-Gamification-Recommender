import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    fetch('http://localhost:3050/recommendation')
      .then(response => response.json())
      .then(data => setRecommendation(data.recommendation))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recommendation</h1>
        <p>{recommendation}</p>
      </header>
    </div>
  );
}

export default App;
