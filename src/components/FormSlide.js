import React from "react";

const FormSlide = ({
  heading,
  formFields,
  active,
  currentlyActive,
  index,
  type,
  register,
  errors,
  HandleSlideValidated,
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
                        tabIndex={elem.tabIndex}
                        type="text"
                        id={elem.name}
                        name={elem.name}
                        placeholder={elem.placeholder}
                        className="MODULE__MultiStepFormCTA__card__slide__form-field__input"
                        {...register(elem.name, {
                          onChange: () => HandleSlideValidated(),
                          required: elem.required ? elem.required.message : elem.required,
                        })}
                      />
                      <div className="MODULE__MultiStepFormCTA__card__slide__form-field__input-svg-wrapper">
                        <div className="MODULE__MultiStepFormCTA__card__slide__form-field__input-svg">
                          <span>{/* SVG HERE */}</span>
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
