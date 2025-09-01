import React, { useState } from "react";
import "./ElementDisplay.css"; // Add styles for the component

/**
 * Props for the `ElementDisplay` component.
 * Represents the data structure for displaying a ranked gamification element.
 */
export interface ElementDisplayProps {
  /**
   * The rank of the gamification element in the recommendation list.
   */
  rank: number;

  /**
   * The image source for the gamification element.
   */
  imageSrc: string;

  /**
   * The name of the gamification element.
   */
  elementName: string;

  /**
   * The score object containing the overall score and individual scores for each recommender.
   */
  score: {
    overallScore: number;
    scores: { [key: string]: number };
  };

  /**
   * The score weight object containing the sum of weights and individual weights for each recommender.
   */
  scoreWeight: {
    sumOfWeights: number;
    weights: { [key: string]: number };
  };

  /**
   * The standard deviation object containing overall, mean, and individual standard deviations.
   */
  standardDeviation: {
    overallStandardDeviation: number;
    meanStandardDeviation: number;
    standardDeviations: { [key: string]: number };
  };

  /**
   * The detailed description of the gamification element.
   */
  details: string;
}

/**
 * The `ElementDisplay` component displays detailed information about a gamification element based on a recommendation.
 * It includes the rank, image, name, scores, standard deviations, and additional details.
 */
const ElementDisplay: React.FC<ElementDisplayProps> = ({
  rank,
  imageSrc,
  elementName,
  score,
  scoreWeight,
  standardDeviation,
  details,
}) => {
  /**
   * State to track whether the details section is expanded.
   */
  const [isExpanded, setIsExpanded] = useState(false);
  /**
   * State to track whether the image popup is visible.
   */
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  /**
   * Toggles the visibility of the details section.
   */
  const toggleDetails = () => setIsExpanded(!isExpanded);
  /**
   * Toggles the visibility of the image popup.
   */
  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  /**
   * Constructs the backend URL for the element's image.
   */
  const backendImageUrl = "http://localhost:3050/images/" + imageSrc;

  return (
    <div className="element-display">
      {/* Row displaying the rank, image, name, and scores */}
      <div className="element-row">
        <span className="rank">{rank}</span>
        <img
          src={backendImageUrl}
          alt={elementName}
          className="element-image small"
          onClick={togglePopup}
        />
        <span className="element-name">{elementName}</span>
        <div className="score-group">
          {/* Display overall score */}
          {!(score.overallScore === undefined) && (
            <span
              className={`score ${
                Number(score.overallScore.toFixed(3)) * 2 - 1 > 0.1
                  ? "score-green"
                  : Number(score.overallScore.toFixed(3)) * 2 - 1 < -0.1
                    ? "score-red"
                    : "score-yellow"
              }`}
            >
              Overall Score: {(Number(score.overallScore) * 2 - 1).toFixed(3)}
            </span>
          )}

          {/* Display overall standard deviation */}
          {!(standardDeviation.overallStandardDeviation === undefined) && (
            <span className="standard-deviation">
              Recommender based Standard deviation:{" "}
              {(Number(standardDeviation.overallStandardDeviation) * 2).toFixed(3) || 0}
            </span>
          )}

          {/* Display mean standard deviation */}
          {!(standardDeviation.meanStandardDeviation === undefined) && (
            <span className="standard-deviation">
              Mean Standard deviation:{" "}
              {(Number(standardDeviation.meanStandardDeviation) * 2).toFixed(3) || 0}
            </span>
          )}

          {/* Display the number of papers contributing to the score */}
          {scoreWeight && !(scoreWeight.sumOfWeights === undefined) && (
            <span className="standard-deviation">
              Number of Papers: {scoreWeight.sumOfWeights}
            </span>
          )}
        </div>
        <button className="dropdown-button" onClick={toggleDetails}>
          {isExpanded ? "▲" : "▼"}
        </button>
      </div>

      {/* Expanded details section (detailed information about individual scores per recommender and about the gamification element) */}
      {isExpanded && (
        <div className="element-details">
          <span className="details-text">{details}</span>
          <hr></hr>
          <div className="details-content">
            {score.scores &&
              Object.keys(score.scores).map((key, index) => (
                <div className="score-group" key={index}>
                  <span className="score">
                    {key[0].toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, " $1")}
                    :
                  </span>
                  <span className="standard-deviation">
                    Score: {(Number(score.scores[key]) * 2 - 1).toFixed(3) || 0}
                  </span>
                  <span className="standard-deviation">
                    Standard Deviation:{" "}
                    {(Number(standardDeviation.standardDeviations[key]) * 2).toFixed(3) || 0}
                  </span>
                  <span className="standard-deviation">
                    Number of Papers: {scoreWeight.weights[key] || 0}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Image popup */}
      {isPopupVisible && (
        <div className="image-popup" onClick={togglePopup}>
          <div className="popup-content">
            <img
              src={backendImageUrl}
              alt={elementName}
              className="element-image large"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ElementDisplay;
