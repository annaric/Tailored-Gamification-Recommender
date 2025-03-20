import './App.css';
import React, { useEffect, useState } from 'react';
import GenderChoice from "./ChoiceBox/GenderChoice";


function App() {
  const [recommendation, setRecommendation] = useState('');
  const [selectedGender, setSelectedGender] = useState("");
  
  const handleClick = () => {
    fetch('http://localhost:3050/recommendation?input=${selectedGender}')
      .then(response => response.json())
      .then(data => setRecommendation(data.recommendation))
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <div class="App-header">Recommender System</div>
      <div class= "ChoiceSelection">
        <GenderChoice onGenderSelect={setSelectedGender} /> 
      </div>
      <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Recommend
      </button>
      <div class="Recommendations">
        <h1>Recommendations</h1>
        <p>{recommendation}</p>
      </div>
    </div>
  );
}

export default App;
