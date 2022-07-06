import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
.MODULE {
  &__pill {
    padding: 0.2rem 0.5rem;
    color: #fff;
    background-color: #00bda5;
    border-radius: 10px 3px 3px 10px;
    line-height: 1;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    &-wrapper {
      margin-bottom: 1rem;
    }
  }
  &__inline-callout-cta {
    .MODULE__heading-and-subtitle {
      margin-bottom: 1.75rem;
    }
  }
  &__MultiStepFormCTA {
    position: relative;
    height: 15rem;
    width: 100%;
    max-width: 38rem;
    margin: 0px auto;
    &__open {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      pointer-events: all;
      cursor: pointer;
      z-index: 3;
    }
    &__close {
      position: absolute;
      top: 0px;
      right: 0px;
      height: 3.2rem;
      width: 3.2rem;
      padding: 1rem;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 1;
      transform: scale(0);
      transition: transform 0.3s linear 0s;
      svg {
        width: 100%;
        height: 100%;
      }
      &-outer {
        line-height: 1;
      }
    }
    &__screen-tint {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background-color: rgb(51, 71, 91);
      opacity: 0;
      transition: opacity 0.3s linear 0s;
      pointer-events: none;
    }
    &__image-cutout {
      position: absolute;
      top: 8%;
      height: 90%;
      opacity: 1;
      z-index: 0;
      transition: transform 0.2s ease 0s, opacity 0.2s ease;
      margin: 0px !important;
      &-left {
        left: 0px;
        transform: translateX(-90%);
      }
      &-right {
        right: 0px;
        transform: translateX(90%);
      }
    }
    &__navigation {
      position: relative;
      width: 100%;
      height: 20%;
      max-height: 0%;
      margin: 0px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: scale(0);
      transition: transform 0.3s linear 0s, max-height 0.3s linear 0s;
      overflow: hidden;
      &__icon-wrapper {
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: opacity 0.3s linear 0s;
        backface-visibility: hidden;
        background-color: rgb(255, 255, 255);
        border-radius: 3px;
        overflow: hidden;
        margin-right: 2rem;
        &:hover {
          background-color: #eee;
        }
        svg {
          width: 100%;
          height: 100%;
        }
        &-prev {
          svg {
            transform: rotate(180deg);
          }
        }
        &-next {
          margin-right: 0;
          margin-left: 2rem;
        }
        &-submit {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
        }
        &-disabled {
          opacity: 0.3;
          pointer-events: none;
        }
      }
      &__svg-wrapper {
        height: 33.33%;
        width: 33.33%;
        fill: rgb(106, 120, 209);
        line-height: 14px;
      }
    }
    &__card {
      height: 100%;
      width: 100%;
      max-height: 100%;
      border-radius: 5px;
      background: linear-gradient(45deg, rgb(106, 120, 209), rgb(0, 164, 189));
      cursor: pointer;
      // position: relative;
      position: sticky;
      z-index: 1;
      // &-not-expanded {
      //   width: 100% !important;
      //   height: 100% !important;
      // }
      &__wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      &__form {
        height: 100%;
        max-height: 100%;
        width: 100%;
        display: flex;
        overflow: hidden;
        transition: max-height 300ms linear 0s;
      }
      &__slide {
        height: 100%;
        width: 100%;
        min-width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(255, 255, 255);
        overflow: hidden;
        position: relative;
        z-index: 0;
        &:first-child {
          margin-left: 0%;
          transition: margin-left 300ms linear 0s;
        }
        &__description {
          width: 50%;
          text-align: left;
          overflow: auto;
          margin-bottom: 0;
          color: rgb(255, 255, 255);
          opacity: 0;
          visibility: hidden;
          max-height: 0;
          transition: 0.3s linear 0s, transform 0.3s linear 0s;
          font-size: 0.875rem;
          font-weight: 400;
        }
        &__wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          -webkit-box-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          align-items: center;
        }
        &__heading {
          text-align: center;
          max-width: 80%;
          margin-top: 0rem;
          margin-bottom: 2.35rem;
          color: rgb(255, 255, 255);
          font-size: 1.375rem;
          font-weight: 500;
        }
        &__form-fields {
          &-wrapper {
            width: 100%;
            max-width: 800px;
            display: flex;
            flex-direction: row;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
          }
        }
        &__form-field {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 220px;
          position: relative;
          &:first-child {
            margin-right: 1rem;
          }
          &__label {
            padding-bottom: 0.25rem;
            text-align: center;
            color: rgb(255, 255, 255);
            font-size: 0.875rem;
            font-weight: 600;
          }
          &__input-wrapper {
            position: relative;
            height: 40px;
            width: 100%;
          }
          &__input {
            width: 100%;
            height: 100%;
            padding: 0.5rem 2rem;
            border: none;
            border-radius: 3px;
            color: rgb(51, 71, 91);
            pointer-events: none;
            text-align: center;
            overflow: hidden;
            font-size: 1rem;
            &:focus {
              outline: none;
            }
            &-svg-wrapper {
              position: absolute;
              right: 0.5rem;
              bottom: 0.75rem;
              height: 1rem;
              width: 1rem;
              opacity: 0;
              transform: translateY(50%);
              transition: opacity 0.3s linear 0s, transform 0.3s linear 0s;
            }
            &-svg {
              fill: rgb(242, 84, 91);
              width: 100%;
              height: 100%;
              animation: 0.3s cubic-bezier(0.43, 1.44, 0.555, 1.175) 0s 1 normal none running gTcftA;
              line-height: 1rem;
              svg {
                width: 100%;
                height: 100%;
              }
            }
          }
          &__error {
            visibility: hidden;
            padding-top: 0.375rem;
            font-size: 0.75rem;
            font-weight: 400;
            line-height: 1.5;
            position: absolute;
            top: 4.1rem;
          }
        }
      }
    }
    &.MODULE__MultiStepFormCTA {
      &-active {
        .MODULE__MultiStepFormCTA {
          &__screen-tint {
            opacity: 0.8;
            z-index: 9999;
            pointer-events: all;
          }
          &__open {
            pointer-events: none;
            z-index: -1;
          }
          &__card {
            &__wrapper {
              padding: 3rem 0;
            }
            position: fixed;
            z-index: 99999;
            cursor: default;
            &__slide {
              &__description {
                margin-bottom: 2rem;
                opacity: 1;
                max-height: 100%;
                visibility: visible;
                transition: max-height 0.3s linear 0s, transform 0.3s linear 0s;
              }
              &__form-field {
                &__error {
                  visibility: visible;
                }
                &__input {
                  pointer-events: all;
                  &-svg-wrapper {
                    &-focus {
                      opacity: 1;
                      transform: translateY(0);
                      // transition: 0.2s ease;
                      transition: opacity 0.2s linear 0s, transform 0.2s linear 0s;
                    }
                  }
                }
              }
            }
          }
          &__image-cutout {
            opacity: 0;
            transform: translateX(-50%);
            transition: transform 0.2s ease 0s, opacity 0.2s ease;
          }
          &__close {
            background: none;
            border: none;
            cursor: pointer;
            z-index: 1;
            transform: scale(1);
            transition: transform 0.3s linear 0s;
          }
          &__navigation {
            max-height: 20%;
            transform: scale(1);
            transition: transform 0.3s linear 0s, max-height 0.3s linear 0s;
          }
        }
      }
    }
  }
}
`;

export default GlobalStyle;
