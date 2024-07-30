// ScrollToTopButton.js
import React from 'react';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button when page is scrolled beyond 300px
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '3px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            padding: '10px 15px',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            zIndex:'20',
          }}
        >
          ↑
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
