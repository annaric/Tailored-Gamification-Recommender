import React, { useState } from "react";
import "./ElementDisplay.css"; // Add styles for the component

export interface ElementDisplayProps {
  rank: number;
  imageSrc: string;
  elementName: string;
  percentages: { overallPercentage: number };
  details: string;
}

const ElementDisplay: React.FC<ElementDisplayProps> = ({
  rank,
  imageSrc: imageSrc,
  elementName,
  percentages,
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
        <span className="percentage">Score: {percentages.overallPercentage.toFixed(3)}</span>
        <button className="dropdown-button" onClick={toggleDetails}>
          {isExpanded ? "▲" : "▼"}
        </button>
      </div>
      {isExpanded && (
        <div className="element-details">
          <p>{details}</p>
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
