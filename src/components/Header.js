import React from "react";

const Header = ({ label, heading, description, pillBackgroundColor }) => {
  return (
    <>
      {label && (
        <div className="MODULE__pill-wrapper text-center">
          <span
            className="MODULE__pill"
            style={{ backgroundColor: `${pillBackgroundColor ? pillBackgroundColor : ``}` }}
          >
            {label}
          </span>
        </div>
      )}
      <div className="MODULE__heading-and-subtitle text-center">
        {heading && (
          <div className="MODULE__heading-and-subtitle__heading-wrapper">
            <h2 className="MODULE__heading-and-subtitle__heading h2 THEME__f-600 mt-0 mb-2">
              {heading}
            </h2>
          </div>
        )}
        {description && (
          <div className="MODULE__heading-and-subtitle__subtitle-wrapper">
            <p className="MODULE__heading-and-subtitle__subtitle">{description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

Header.defaultProps = {
  label: `FEATURED RESOURCE`,
  heading: `Free Marketing Plan Template`,
  description: `Fill out this form to access a free marketing plan template.`,
};
