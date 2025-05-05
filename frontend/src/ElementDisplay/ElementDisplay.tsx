import React, { useState } from "react";
import "./ElementDisplay.css"; // Add styles for the component

export interface ElementDisplayProps {
  rank: number;
  imageSrc: string;
  elementName: string;
  score: {
    overallScore: number;
    scores: { [key: string]: number };
  };
  standardDeviation: {
    overallStandardDeviation: number;
    meanStandardDeviation: number;
    standardDeviations: { [key: string]: number };
  };
  details: string;
}

const ElementDisplay: React.FC<ElementDisplayProps> = ({
  rank,
  imageSrc: imageSrc,
  elementName,
  score,
  standardDeviation,
  details,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const toggleDetails = () => setIsExpanded(!isExpanded);
  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  return (
    <div className="element-display">
      <div className="element-row">
        <span className="rank">{rank}</span>
        <img
          src={`/imgs/${imageSrc}`}
          alt={elementName}
          className="element-image small"
          onClick={togglePopup}
        />
        <span className="element-name">{elementName}</span>
        <div className="score-group">
          {!(score.overallScore === undefined) && (
            <span className="score">
              Overall Score: {score.overallScore.toFixed(3)}
            </span>
          )}
          {!(standardDeviation.overallStandardDeviation === undefined) && (
            <span className="standard-deviation">
              Recommender based Standard deviation:{" "}
              {standardDeviation.overallStandardDeviation.toFixed(3)}
            </span>
          )}
          {!(standardDeviation.meanStandardDeviation === undefined) && (
            <span className="standard-deviation">
              Mean Standard deviation:{" "}
              {standardDeviation.meanStandardDeviation.toFixed(3)}
            </span>
          )}
        </div>
        <button className="dropdown-button" onClick={toggleDetails}>
          {isExpanded ? "▲" : "▼"}
        </button>
      </div>
      {isExpanded && (
        <div className="element-details">
          <span className="details-text">{details}</span>
          <hr></hr>
          <div className="details-content">
            {score.scores &&
              Object.keys(score.scores).map((key, index) => (
                <div className="score-group" key={index}>
                  <span className="score">{key[0].toUpperCase() + key.slice(1)}:</span>
                  <span className="standard-deviation">
                    Score: {score.scores[key].toFixed(3) || 0}
                  </span>
                  <span className="standard-deviation">
                    Standard Deviation:
                    {standardDeviation.standardDeviations[key].toFixed(3) || 0}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
      {isPopupVisible && (
        <div className="image-popup" onClick={togglePopup}>
          <div className="popup-content">
            <img
              src={`/imgs/${imageSrc}`}
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
