import { useState } from "react";
import "./RsParameterChoice.css";

/**
 * Props for the `RsParameterChoice` component.
 * Represents the data structure for a parameter selection box.
 */
interface RsParameterChoiceProps {
  /**
   * Callback function to handle the selection of a parameter value.
   * @param paramValue - The selected parameter value.
   */
  onRsParamSelect: (paramValue: string) => void;
  /**
   * The type of the parameter being selected (e.g., "gender", "age").
   */
  paramType: string;
  /**
   * The list of possible values for the parameter.
   */
  paramValues: string[];
}

/**
 * The `RsParameterChoice` component renders a selection box for a specific parameter.
 * It allows users to enable/disable the parameter and select a value from the available options.
 */
function RsParameterChoice({
  onRsParamSelect: onRsParamSelect,
  paramType: paramType,
  paramValues: paramValues,
}: RsParameterChoiceProps) {
  /**
   * State to store the currently selected parameter value.
   */
  const [rsParameter, setRsParameter] = useState("");

  /**
   * State to track whether the parameter selection is enabled or disabled.
   */
  const [isDisabled, setIsDisabled] = useState(true);

  /**
   * Handles changes to the selected parameter value.
   * Updates the `rsParameter` state and calls the `onRsParamSelect` callback.
   * @param selectedParamValue - The newly selected parameter value.
   */
  const handleChoiceChange = (selectedParamValue: string) => {
    setRsParameter(selectedParamValue);
    onRsParamSelect(selectedParamValue);
  };

  /**
   * Toggles the enabled/disabled state of the parameter selection.
   * Resets the selected parameter value when disabled.
   */
  const handleDisableChange = () => {
    setIsDisabled(!isDisabled);
    setRsParameter("");
    onRsParamSelect("");
  };

  return (
    <div className="rs-parameter-selection-box">
      {/* Header section with a checkbox to enable/disable the parameter */}
      <div className="rs-choice-header">
        <input
          type="checkbox"
          checked={!isDisabled}
          onChange={handleDisableChange}
          className="disable-checkbox"
        />
        <div className="recommender-title">
          {/* Format the parameter type to display it in a readable format */}
          {paramType[0].toUpperCase() +
            paramType.slice(1).replace(/([A-Z])/g, " $1")}{" "}
        </div>
      </div>

      {/* Options section with radio buttons for parameter values */}
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

      {/* Display the currently selected parameter value */}
      <p className="rs-selected">Selected: {rsParameter || "None"}</p>
    </div>
  );
}

export default RsParameterChoice;
