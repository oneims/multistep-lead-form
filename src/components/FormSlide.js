import React from "react";
import styled from "styled-components";
import InputSVG from "./InputSVG";

const Button = styled.button`
  padding: 1rem 1.5rem;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: rgb(255, 255, 255);
  pointer-events: all;
  font-size: 1rem;
  font-weight: 500;
`;

const FormSlide = ({
  heading,
  description,
  buttonTitle,
  buttonDestination,
  formFields,
  active,
  currentlyActive,
  index,
  type,
  register,
  errors,
  currentlyFocused,
  handleSlideValidated,
  handleCurrentlyFocused,
}) => {
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
        {type === `message` && (
          <div className="MODULE__MultiStepFormCTA__card__slide__wrapper">
            {heading && (
              <div className="MODULE__MultiStepFormCTA__card__slide__heading">
                <span>{heading}</span>
              </div>
            )}
            {description && (
              <div className="MODULE__MultiStepFormCTA__card__slide__description">
                <p>{description}</p>
              </div>
            )}
            {buttonTitle && buttonDestination && (
              <div className="MODULE__MultiStepFormCTA__card__slide__button-wrapper">
                <a tabIndex="-1" href={buttonDestination} target="_blank" rel="noreferrer">
                  <Button tabIndex="-1">{buttonTitle}</Button>
                </a>
              </div>
            )}
          </div>
        )}
        {type === `form` && (
          <div className="MODULE__MultiStepFormCTA__card__slide__wrapper">
            {heading && (
              <div className="MODULE__MultiStepFormCTA__card__slide__heading">
                <span>{heading}</span>
              </div>
            )}
            <div className="MODULE__MultiStepFormCTA__card__slide__form-fields-wrapper">
              {formFields.map((elem) => {
                return (
                  <div
                    key={elem.name}
                    className="MODULE__MultiStepFormCTA__card__slide__form-field"
                  >
                    <label
                      htmlFor={elem.name}
                      className="MODULE__MultiStepFormCTA__card__slide__form-field__label"
                    >
                      {elem.label}
                    </label>
                    <div className="MODULE__MultiStepFormCTA__card__slide__form-field__input-wrapper">
                      <input
                        onFocus={(e) => handleCurrentlyFocused(e)}
                        tabIndex={elem.tabIndex}
                        type="text"
                        id={elem.name}
                        name={elem.name}
                        placeholder={elem.placeholder}
                        className="MODULE__MultiStepFormCTA__card__slide__form-field__input"
                        {...register(elem.name, {
                          onBlur: () => handleCurrentlyFocused(),
                          onChange: () => handleSlideValidated(),
                          required: elem.required ? elem.required.message : elem.required,
                          pattern: elem.pattern ? elem.pattern : null,
                        })}
                      />
                      <div
                        className={`MODULE__MultiStepFormCTA__card__slide__form-field__input-svg-wrapper ${
                          currentlyFocused === elem.name
                            ? `MODULE__MultiStepFormCTA__card__slide__form-field__input-svg-wrapper-focus`
                            : ``
                        }`}
                      >
                        <div className="MODULE__MultiStepFormCTA__card__slide__form-field__input-svg">
                          <span>
                            <InputSVG />
                          </span>
                        </div>
                      </div>
                    </div>
                    {errors[elem.name] && (
                      <div
                        id="fname-error"
                        className="MODULE__MultiStepFormCTA__card__slide__form-field__error"
                      >
                        <span>{errors[elem.name].message}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FormSlide;
