import { useState } from "react";
import "./RsParameterChoice.css";

interface GenderChoiceProps {
  onRsParamSelect: (paramValue: string) => void;
  paramType: string;
  paramValues: string[];
}

function RsParameterChoice({
  onRsParamSelect: onRsParamSelect,
  paramType: paramType,
  paramValues: paramValues,
}: GenderChoiceProps) {
  const [rsParameter, setRsParameter] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChoiceChange = (selectedParamValue: string) => {
    setRsParameter(selectedParamValue);
    onRsParamSelect(selectedParamValue);
  };

  const handleDisableChange = () => {
    setIsDisabled(!isDisabled);
    setRsParameter("");
    onRsParamSelect("");
  };

  return (
    <div className="rs-parameter-selection-box">
      <div className="rs-choice-header">
        <input
          type="checkbox"
          checked={!isDisabled}
          onChange={handleDisableChange}
          className="disable-checkbox"
        />
        <div className="recommender-title">{paramType[0].toUpperCase() + paramType.slice(1).replace(/([A-Z])/g, " $1")} </div>
      </div>
      <div className="rs-choice-options">
        {paramValues?.map((param, index) => (
          <label className="rs-choice-label" key={index}>
            <input
              type="radio"
              name={paramType}
              value={param}
              checked={rsParameter === param}
              onChange={() => handleChoiceChange(param)}
              disabled={isDisabled}
              className="rs-input"
            />
            <span>{param}</span>
          </label>
        ))}
      </div>
      <p className="rs-selected">Selected: {rsParameter || "None"}</p>
    </div>
  );
}

export default RsParameterChoice;
