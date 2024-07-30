// import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@mui/styles';
// import { Card, CardContent, Typography } from '@mui/material';

// const useStyles = makeStyles({
//   container: {
//     position: 'relative',
//     width: '300px',
//     height: '300px',
//     margin: '50px auto',
//     perspective: '1000px',
//   },
//   card: {
//     position: 'absolute',
//     width: '200px',
//     height: '200px',
//     lineHeight: '200px',
//     textAlign: 'center',
//     fontSize: '24px',
//     border: '2px solid #ccc',
//     transition: 'transform 0.5s ease',
//   },
// });

// const CircularRotationCards = () => {
//   const classes = useStyles();
//   const [rotationAngle, setRotationAngle] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setRotationAngle((prevAngle) => prevAngle + 90);
//     }, 3000); // Rotate every 3 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={classes.container}>
//       <Card className={classes.card} style={{ transform: rotateY(${rotationAngle}deg) translateZ(150px) }}>
//         <CardContent>
//           <Typography variant="h5" component="div">
//             Card 1
//           </Typography>
//         </CardContent>
//       </Card>
//       <Card className={classes.card} style={{ transform: rotateY(${rotationAngle + 90}deg) translateZ(150px) }}>
//         <CardContent>
//           <Typography variant="h5" component="div">
//             Card 2
//           </Typography>
//         </CardContent>
//       </Card>
//       <Card className={classes.card} style={{ transform: rotateY(${rotationAngle + 180}deg) translateZ(150px) }}>
//         <CardContent>
//           <Typography variant="h5" component="div">
//             Card 3
//           </Typography>
//         </CardContent>
//       </Card>
//       <Card className={classes.card} style={{ transform: rotateY(${rotationAngle + 270}deg) translateZ(150px) }}>
//         <CardContent>
//           <Typography variant="h5" component="div">
//             Card 4
//           </Typography>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CircularRotationCards;

// import React, { useState, useEffect } from "react";
// import { makeStyles } from "@mui/styles";
// import { Card, CardContent, Typography } from "@mui/material";

// const useStyles = makeStyles({
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//   },
//   cardContainer: {
//     position: "relative",
//     width: "200px",
//     height: "200px",
//   },
//   card: {
//     position: "absolute",
//     width: "250px",
//     height: "250px",
//     padding: "0", // This will remove padding from the Card component itself
//     transform: "translate(-50%, -50%)",
//     textAlign: "center",
//     fontSize: "24px",
//     border: "2px solid #ccc",
//     transition: "transform 0.5s ease",
//   },
//   cardContent: {
//     padding: 0, // This will remove padding from the CardContent component
//   },
//   overlay: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     width: "100%",
//     height: "20%",
//     backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust opacity here (0.5 means 50% opacity)
//     zIndex: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   typography: {
//     zIndex: 2, // Ensure text appears above the overlay
//   },
// });

// const CircularRotationCards = () => {
//   const classes = useStyles();
//   const [rotationAngle, setRotationAngle] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setRotationAngle((prevAngle) => prevAngle + 90);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={classes.container}>
//       <div className={classes.cardContainer}>
//         <Card
//           className={classes.card}
//           style={{
//             transform: rotate(${rotationAngle}deg) translate(200px) rotate(-${rotationAngle}deg),
//             zIndex: rotationAngle % 360 === 270 ? 1 : 0,
//           }}
//         >
//           <CardContent className={classes.cardContent}>
//             <img src="assets/cardimages/legalverification.jpeg" alt="Card 1" />
           
//             {/* <div className={classes.overlay}>
//             <Typography sx={{fontSize:"20px", fontWeight:"bold"}} >
//               Legal Verification
//             </Typography>
//             </div> */}
//           </CardContent>
//         </Card>
//         <Card
//           className={classes.card}
//           style={{
//             transform: rotate(${rotationAngle + 90}deg) translate(200px) rotate(-${rotationAngle + 90}deg),
//             zIndex: rotationAngle % 360 === 180 ? 1 : 0,
//           }}
//         >
//            <CardContent className={classes.cardContent}>
//             <img src="assets/cardimages/propertyleads.jpeg" alt="Card 1" />
           
//             {/* <div className={classes.overlay}>
//             <Typography sx={{fontSize:"20px", fontWeight:"bold"}} >
//               Property Leads
//             </Typography>
//             </div> */}
//           </CardContent>
//         </Card>
//         <Card
//           className={classes.card}
//           style={{
//             transform: rotate(${rotationAngle + 180}deg) translate(200px) rotate(-${rotationAngle + 180}deg),
//             zIndex: rotationAngle % 360 === 90 ? 1 : 0,
//           }}
//         >
//            <CardContent className={classes.cardContent}>
//             <img src="assets/cardimages/propertysurvilence.jpeg" alt="Card 1" />
           
