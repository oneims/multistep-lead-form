import React, { useEffect, useState, useRef } from "react";
import { PlayState, Tween } from "react-gsap";
import Header from "./components/Header";
import FormSlide from "./components/FormSlide";
import Navigation from "./components/Navigation";

const App = () => {
  const [playState, setPlayState] = useState(PlayState.stop);
  const [boundingClientRect, setBoundingClientRect] = useState({
    top: 0,
    left: 0,
    width: 608,
    height: 240,
  });
  const [expanded, setExpanded] = useState(false);
  const [slide, setSlide] = useState([
    {
      id: 1,
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
    },
    {
      id: 2,
      heading: `Hi {name}, what's your email address?`,
      formFields: [
        {
          name: `email`,
          label: `Email Address`,
          placeholder: `john@smith.com`,
          errorMessage: `Must enter a valid email`,
        },
      ],
    },
    {
      id: 3,
      heading: `And your phone number?`,
      formFields: [
        {
          name: `phone`,
          label: `Phone Number`,
          placeholder: `111 222 3333`,
          errorMessage: `Number may only contain numbers, +()-. and x`,
        },
      ],
    },
  ]);

  const cardRef = useRef();

  const scrollHandler = () => {
    setBoundingClientRect((prevState) => ({
      ...prevState,
      left: cardRef.current.getBoundingClientRect().left,
      top: cardRef.current.getBoundingClientRect().top,
      width: cardRef.current.getBoundingClientRect().width,
      height: cardRef.current.getBoundingClientRect().height,
    }));
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };
  }, [boundingClientRect]);

  const HandleExpanded = () => {
    if (expanded) {
      setExpanded(false);
      setPlayState(PlayState.reverse);
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 1000);
    } else {
      setExpanded(true);
      setPlayState(PlayState.play);
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <section style={{ minHeight: "500vh" }} id="BLOCK__kkd00s" className="pt-5 pb-5">
        <div className="container">
          <div className="THEME__mw-800 mx-auto">
            <div className="MODULE__article-content">
              <div className="MODULE__inline-callout-cta pt-4 pb-4">
                <div className="MODULE__inline-callout-cta__body">
                  <Header />
                  <div
                    className={`MODULE__MultiStepFormCTA ${
                      expanded ? `MODULE__MultiStepFormCTA-active` : ``
                    }`}
                  >
                    <div
                      onClick={() => HandleExpanded()}
                      className="MODULE__MultiStepFormCTA__screen-tint"
                    ></div>
                    <div
                      onClick={() => HandleExpanded()}
                      className="MODULE__MultiStepFormCTA__open"
                    ></div>
                    <img
                      src="//cdn2.hubspot.net/hubfs/53/tools/Multi%20Step%20Form/offer-left.svg"
                      alt=""
                      className="MODULE__MultiStepFormCTA__image-cutout MODULE__MultiStepFormCTA__image-cutout-left"
                    />
                    <Tween
                      playState={playState}
                      from={{
                        width: boundingClientRect.width + "px",
                        height: boundingClientRect.height + "px",
                        position: "sticky",
                      }}
                      to={{
                        position: "fixed",
                        width: "85vw",
                        height: "85vh",
                        top: "7.5vh",
                        left: "7.5vw",
                      }}
                      duration={1}
                      ease="elastic.out(0.2, 0.1)"
                    >
                      <div
                        style={{
                          top: boundingClientRect.top + "px",
                          left: boundingClientRect.left + "px",
                        }}
                        ref={cardRef}
                        className="MODULE__MultiStepFormCTA__card"
                      >
                        <div className="MODULE__MultiStepFormCTA__card__wrapper">
                          <button
                            onClick={() => HandleExpanded()}
                            aria-label="Close form"
                            className="MODULE__MultiStepFormCTA__close"
                          >
                            <div className="MODULE__MultiStepFormCTA__close-outer">
                              <span className="isvg loaded">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                >
                                  <g
                                    fill="none"
                                    fillRule="evenodd"
                                    stroke="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    transform="translate(-1297 -342)"
                                  >
                                    <g
                                      stroke="#FFF"
                                      strokeWidth="2"
                                      transform="translate(1298 343)"
                                    >
                                      <g>
                                        <path d="M0 11.314L11.314 0"></path>
                                        <path
                                          d="M0 11.314L11.314 0"
                                          transform="matrix(-1 0 0 1 11.314 0)"
                                        ></path>
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </span>
                            </div>
                          </button>
                          <form className="MODULE__MultiStepFormCTA__card__form">
                            <FormSlide />
                          </form>
                          <Navigation />
                        </div>
                        <div className="MODULE__heading"></div>
                      </div>
                    </Tween>
                    <img
                      src="//cdn2.hubspot.net/hubfs/53/tools/Multi%20Step%20Form/offer-right.svg"
                      alt=""
                      className="MODULE__MultiStepFormCTA__image-cutout MODULE__MultiStepFormCTA__image-cutout-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
