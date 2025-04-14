import "./App.css";
import { useEffect, useState } from "react";
import RsParameterChoice from "./ChoiceBox/RsParameterChoice";
import ElementDisplay, {
  ElementDisplayProps,
} from "./ElementDisplay/ElementDisplay";

function App() {
  const [recommendation, setRecommendation] = useState<{
    elements: ElementDisplayProps[];
  }>(); // Add type annotation
  const [validRecommendation, setValidRecommendation] =
    useState<boolean>(false); // Add type annotation
  const [selectedParameters, setSelectedParameters] = useState<{
    [key: string]: string;
  }>({});
  const [recommenderData, setRecommenderData] = useState<{
    [key: string]: string[];
  } | null>(null);


  // Fetch recommender data on first render
  useEffect(() => {
    fetch("http://localhost:3050/recommender", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recommender data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Recommender Data:", data);
        setRecommenderData(data.recommender);
      })
      .catch((error) => console.error("Error fetching recommender data:", error));
    }, []);

  const handleParameterChange = (paramType: string, value: string) => {
    setSelectedParameters((prev) => ({
      ...prev,
      [paramType]: value,
    }));
  };

  const handleRecommendClick = () => {
    const requestBody = selectedParameters;
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
        return response.json() as Promise<{
          recommendation: { elements: ElementDisplayProps[] };
        }>;
      })
      .then((data) => {
        console.log(data.recommendation);
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
        {recommenderData ? (
          Object.entries(recommenderData).map(([paramType, paramValues]) => (
            <RsParameterChoice
              key={paramType}
              onRsParamSelect={(value) => handleParameterChange(paramType, value)}
              paramType={paramType}
              paramValues={paramValues}
            />
          ))
        ) : (
          <p>Loading parameters...</p>
        )}
      </div>
      <button onClick={handleRecommendClick}>Recommend</button>
      <div className="recommendations">
        <h1>Recommendations</h1>
        {validRecommendation ? (
          recommendation?.elements.map((element, index) => (
            <ElementDisplay
              key={index}
              rank={index + 1}
              imageSrc={element.imageSrc}
              elementName={element.elementName}
              scores={element.scores}
              standardDeviations={element.standardDeviations}
              details={element.details}
            />
          ))
        ) : (
          <p className="error-message">
            Could not get any recommendation. Did you select any parameter?
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
