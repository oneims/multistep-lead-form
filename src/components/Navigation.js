import React from "react";
import CircularProgress from "./CircularProgress";

const Navigation = ({
  handleNext,
  handlePrev,
  canNext,
  canPrev,
  progress,
  slidesLength,
  currentlyActive,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <>
      <div className="MODULE__MultiStepFormCTA__navigation">
        <span
          onClick={() => handlePrev()}
          className={`MODULE__MultiStepFormCTA__navigation__icon-wrapper MODULE__MultiStepFormCTA__navigation__icon-wrapper-prev ${
            canPrev ? `` : `MODULE__MultiStepFormCTA__navigation__icon-wrapper-disabled`
          }`}
        >
          <div className="MODULE__MultiStepFormCTA__navigation__svg-wrapper">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                version="1.1"
                viewBox="0 0 8.594 14.844"
                xmlSpace="preserve"
              >
                <path d="M.36 14.481a1.22 1.22 0 001.736 0l6.138-6.185c.48-.483.48-1.265 0-1.749L2.096.362a1.22 1.22 0 00-1.736 0 1.242 1.242 0 000 1.75l5.27 5.31-5.27 5.31a1.242 1.242 0 000 1.749"></path>
              </svg>
            </span>
          </div>
        </span>
        <CircularProgress value={progress} />
        <span
          onClick={() => {
            handleNext();
          }}
          // onClick={handleSubmit((d) => console.log(d))}
          className={`MODULE__MultiStepFormCTA__navigation__icon-wrapper MODULE__MultiStepFormCTA__navigation__icon-wrapper-next ${
            canNext ? `` : `MODULE__MultiStepFormCTA__navigation__icon-wrapper-disabled`
          }`}
        >
          {slidesLength - 2 === currentlyActive && (
            <span
              className="MODULE__MultiStepFormCTA__navigation__icon-wrapper-submit"
              onClick={handleSubmit(onSubmit)}
            ></span>
          )}
          {/* <span>{`${currentlyActive} -- ${slidesLength - 1}`}</span> */}
          <div className="MODULE__MultiStepFormCTA__navigation__svg-wrapper">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                version="1.1"
                viewBox="0 0 8.594 14.844"
                xmlSpace="preserve"
              >
                <path d="M.36 14.481a1.22 1.22 0 001.736 0l6.138-6.185c.48-.483.48-1.265 0-1.749L2.096.362a1.22 1.22 0 00-1.736 0 1.242 1.242 0 000 1.75l5.27 5.31-5.27 5.31a1.242 1.242 0 000 1.749"></path>
              </svg>
            </span>
          </div>
        </span>
      </div>
    </>
  );
};

export default Navigation;