//             {/* <div className={classes.overlay}>
//             <Typography sx={{fontSize:"20px", fontWeight:"bold"}} >
//               Property Survilence
//             </Typography>
//             </div> */}
//           </CardContent>
//         </Card>
//         <Card
//           className={classes.card}
//           style={{
//             transform: rotate(${rotationAngle + 270}deg) translate(200px) rotate(-${rotationAngle + 270}deg),
//             zIndex: rotationAngle % 360 === 360 ? 1 : 0,
//           }}
//         >
//            <CardContent className={classes.cardContent}>
//             <img src="assets/cardimages/verifiedlisting.jpeg" alt="Card 1" />
           
//             {/* <div className={classes.overlay}>
//             <Typography sx={{fontSize:"20px", fontWeight:"bold"}} >
//               Verified
//             </Typography>
//             </div> */}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CircularRotationCards;

// import React, { useState, useEffect } from 'react';

// const CircularRotationCards = () => {
//   const [showCards, setShowCards] = useState({
//     central: false,
//     top: false,
//     right: false,
//     bottom: false,
//     left: false
//   });

//   useEffect(() => {
//     const showCentralCard = () => {
//       setTimeout(() => {
//         setShowCards((prev) => ({ ...prev, central: true }));
//       }, 500); // Delay for central card appearance
//     };

//     const showTopCard = () => {
//       setTimeout(() => {
//         setShowCards((prev) => ({ ...prev, top: true }));
//       }, 1000); // Delay for top card appearance
//     };

//     const showRightCard = () => {
//       setTimeout(() => {
//         setShowCards((prev) => ({ ...prev, right: true }));
//       }, 1500); // Delay for right card appearance
//     };

//     const showBottomCard = () => {
//       setTimeout(() => {
//         setShowCards((prev) => ({ ...prev, bottom: true }));
//       }, 2000); // Delay for bottom card appearance
//     };

//     const showLeftCard = () => {
//       setTimeout(() => {
//         setShowCards((prev) => ({ ...prev, left: true }));
//       }, 2500); // Delay for left card appearance
//     };

//     showCentralCard();
//     showTopCard();
//     showRightCard();
//     showBottomCard();
//     showLeftCard();
//   }, []);

//   const cardStyle = {
//     position: 'absolute',
//     width: '100px',
//     height: '100px',
//     backgroundColor: 'lightblue',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     textAlign: 'center',
//     lineHeight: '100px',
//     transition: 'opacity 0.5s ease-in-out',
//     animationFillMode: 'forwards'
//   };

//   const containerStyle = {
//     position: 'relative',
//     width: '500px', // Increased width to accommodate spacing
//     height: '500px', // Increased height to accommodate spacing
//     margin: 'auto'
//   };

//   const centralStyle = {
//     ...cardStyle,
//     top: '200px',
//     left: '200px',
//     opacity: showCards.central ? 1 : 0,
//     animation: showCards.central ? 'fadeIn 1s' : 'none'
//   };

//   const topStyle = {
//     ...cardStyle,
//     top: '50px',
//     left: '200px',
//     opacity: showCards.top ? 1 : 0,
//     animation: showCards.top ? 'fallIn 1s' : 'none',
//     animationDelay: '0.5s' // Delay for top card animation
//   };

//   const rightStyle = {
//     ...cardStyle,
//     top: '200px',
//     left: '350px',
//     opacity: showCards.right ? 1 : 0,
//     animation: showCards.right ? 'slideInRight 1s' : 'none',
//     animationDelay: '1s' // Delay for right card animation
//   };

//   const bottomStyle = {
//     ...cardStyle,
//     top: '350px',
//     left: '200px',
//     opacity: showCards.bottom ? 1 : 0,
//     animation: showCards.bottom ? 'popIn 1s' : 'none',
//     animationDelay: '1.5s' // Delay for bottom card animation
//   };

//   const leftStyle = {
//     ...cardStyle,
//     top: '200px',
//     left: '50px',
//     opacity: showCards.left ? 1 : 0,
//     animation: showCards.left ? 'slideInLeft 1s' : 'none',
//     animationDelay: '2s' // Delay for left card animation
//   };

//   const lineStyle = {
//     stroke: 'black',
//     strokeWidth: 2,
//     strokeDasharray: '300',
//     strokeDashoffset: '300',
//     animation: 'draw-line 2s forwards ease-in-out'
//   };

