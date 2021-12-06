import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header bg-primary">
      <div className="container" data-cy="header-background">
        <h2 className="header-title" data-cy="header-title">
          TO DO LIST APP
        </h2>
      </div>
    </div>
  );
};

export default Header;
