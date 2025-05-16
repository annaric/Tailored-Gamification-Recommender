import "./App.css";
import { useEffect, useState } from "react";
import RsParameterChoice from "./ChoiceBox/RsParameterChoice";
import ElementDisplay, {
  ElementDisplayProps,
} from "./ElementDisplay/ElementDisplay";

/**
 * The main component of the frontend application.
 * Handles fetching recommender data, managing user-selected parameters, and displaying recommendations.
 */
function App() {
  /**
   * State to store the recommendation results.
   * Each recommendation contains details about a gamification element.
   */
  const [recommendation, setRecommendation] = useState<{
    elements: ElementDisplayProps[];
  }>();

  /**
   * State to track whether the recommendation is valid.
   * Used to display recommendations or an error message.
   */
  const [validRecommendation, setValidRecommendation] =
    useState<boolean>(false);

  /**
   * State to store the user-selected parameters for the recommendation request.
   * Each key corresponds to a recommender type, and the value is the selected option.
   */
  const [selectedParameters, setSelectedParameters] = useState<{
    [key: string]: string;
  }>({});

  /**
   * State to store the available recommender data fetched from the backend.
   * Each key corresponds to a recommender type, and the value is an array of possible options.
   */
  const [recommenderData, setRecommenderData] = useState<{
    [key: string]: string[];
  } | null>(null);

  /**
   * Fetches the available recommender data from the backend on the first render.
   * Populates the `recommenderData` state with the fetched data.
   */
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
        setRecommenderData(data.recommender);
      })
      .catch((error) =>
        console.error("Error fetching recommender data:", error),
      );
  }, []);

  /**
   * Handles changes to the user-selected parameters.
   * Updates the `selectedParameters` state with the new value for the given parameter type.
   * @param paramType - The type of the parameter being updated.
   * @param value - The new value selected by the user.
   */
  const handleParameterChange = (paramType: string, value: string) => {
    setSelectedParameters((prev) => ({
      ...prev,
      [paramType]: value,
    }));
  };

  /**
   * Sends the selected parameters to the backend to fetch recommendations.
   * Updates the `recommendation` and `validRecommendation` states based on the response.
   */
  const handleRecommendClick = () => {
    const requestBody = selectedParameters;
    fetch("http://localhost:3050/recommendation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          setValidRecommendation(false);
          throw new Error("Network response was not ok");
        }
        return response.json() as Promise<{
          recommendation: { elements: ElementDisplayProps[] };
        }>;
      })
      .then((data) => {
        setRecommendation(data.recommendation);
        setValidRecommendation(true);
      })
      .catch((error) => console.log("Fetch error: ", error));
  };

  return (
    <div className="app">
      {/* Header section */}
      <div className="app-header">
        Recommender System of Gamification Elements
      </div>
      {/* Parameter selection section */}
      <div className="choice-selection">
        {recommenderData ? (
          Object.entries(recommenderData).map(([paramType, paramValues]) => (
            <RsParameterChoice
              key={paramType}
              onRsParamSelect={(value) =>
                handleParameterChange(paramType, value)
              }
              paramType={paramType}
              paramValues={paramValues}
            />
          ))
        ) : (
          <p>Loading parameters...</p>
        )}
      </div>

      {/* Button to trigger recommendation */}
      <button onClick={handleRecommendClick}>Recommend</button>

      {/* Recommendations display section */}
      <div className="recommendations">
        <h1>Recommendations</h1>
        {validRecommendation ? (
          recommendation?.elements.map((element, index) => (
            <ElementDisplay
              key={index}
              rank={index + 1}
              imageSrc={element.imageSrc}
              elementName={element.elementName}
              score={element.score}
              standardDeviation={element.standardDeviation}
              details={element.details}
              scoreWeight={element.scoreWeight}
            />
          ))
        ) : (
          <p className="error-message">
            Make your first recommendation by selecting parameters above.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
