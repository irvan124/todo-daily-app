import React from "react";
import "./indicator.css";

const Indicator = (props) => {
  return (
    <div
      className={
        props.priority === "very-high"
          ? "label-indicator very-high"
          : props.priority === "high"
          ? "label-indicator high"
          : props.priority === "normal"
          ? "label-indicator normal"
          : props.priority === "low"
          ? "label-indicator low"
          : "label-indicator very-low"
      }
    />
  );
};

export default Indicator;
