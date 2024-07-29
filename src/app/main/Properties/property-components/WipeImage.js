import React, { useState, useEffect } from 'react';

const WipeImage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  const wipeInKeyframes = `
  @keyframes wipeIn {
    0% {
      clip-path: inset(0 0 0 100%);
    }
    100% {
      clip-path: inset(0 0 0 0);
    }
  }
`;

  const wipeOutKeyframes = `
    @keyframes wipeOut {
      0% {
        clip-path: inset(0 0 0 0);
      }
      100% {
        clip-path: inset(0 0 0 100%);
      }
    }
  `;

  const styles = {
    position: 'absolute',
    right: '445px',
    top: '0px',
    height: 'auto',
    width: '270px',
    animation: isVisible ? 'wipeIn 1s forwards' : 'wipeOut 1s forwards',
  };

  return (
    <>
      <style>
        {wipeInKeyframes}
        {wipeOutKeyframes}
      </style>
      <img
        src="/assets/cardimages/alerts.png"
        style={styles}
        alt="Alert"
      />
    </>
  );
};

export default WipeImage;
