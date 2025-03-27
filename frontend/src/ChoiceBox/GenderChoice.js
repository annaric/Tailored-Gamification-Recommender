import React, { useState } from "react";
import PropTypes from "prop-types";
import "./GenderChoice.css";

export default function GenderChoice({ onGenderSelect }) {
  const [gender, setGender] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    onGenderSelect(selectedGender);
  };

  const handleDisableChange = () => {
    setIsDisabled(!isDisabled);
    setGender("");
    onGenderSelect("");
  };

  return (
    <div className="gender-box">
      <div className="gender-header">
        <input
          type="checkbox"
          checked={isDisabled}
          onChange={handleDisableChange}
          className="disable-checkbox"
        />
        <h2>Select Gender</h2>
      </div>
      <div className="gender-options">
        <label className="gender-label">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={() => handleGenderChange("male")}
            disabled={isDisabled}
            className="gender-input"
          />
          <span>Male</span>
        </label>
        <label className="gender-label">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={() => handleGenderChange("female")}
            disabled={isDisabled}
            className="gender-input"
          />
          <span>Female</span>
        </label>
      </div>
      <p className="gender-selected">Selected: {gender || "None"}</p>
    </div>
  );
}

GenderChoice.propTypes = {
  onGenderSelect: PropTypes.func.isRequired,
};
