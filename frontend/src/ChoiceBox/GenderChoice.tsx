import { useState } from "react";
import "./GenderChoice.css";

interface GenderChoiceProps {
  onGenderSelect: (gender: string) => void;
}

function GenderChoice({ onGenderSelect }: GenderChoiceProps) {
  const [gender, setGender] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleGenderChange = (selectedGender: string) => {
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

export default GenderChoice;