//   return (
//     <div style={containerStyle}>
//       <svg width="500" height="500" style={{ position: 'absolute', top: 0, left: 0 }}>
//         <style>
//           {`
//             @keyframes draw-line {
//               to {
//                 stroke-dashoffset: 0;
//               }
//             }
//             @keyframes fadeIn {
//               from { opacity: 0; }
//               to { opacity: 1; }
//             }
//             @keyframes fallIn {
//               from { opacity: 0; transform: translateY(-50px); }
//               to { opacity: 1; transform: translateY(0); }
//             }
//             @keyframes slideInRight {
//               from { opacity: 0; transform: translateX(50px); }
//               to { opacity: 1; transform: translateX(0); }
//             }
//             @keyframes popIn {
//               from { opacity: 0; transform: scale(0); }
//               to { opacity: 1; transform: scale(1); }
//             }
//             @keyframes slideInLeft {
//               from { opacity: 0; transform: translateX(-50px); }
//               to { opacity: 1; transform: translateX(0); }
//             }
//           `}
//         </style>
//         {showCards.top && (
//           <line
//             x1="250"
//             y1="250"
//             x2="250"
//             y2="100"
//             style={{ ...lineStyle, animationDelay: '0.5s' }}
//           />
//         )}
//         {showCards.right && (
//           <line
//             x1="250"
//             y1="250"
//             x2="400"
//             y2="250"
//             style={{ ...lineStyle, animationDelay: '1s' }}
//           />
//         )}
//         {showCards.bottom && (
//           <line
//             x1="250"
//             y1="250"
//             x2="250"
//             y2="400"
//             style={{ ...lineStyle, animationDelay: '1.5s' }}
//           />
//         )}
//         {showCards.left && (
//           <line
//             x1="250"
//             y1="250"
//             x2="100"
//             y2="250"
//             style={{ ...lineStyle, animationDelay: '2s' }}
//           />
//         )}
//       </svg>
//       <div style={centralStyle}>Central Card</div>
//       <div style={topStyle}>Top Card</div>
//       <div style={rightStyle}>Right Card</div>
//       <div style={bottomStyle}>Bottom Card</div>
//       <div style={leftStyle}>Left Card</div>
//     </div>
//   );
// };

// export default CircularRotationCards;import React, { useState, useEffect } from 'react';

// import React, { useState, useEffect } from 'react';

// const CircularRotationCards = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const cards = [
//     { id: 1, imageUrl: 'assets/cardimages/legalverification.jpeg' },
//     { id: 2, imageUrl: 'assets/cardimages/propertyleads.jpeg' },
//     { id: 3, imageUrl: 'assets/cardimages/propertysurvilence.jpeg' },
//     // Add more cards as needed
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex(currentIndex => (currentIndex + 1) % cards.length);
//     }, 3000); // Adjust timing for card rotation

//     return () => clearInterval(interval);
//   }, [cards.length]);

//   return (
//     <div style={styles.cardContainer}>
//       {cards.map((card, index) => {
//         const position = (index - currentIndex + cards.length) % cards.length;

//         return (
//           <div
//             key={card.id}
//             style={{
//               ...styles.card,
//               zIndex: cards.length - position,
//               transform: rotate(${position * (360 / cards.length)}deg),
//               boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Adding a subtle shadow
//             }}
//           >
//             <img src={card.imageUrl} alt={Card ${card.id}} style={styles.cardImage} />
//             <div style={styles.cardContent}>{card.content}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const styles = {
//   cardContainer: {
//     position: 'relative',
//     display: 'flex',
//     justifyContent: 'center',
//     top:"50px",
//     // alignItems: 'center',
//     height: '500px',
//   },
//   card: {
//     position: 'absolute',
//     width: '250px',
//     height: '200px',
//     backgroundColor: '#f0f0f0',
//     border: '1px solid #ccc',
//     transformOrigin: 'bottom center',
//     transition: 'transform 0.5s ease-in-out',
//     // padding: '20px', // Adding padding
//     borderRadius: '8px', // Adding border radius for rounded corners
//   },
//   cardContent: {
//     padding: '10px',
//     transform: 'rotate(-30deg)',
//     color: '#333', // Text color for card content
//   },
// };

// export default CircularRotationCards;

// import React from 'react';
// import styled, { keyframes } from 'styled-components';

