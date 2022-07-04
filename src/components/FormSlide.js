import React from "react";

const FormSlide = ({ heading, formFields, active, currentlyActive, index, type }) => {
  return (
    <>
      <div
        style={{
          marginLeft: index === 0 ? `-${Number(currentlyActive)}00%` : `0%`,
        }}
        className={`MODULE__MultiStepFormCTA__card__slide ${
          active ? `MODULE__MultiStepFormCTA__card__slide-active` : ``
        }`}
      >
        <div className="MODULE__MultiStepFormCTA__card__slide__wrapper">
          {heading && (
            <div className="MODULE__MultiStepFormCTA__card__slide__heading">
              <span>{heading}</span>
            </div>
          )}
          <div className="MODULE__MultiStepFormCTA__card__slide__form-fields-wrapper">
            {formFields.map((elem) => {
              return (
                <div key={elem.name} className="MODULE__MultiStepFormCTA__card__slide__form-field">
                  <label
                    htmlFor={elem.name}
                    className="MODULE__MultiStepFormCTA__card__slide__form-field__label"
                  >
                    {elem.label}
                  </label>
                  <div className="MODULE__MultiStepFormCTA__card__slide__form-field__input-wrapper">
                    <input
                      type="text"
                      id={elem.name}
                      name={elem.name}
                      placeholder={elem.placeholder}
                      className="MODULE__MultiStepFormCTA__card__slide__form-field__input"
                    />
                    <div className="MODULE__MultiStepFormCTA__card__slide__form-field__input-svg-wrapper">
                      <div className="MODULE__MultiStepFormCTA__card__slide__form-field__input-svg">
                        <span>{/* SVG HERE */}</span>
                      </div>
                    </div>
                  </div>
                  {elem.errorMessage && (
                    <div
                      id="fname-error"
                      className="MODULE__MultiStepFormCTA__card__slide__form-field__error"
                    >
                      <span>Must consist of at least one character</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSlide;

FormSlide.defaultProps = {
  heading: `Hi 👋 What's your name?`,
  formFields: [
    {
      name: `fName`,
      label: `First Name`,
      placeholder: `John`,
      errorMessage: `Must consist of at least one character`,
    },
    {
      name: `lName`,
      label: `Last Name`,
      placeholder: `Smith`,
      errorMessage: `Must consist of at least one character`,
    },
  ],
};
