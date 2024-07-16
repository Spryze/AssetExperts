import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';


const AnimatedText = () => {
  const texts = [
    'Buying Properties',
    'Selling Properties',
    'Listing Properties',
    'Property Surveillance',
    'Property Maintenance'
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <Typography>
      Connecting You to the Best Properties, Effortlessly
      {/* <AnimatedSpan key={texts[currentTextIndex]}>
        {texts[currentTextIndex]}
      </AnimatedSpan> */}
    </Typography>
  );
};

export default AnimatedText;

const swipeUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  50% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const Typography = styled.div`
  font-size: 50px;
  font-weight: bold;
  color: #fff;
  position: relative;
  text-shadow: -18px 9px 30px #000000;
  top: 50%;
  margin:50px 0 20px 0px;
  text-transform:uppercase;
  @media only screen and (max-width: 768px) {

   font-size: 30px;
  
}
`;

const AnimatedSpan = styled.span`
    text-shadow: -18px 9px 30px #000000;
  display: inline-block;
  animation: ${swipeUp} 2s ease-in-out;
  margin-left: 10px;
  // background: linear-gradient(45deg, #FFD700, #FFC300);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // background-clip: text;
  // text-fill-color: transparent;
`;
