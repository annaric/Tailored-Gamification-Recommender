import "./App.css";
import { useState } from "react";
import GenderChoice from "./ChoiceBox/GenderChoice";
import ElementDisplay, {ElementDisplayProps} from "./ElementDisplay/ElementDisplay";

function App() {
  const [recommendation, setRecommendation] = useState<{elements: ElementDisplayProps[]}>(); // Add type annotation
  const [validRecommendation, setValidRecommendation] = useState<boolean>(false); // Add type annotation
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
          setValidRecommendation(false);
          //"Could not get any recommendation. Did you select any parameter?"
          throw new Error("Network response was not ok");
        }
        return response.json() as Promise<{ recommendation: {elements: ElementDisplayProps[]} }>;
      })
      .then((data) => {
        console.log(data.recommendation)
        setRecommendation(data.recommendation); // Set the recommendation first
        console.log("Recommendation: ", recommendation); // Log the recommendation
        setValidRecommendation(true); // Then mark the recommendation as valid
      })
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
        {validRecommendation ? (
          recommendation?.elements.map((element, index) => (
            <ElementDisplay
              key={index}
              rank={index + 1}
              imageSrc={element.imageSrc}
              elementName={element.elementName}
              percentages={element.percentages}
              details={element.details}
            />
          ))
        ) : (
          <p className="error-message">Could not get any recommendation. Did you select any parameter?</p>
        )}
      </div>
    </div>
  );
}

export default App;
