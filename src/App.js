import React, { useEffect, useState, useRef } from "react";
// Animations
import { PlayState, Tween } from "react-gsap";
// Components
import Header from "./components/Header";
import FormSlide from "./components/FormSlide";
import Navigation from "./components/Navigation";
// Form
import { useForm } from "react-hook-form";

const App = () => {
  // Ref
  const cardRef = useRef();
  // Hooks
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
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
      id: 0,
      heading: `Hi 👋 What's your name?`,
      type: "form",
      formFields: [
        {
          tabIndex: 1,
          name: `fName`,
          required: {
            value: true,
            message: `Must consist of at least one character`,
          },
          label: `First Name`,
          placeholder: `John`,
        },
        {
          tabIndex: 2,
          name: `lName`,
          required: {
            value: true,
            message: `Must consist of at least one character`,
          },
          label: `Last Name`,
          placeholder: `Smith`,
        },
      ],
    },
    {
      id: 1,
      heading: `Hi ${watch("fName")}, what's your email address?`,
      type: "form",
      formFields: [
        {
          tabIndex: -1,
          name: `email`,
          required: {
            value: true,
            message: `Must enter a valid email`,
          },
          label: `Email Address`,
          placeholder: `john@smith.com`,
        },
      ],
    },
    {
      id: 2,
      heading: `And your phone number?`,
      type: "form",
      formFields: [
        {
          tabIndex: -1,
          name: `phone`,
          required: {
            value: true,
            message: `Number may only contain numbers, +()-. and x`,
          },
          label: `Phone Number`,
          placeholder: `111 222 3333`,
        },
      ],
    },
    {
      id: 3,
      type: "message",
      heading: `Awesome`,
      description: ``,
      buttonTitle: ``,
      buttonDestination: ``,
    },
  ]);
  const [currentlyActive, setCurrentlyActive] = useState(0);
  const [pagination, setPagination] = useState({
    canNext: false,
    canPrev: false,
  });
  const [progress, setProgress] = useState(0);

  // Handlers
  const onSubmit = (data) => console.log(`form submitted: `, data);

  console.log(watch("fName"));

  const handleNext = () => {
    setCurrentlyActive(
      currentlyActive === slide.length - 1 ? slide.length - 1 : currentlyActive + 1
    );
  };

  const handlePrev = () => {
    setCurrentlyActive(currentlyActive !== 0 ? currentlyActive - 1 : 0);
  };

  const handleProgress = () => {
    setProgress((currentlyActive / (slide.length - 1)) * 100);
  };

  const scrollHandler = () => {
    setBoundingClientRect((prevState) => ({
      ...prevState,
      left: cardRef.current.getBoundingClientRect().left,
      top: cardRef.current.getBoundingClientRect().top,
      width: cardRef.current.getBoundingClientRect().width,
      height: cardRef.current.getBoundingClientRect().height,
    }));
  };

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

  const HandleSlideValidated = () => {
    const activeFormFields = slide[currentlyActive]?.formFields;
    if (!activeFormFields) return null;
    activeFormFields.forEach((elem) => {
      if (errors[elem.name] || watch(elem.name).length < 1) {
        setPagination((prevState) => ({
          ...prevState,
          canNext: false,
        }));
      } else {
        setPagination((prevState) => ({
          ...prevState,
          canNext: true,
        }));
      }
    });
  };

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      canPrev: currentlyActive !== 0,
    }));
    HandleSlideValidated();
    handleProgress();
  }, [currentlyActive]);

  useEffect(() => {
    setBoundingClientRect((prevState) => ({
      ...prevState,
      left: cardRef.current.getBoundingClientRect().left,
      top: cardRef.current.getBoundingClientRect().top,
      width: cardRef.current.getBoundingClientRect().width,
      height: cardRef.current.getBoundingClientRect().height,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };
  }, [boundingClientRect]);

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
                      // stagger={0.1}
                      duration={0.75}
                      ease="elastic.out(0.1, 0.1)"
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
                            {slide.map((elem, index) => {
                              return (
                                <FormSlide
                                  key={elem.id}
                                  index={index}
                                  type={elem.type}
                                  currentlyActive={currentlyActive}
                                  active={currentlyActive === elem.id}
                                  heading={elem.heading}
                                  formFields={elem.formFields}
                                  register={register}
                                  errors={errors}
                                  HandleSlideValidated={HandleSlideValidated}
                                />
                              );
                            })}
                          </form>
                          <Navigation
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            canNext={pagination.canNext}
                            canPrev={pagination.canPrev}
                            progress={progress}
                            currentlyActive={currentlyActive}
                            slidesLength={slide.length}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                          />
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
