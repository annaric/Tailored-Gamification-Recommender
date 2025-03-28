import "./App.css";
import { useState } from "react";
import GenderChoice from "./ChoiceBox/GenderChoice";

function App() {
  const [recommendation, setRecommendation] = useState<string>(""); // Add type annotation
  const [selectedGender, setSelectedGender] = useState<string>(""); // Add type annotation

  const handleClick = () => {
    const requestBody = { gender: selectedGender };
    fetch("http://localhost:3050/recommendation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(requestBody), // Convert the JSON object to a string
    })
      .then((response) => {
        if (!response.ok) {
          setRecommendation(
            "Could not get any recommendation. Did you select any parameter?",
          );
          throw new Error("Network response was not ok");
        }
        return response.json() as Promise<{ recommendation: string }>; // Add type assertion
      })
      .then((data) => setRecommendation(data.recommendation))
      .catch((error) => console.log("Fetch error: ", error));
  };

  return (
    <div className="app">
      <div className="app-header">
        Recommender System of Gamification Elements
      </div>
      <div className="choice-selection">
        <GenderChoice onGenderSelect={setSelectedGender} />
      </div>
      <button onClick={handleClick}>Recommend</button>
      <div className="recommendations">
        <h1>Recommendations</h1>
        <p>{recommendation}</p>
      </div>
    </div>
  );
}

export default App;
