import React from "react";
import styled from "styled-components";

const radius = 314.159;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  pointer-events: none;
  &:after {
    content: "${(props) => Math.round(props.value)}%";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: rgb(255, 255, 255);
    font-size: 1rem;
    font-weight: 500;
  }
`;

const Icon = styled.svg`
  height: 100%;
  transform: rotate(-90deg);
  will-change: transform;
`;

const Circle = styled.circle`
  stroke: rgb(255, 255, 255);
  stroke-dasharray: ${radius};
  stroke-dashoffset: 0;
  opacity: 0.2;
`;

const Progress = styled.circle`
  stroke: rgb(255, 255, 255);
  stroke-dasharray: ${radius};
  stroke-dashoffset: ${(props) => props.progress};
  opacity: 1;
  transition: stroke-dashoffset 0.3s linear 0s, opacity 0.5s ease 0s;
`;

const CircularProgress = ({ value }) => {
  const progressPercentage = (value / 100) * radius;
  const progress = radius - progressPercentage;
  return (
    <Wrapper value={value}>
      <Icon viewBox="0 0 106 106">
        <Circle cx="53" cy="53" r="50" fill="none" strokeWidth="6"></Circle>
        <Progress
          cx="53"
          cy="53"
          r="50"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          progress={progress}
        ></Progress>
      </Icon>
    </Wrapper>
  );
};

export default CircularProgress;
