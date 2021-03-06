import React, { useEffect, useState, useRef } from "react";
// Animations
import { PlayState, Tween } from "react-gsap";
// Form
import { useForm } from "react-hook-form";
// Components
import Header from "./components/Header";
import FormSlide from "./components/FormSlide";
import Navigation from "./components/Navigation";
// Helpers
import { capitalizeFirstLetter, postPayload } from "./lib/Helpers";
// Custom Hooks
import { useWindowSize, useAPIRequest } from "./lib/Hooks";

const App = ({ domElement }) => {
  let clientIp;
  const abstractApiKey = process.env.REACT_APP_ABSTRACT_API_KEY;
  const formId = domElement.getAttribute("data-formId");
  const portalId = domElement.getAttribute("data-portalId");
  const pillBackgroundColor = domElement.getAttribute("data-pillBackgroundColor");
  const cardBackgroundGradientLeft = domElement.getAttribute("data-cardBackgroundGradientLeft");
  const cardBackgroundGradientRight = domElement.getAttribute("data-cardBackgroundGradientRight");
  const widgetLabel = domElement.getAttribute("data-widgetLabel");
  const widgetHeading = domElement.getAttribute("data-widgetHeading");
  const widgetDescription = domElement.getAttribute("data-widgetDescription");
  const widgetResource = domElement.getAttribute("data-widgetResource");
  const cardEasing = `elastic.out(0.1, 0.1)`;
  const expandedCardCoordinates = {
    position: "fixed",
    width: `85vw`,
    height: `85vh`,
    top: `7.5vh`,
    left: `7.5vw`,
  };

  // Ref
  const cardRef = useRef();
  // Hooks
  const { width } = useWindowSize();
  const [bannerHeight, setBannerHeight] = useState(15);
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
  const [firstName, setFirstName] = useState(null);
  const [slides, setSlides] = useState([
    {
      id: 0,
      heading: `Hi ???? What's your name?`,
      type: "form",
      formFields: [
        {
          tabIndex: 1,
          name: `fName`,
          required: {
            value: true,
            message: `Must consist of at least one character`,
          },
          pattern: {
            value: /^[A-Za-z ]+$/,
            message: `Must only be alphabets`,
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
          pattern: {
            value: /^[A-Za-z ]+$/,
            message: `Must only be alphabets`,
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
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
            message: `Must be a valid phone number`,
          },
          pattern: {
            value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
            message: `Must be a valid phone number`,
          },
          label: `Phone Number`,
          placeholder: `111 222 3333`,
        },
      ],
    },
    {
      id: 3,
      heading: `What is your company's name and website?`,
      type: "form",
      formFields: [
        {
          tabIndex: -1,
          name: `company`,
          required: {
            value: true,
            message: `Must consist of at least one character`,
          },
          label: `Company`,
          placeholder: `Company Name`,
        },
        {
          tabIndex: -1,
          name: `website`,
          required: {
            value: true,
            message: `Must consist of at least one character`,
          },
          pattern: {
            value:
              /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
            message: `Must be a valid URL`,
          },
          label: `Website`,
          placeholder: `www.google.com`,
        },
      ],
    },
    {
      id: 4,
      type: "message",
      heading: `???? Access your featured resource! ????`,
      description: ``,
      buttonTitle: `Access Now`,
      buttonDestination: `${widgetResource ? widgetResource : `#`}`,
    },
  ]);
  const [currentlyFocused, setCurrentlyFocused] = useState(null);
  const [currentlyActive, setCurrentlyActive] = useState(0);
  const [pagination, setPagination] = useState({
    canNext: false,
    canPrev: false,
  });
  const [progress, setProgress] = useState(0);
  const [cardAnimationDuration, setCardAnimationDuration] = useState(0.75);
  const [cardZIndex, setCardZIndex] = useState(null);
  const [tintZIndex, setTintZIndex] = useState(null);
  const { data: abstractData } = useAPIRequest(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=${abstractApiKey}`
  );

  if (abstractData) {
    clientIp = abstractData.ip_address;
  }

  // Handlers
  const handleNext = () => {
    setCurrentlyActive(
      currentlyActive === slides.length - 1 ? slides.length - 1 : currentlyActive + 1
    );
  };

  const handlePrev = () => {
    setCurrentlyActive(currentlyActive !== 0 ? currentlyActive - 1 : 0);
  };

  const handleProgress = () => {
    setProgress((currentlyActive / (slides.length - 1)) * 100);
  };

  const handleBoundingClientRect = () => {
    setBoundingClientRect((prevState) => ({
      ...prevState,
      left: cardRef.current.getBoundingClientRect().left,
      top: cardRef.current.getBoundingClientRect().top,
      width: cardRef.current.getBoundingClientRect().width,
      height: cardRef.current.getBoundingClientRect().height,
    }));
  };

  const handleScroll = () => {
    handleBoundingClientRect();
  };

  const handleAnimation = () => {
    if (expanded) {
      setCardAnimationDuration(0.6);
    } else {
      setCardAnimationDuration(0.75);
    }
  };

  const handleExpanded = () => {
    handleAnimation();
    if (expanded) {
      setExpanded(false);
      setPlayState(PlayState.reverse);
      setCardZIndex(99999);
      setTintZIndex(9999);
      setTimeout(() => {
        document.body.style.cssText = "";
        document.querySelector("html").style.cssText = "";
        setCardZIndex(null);
        setTintZIndex(null);
      }, 780);
    } else {
      // window.scrollTo({ top: boundingClientRect.top - 300 });
      setExpanded(true);
      setPlayState(PlayState.play);
      document.querySelector("html").style.cssText = "overflow: hidden !important;";
      document.body.style.cssText = "overflow: hidden !important;";
    }
  };

  const handleSlideValidated = () => {
    const activeFormFields = slides[currentlyActive]?.formFields;
    if (!activeFormFields) return null;
    setTimeout(() => {
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
    }, 10);
    setFirstName(watch("fName"));
  };

  const handleCurrentlyFocused = (e) => {
    if (e) {
      setCurrentlyFocused(e?.target?.id);
      // window.scrollTo(0, 0);
      // document.body.scrollTop = 0;
    } else {
      setCurrentlyFocused(null);
    }
  };

  const handleTabIndex = () => {
    disableTabIndex();
    let tempArr = [...slides];
    let formFields = tempArr[currentlyActive]?.formFields;
    if (formFields) {
      formFields.forEach((elem, index) => {
        elem["tabIndex"] = index + 1;
      });
      setSlides(tempArr);
    }
  };

  const handleFirstName = () => {
    let tempArr = [...slides];
    tempArr[1]["heading"] = `Hi ${
      firstName && capitalizeFirstLetter(firstName)
    }, what's your email address?`;
    setSlides(tempArr);
  };

  const handleBannerHeight = () => {
    if (width > 576) {
      setBannerHeight(15);
    } else {
      setBannerHeight(15);
    }
  };

  const disableTabIndex = () => {
    let tempArr = [...slides];
    tempArr.forEach((elem) => {
      const formFields = elem?.formFields;
      if (formFields) {
        formFields.forEach((elem2) => {
          elem2.tabIndex = "-1";
        });
      }
    });
    setSlides(tempArr);
  };

  const onSubmit = (data) => {
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
    const payload = {
      submittedAt: +new Date(),
      fields: [
        {
          name: "firstname",
          value: data.fName,
        },
        {
          name: "lastname",
          value: data.lName,
        },
        {
          name: "email",
          value: data.email,
        },
        {
          name: "phone",
          value: data.phone,
        },
        {
          name: "company",
          value: data.company,
        },
        {
          name: "website",
          value: data.website,
        },
      ],
      context: {
        hutk: document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
        pageUri: window.location.href,
        pageName: document.title,
        ipAddress: clientIp,
      },
    };
    postPayload(url, payload);
  };

  useEffect(() => {
    handleBoundingClientRect();
    handleBannerHeight();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [boundingClientRect]);

  useEffect(() => {
    handleBoundingClientRect();
    handleBannerHeight();
  }, [width]);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      canPrev: currentlyActive !== 0,
    }));
    handleSlideValidated();
    handleProgress();
    handleFirstName();
    handleTabIndex();
  }, [currentlyActive]);

  return (
    <>
      <div className="MODULE__article-content">
        <div className="MODULE__inline-callout-cta">
          <div className="MODULE__inline-callout-cta__body">
            <Header
              label={widgetLabel}
              heading={widgetHeading}
              description={widgetDescription}
              pillBackgroundColor={pillBackgroundColor}
            />
            <div
              style={{
                height: `${bannerHeight}em`,
              }}
              className={`MODULE__MultiStepFormCTA ${
                expanded ? `MODULE__MultiStepFormCTA-active` : ``
              }`}
            >
              <div
                onClick={() => handleExpanded()}
                style={{
                  zIndex: tintZIndex,
                }}
                className="MODULE__MultiStepFormCTA__screen-tint"
              ></div>
              <div
                onClick={() => handleExpanded()}
                className="MODULE__MultiStepFormCTA__open"
              ></div>
              {width > 900 && (
                <img
                  src="https://www.oneims.com/static/multistep-lead-form/offer-left.svg"
                  alt=""
                  className="MODULE__MultiStepFormCTA__image-cutout MODULE__MultiStepFormCTA__image-cutout-left"
                />
              )}
              <Tween
                playState={playState}
                from={{
                  // top: `${boundingClientRect.top}px`,
                  // left: `${boundingClientRect.left}px`,
                  position: "sticky",
                }}
                to={expandedCardCoordinates}
                duration={cardAnimationDuration}
                ease={cardEasing}
              >
                <div
                  style={{
                    top: `${boundingClientRect.top}px`,
                    left: `${boundingClientRect.left}px`,
                    width: `100%`,
                    height: `100%`,
                    zIndex: cardZIndex,
                    background: `linear-gradient(45deg, ${cardBackgroundGradientLeft}, ${cardBackgroundGradientRight})`,
                  }}
                  ref={cardRef}
                  className={`MODULE__MultiStepFormCTA__card`}
                >
                  <div className="MODULE__MultiStepFormCTA__card__wrapper">
                    <button
                      onClick={() => handleExpanded()}
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
                              <g stroke="#FFF" strokeWidth="2" transform="translate(1298 343)">
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
                    <form autoComplete="off" className="MODULE__MultiStepFormCTA__card__form">
                      {slides.map((elem, index) => {
                        return (
                          <FormSlide
                            key={elem.id}
                            index={index}
                            type={elem.type}
                            currentlyActive={currentlyActive}
                            active={currentlyActive === elem.id}
                            heading={elem.heading}
                            description={elem.description}
                            buttonTitle={elem.buttonTitle}
                            buttonDestination={elem.buttonDestination}
                            formFields={elem.formFields}
                            register={register}
                            errors={errors}
                            currentlyFocused={currentlyFocused}
                            handleCurrentlyFocused={handleCurrentlyFocused}
                            handleSlideValidated={handleSlideValidated}
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
                      slidesLength={slides.length}
                      handleSubmit={handleSubmit}
                      onSubmit={onSubmit}
                    />
                  </div>
                  <div className="MODULE__heading"></div>
                </div>
              </Tween>
              {width > 900 && (
                <img
                  src="https://www.oneims.com/static/multistep-lead-form/offer-right.svg"
                  alt=""
                  className="MODULE__MultiStepFormCTA__image-cutout MODULE__MultiStepFormCTA__image-cutout-right"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
