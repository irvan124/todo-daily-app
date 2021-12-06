import React, { useState } from "react";
import "./sortDropdown.css";
import SortIcon from "../../assets/sort-icon.png";
import SortNewestIcon from "../../assets/sort-newest.png";
import SortLatestIcon from "../../assets/sort-latest.png";
import SortAZIcon from "../../assets/sort-az.png";
import SortZAIcon from "../../assets/sort-za.png";
import SortUnfinishedIcon from "../../assets/sort-belum-selesai.png";
import SortSelectedIcon from "../../assets/sort-selected.png";

const SortDropdown = ({ sorted, setSorted }) => {
  const [isActive, setIsActive] = useState(false);
  const options = ["Terbaru", "Terlama", "A-Z", "Z-A", "Belum Selesai"];
  return (
    <div className="dropdown-sort">
      <button
        className="dropdown-btn"
        onClick={() => setIsActive(!isActive)}
        data-cy="todo-sort-button"
      >
        <img src={SortIcon} alt="Sort Icon" width={24} height={24} />
      </button>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                setSorted(option);
                setIsActive(false);
              }}
              className="dropdown-item"
              data-cy="sort-selection"
            >
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span data-cy="sort-selection-icon">
                    <img
                      src={
                        option === "Terbaru"
                          ? SortNewestIcon
                          : option === "Terlama"
                          ? SortLatestIcon
                          : option === "A-Z"
                          ? SortAZIcon
                          : option === "Z-A"
                          ? SortZAIcon
                          : SortUnfinishedIcon
                      }
                      alt="Sort Icon Menu"
                      width={23}
                      height={23}
                      className="me-3"
                    />
                  </span>
                  <span data-cy="sort-selection-title">{option}</span>
                </div>
                {sorted === option && (
                  <div data-cy="sort-selection-selected">
                    <img
                      src={SortSelectedIcon}
                      width={20}
                      height={20}
                      alt={"Selected Icon"}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
