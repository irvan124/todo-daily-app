import React, { useState } from "react";
import Indicator from "../Indicator";
import "./dropdown.css";

const Dropdowns = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const options = ["very-high", "high", "normal", "low", "very-low"];
  return (
    <div className="dropdown">
      <div
        className="dropdown-btn d-flex justify-content-between"
        onClick={() => setIsActive(!isActive)}
        data-cy="modal-add-priority-dropdown"
      >
        {" "}
        <div className="d-flex align-items-center">
          <Indicator priority={selected} />
          {selected === "very-high"
            ? "Very High"
            : selected === "high"
            ? "High"
            : selected === "normal"
            ? "Medium"
            : selected === "low"
            ? "Low"
            : "Very Low"}
        </div>
        <div>▼</div>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              <div className="d-flex align-items-center">
                <Indicator priority={option} />
                {option === "very-high"
                  ? "Very High"
                  : option === "high"
                  ? "High"
                  : option === "normal"
                  ? "Medium"
                  : option === "low"
                  ? "Low"
                  : "Very Low"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdowns;
