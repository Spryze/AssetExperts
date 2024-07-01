  import React, { useRef, useEffect, useState } from 'react';
  import Box from '@mui/material/Box';
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';
  import Typography from '@mui/material/Typography';
  import Button from '@mui/material/Button';
  import Grid from '@mui/material/Grid';
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
  import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
  import { useSelector } from 'react-redux';
  import { selectSelectedProperty } from 'app/store/propertySlice';

  const HorizontalScrollableCards = () => {
    const Properties = useSelector(selectSelectedProperty);
    const cardContainerRef = useRef(null);
    console.log("cardContainerRef",cardContainerRef)
    const [isFirstIndexVisible, setIsFirstIndexVisible] = useState(true);
    const [isLastIndexVisible, setIsLastIndexVisible] = useState(false);

    useEffect(() => {
      const container = cardContainerRef.current;
    
      const handleScroll = () => {
        setIsFirstIndexVisible(container.scrollLeft === 0);
        setIsLastIndexVisible(
          container.scrollLeft + container.clientWidth >= container.scrollWidth - 10
        );
      };
    
      container.addEventListener('scroll', handleScroll);
    
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }, [Properties]);
      

    const handleScrollLeft = () => {
  if (cardContainerRef.current) {
    cardContainerRef.current.scrollLeft -= 200; // Scroll left by 200 units
    const container = cardContainerRef.current;

    setIsFirstIndexVisible(container.scrollLeft === 0);
    
    // Update visibility of right arrow based on scroll position
    setIsLastIndexVisible(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 10
    );
  }
};


    const handleScrollRight = () => {
      if (cardContainerRef.current) {
        cardContainerRef.current.scrollLeft += 200;
        const container = cardContainerRef.current;
    
        setIsFirstIndexVisible(container.scrollLeft === 0);
        setIsLastIndexVisible(
          container.scrollLeft + container.clientWidth >= container.scrollWidth - 1
        );
      }
    };
    

    return (
      <Box sx={{ overflow: 'hidden', position: 'relative', height: '100%' }}>
        <Box
          ref={cardContainerRef}
          sx={{
            marginBottom: "20px",
            marginLeft: "50px",
            display: 'flex',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none', // Hide scrollbar for Chrome, Safari, etc.
            },
            msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            height: '100%',
          }}
        >
          {Properties?.AroundProject?.map((item, index) => (
            <Card key={index} sx={{ minWidth: 200, margin: "2px 5px", height: "70px", borderRadius: "2px" }}>
              <CardContent>
                <Typography sx={{ textDecoration: 'none', m: 0, fontSize: "15px" }}>
                  {item.category}
                </Typography>
                <Typography sx={{ textDecoration: 'none', m: 0, fontSize: "15px" }}>
                  {item.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Grid
          container
          justifyContent="space-between"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            width: '100%',
          }}
        >
          <Grid item sx={{ backgroundColor: 'white', padding: '25px 0px' }}>
            {!isFirstIndexVisible && (
              <Button
                // color="primary"
                onClick={handleScrollLeft}
                style={{ borderRadius: '2px' }}
              >
                <ArrowBackIcon />
              </Button>
            )}
          </Grid>
          <Grid item sx={{ backgroundColor: 'white', padding: '25px 0px' }}>
            {!isLastIndexVisible && Properties?.AroundProject?.length > 0 && (
              <Button
                // color="primary"
                onClick={handleScrollRight}
                style={{ borderRadius: '2px' }}
              >
                <ArrowForwardIcon />
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  };

  export default HorizontalScrollableCards;