// const CircularRotationCards = () => {
//   return (
//     <Container>
//       <Card className="center-card"><img src="assets/Logos/logo49.PNG" alt="Card 1" style={{borderRadius:"10px"}} /></Card>
//       <CornerCard className="top-left"> <img src="assets/cardimages/legalverification.jpeg" alt="Card 1" style={{borderRadius:"20px"}} /></CornerCard>
//       <CornerCard className="top-right"> <img src="assets/cardimages/legalverification.jpeg" alt="Card 1" style={{borderRadius:"20px"}}  /></CornerCard>
//       <CornerCard className="bottom-left"> <img src="assets/cardimages/legalverification.jpeg" alt="Card 1" style={{borderRadius:"20px"}}  /></CornerCard>
//       <CornerCard className="bottom-right"> <img src="assets/cardimages/legalverification.jpeg" alt="Card 1" style={{borderRadius:"20px"}} /></CornerCard>
//     </Container>
//   );
// };

// export default CircularRotationCards;

// const Container = styled.div`
//   position: relative;
//   width: 500px; /* Updated to fit the larger cards */
//   height: 500px; /* Updated to fit the larger cards */
//   margin: auto;
// `;

// const cardAnimationTopLeft = keyframes`
//   from {
//     opacity: 0;
//     transform: translate(-100%, -100%) scale(0.5);
//   }
//   to {
//     opacity: 1;
//     transform: translate(0, 0) scale(1);
//   }
// `;

// const cardAnimationTopRight = keyframes`
//   from {
//     opacity: 0;
//     transform: translate(100%, -100%) scale(0.5);
//   }
//   to {
//     opacity: 1;
//     transform: translate(0, 0) scale(1);
//   }
// `;

// const cardAnimationBottomLeft = keyframes`
//   from {
//     opacity: 0;
//     transform: translate(-100%, 100%) scale(0.5);
//   }
//   to {
//     opacity: 1;
//     transform: translate(0, 0) scale(1);
//   }
// `;

// const cardAnimationBottomRight = keyframes`
//   from {
//     opacity: 0;
//     transform: translate(100%, 100%) scale(0.5);
//   }
//   to {
//     opacity: 1;
//     transform: translate(0, 0) scale(1);
//   }
// `;

// const centerCardAnimation = keyframes`
//   from {
//     opacity: 0;
//     transform: translate(-50%, -50%) scale(0.5);
//   }
//   to {
//     opacity: 1;
//     transform: translate(-50%, -50%) scale(1);
//   }
// `;

// const Card = styled.div`
//   position: absolute;
//   width: 200px; /* Updated size */
//   height: 200px; /* Updated size */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 10px;
//   background-color: transparent;
//   opacity: 0;


//   &.center-card {
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     animation: ${centerCardAnimation} 1s forwards;
//   }
// `;

// const CornerCard = styled(Card)`
//   &.top-left {
//     top: 0;
//     left: 0;
//     animation: ${cardAnimationTopLeft} 1s forwards;
//   }

//   &.top-right {
//     top: 0;
//     right: 0;
//     animation: ${cardAnimationTopRight} 1s forwards;
//   }

//   &.bottom-left {
//     bottom: 0;
//     left: 0;
//     animation: ${cardAnimationBottomLeft} 1s forwards;
//   }

//   &.bottom-right {
//     bottom: 0;
//     right: 0;
//     animation: ${cardAnimationBottomRight} 1s forwards;
//   }
// `;



import React from 'react';
import styled from 'styled-components';

const CardData = [
  {
    title: "Legal Verification",
    description: "Ensure your property is legally verified by experts.",
    image: "assets/icon images/legal verification.jfif"
  },
  {
    title: "Property Leads",
    description: "Get access to exclusive property leads.",
    image: "assets/icon images/property leads.jfif"
  },
  {
    title: "Property Surveillance",
    description: "Monitor properties with our surveillance services.",
    image: "assets/icon images/EEF7FE.jpg"
  },
  {
    title: "Verified Listing",
    description: "Find verified property listings.",
    image: "assets/icon images/verified listings.jfif"
  },
];

const CardComponent = ({ title, description, image }) => (
  <Card>
    <Image src={image} alt={title} />
    <Content>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Content>
  </Card>
);

const CardList = () => {
  return (
    <Container>
      {CardData.map((card, index) => (
        <CardComponent key={index} {...card} />
      ))}
    </Container>
  );
};

export default CardList;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  // position: absolute;
  margin-top:50px;
  padding: 20px;
  box-sizing: border-box;
 
`;

const Card = styled.div`
  // background: #fff;
  border-radius: 12px;
  // padding: 20px;
  // box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 200px;
  margin: 0px 10px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

 
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 12px 12px 0 0;
  
  // margin-bottom: 20px;
   &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
    @media (max-width: 768px) {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const Content = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: 600;
  color: #FC5B47;
`;

const Description = styled.p`
  margin: 0;
  font-size: 16px;
  color: #777;
`;