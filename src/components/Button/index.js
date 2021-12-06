import React from "react";

const Buttons = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={
        "btn btn-primary rounded-pill fs-5 text-white  fw-bold px-4 py-2"
      }
      data-cy="activity-add-button"
    >
      {props.title}
    </button>
  );
};

export default Buttons;
