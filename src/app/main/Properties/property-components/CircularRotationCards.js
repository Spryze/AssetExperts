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
//       <Card className={classes.card} style={{ transform: `rotateY(${rotationAngle}deg) translateZ(150px)` }}>
//         <CardContent>
//           <Typography variant="h5" component="div">
//             Card 1
//           </Typography>
//         </CardContent>
//       </Card>
//       <Card className={classes.card} style={{ transform: `rotateY(${rotationAngle + 90}deg) translateZ(150px)` }}>
//         <CardContent>
//           <Typography variant="h5" component="div">
//             Card 2
//           </Typography>
//         </CardContent>
//       </Card>
//       <Card className={classes.card} style={{ transform: `rotateY(${rotationAngle + 180}deg) translateZ(150px)` }}>
//         <CardContent>
//           <Typography variant="h5" component="div">
//             Card 3
//           </Typography>
//         </CardContent>
//       </Card>
//       <Card className={classes.card} style={{ transform: `rotateY(${rotationAngle + 270}deg) translateZ(150px)` }}>
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

import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography } from "@mui/material";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  cardContainer: {
    position: "relative",
    width: "200px",
    height: "200px",
  },
  card: {
    position: "absolute",
    width: "250px",
    height: "250px",
    padding: "0", // This will remove padding from the Card component itself
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    fontSize: "24px",
    border: "2px solid #ccc",
    transition: "transform 0.5s ease",
  },
  cardContent: {
    padding: 0, // This will remove padding from the CardContent component
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "20%",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust opacity here (0.5 means 50% opacity)
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  typography: {
    zIndex: 2, // Ensure text appears above the overlay
  },
});

const CircularRotationCards = () => {
  const classes = useStyles();
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle((prevAngle) => prevAngle + 90);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.cardContainer}>
        <Card
          className={classes.card}
          style={{
            transform: `rotate(${rotationAngle}deg) translate(200px) rotate(-${rotationAngle}deg)`,
            zIndex: rotationAngle % 360 === 270 ? 1 : 0,
          }}
        >
          <CardContent className={classes.cardContent}>
            <img src="assets/cardimages/legalverification.jpeg" alt="Card 1" />
           
            <div className={classes.overlay}>
            <Typography sx={{fontSize:"20px", fontWeight:"bold"}} >
              Legal Verification
            </Typography>
            </div>
          </CardContent>
        </Card>
        <Card
          className={classes.card}
          style={{
            transform: `rotate(${rotationAngle + 90}deg) translate(200px) rotate(-${rotationAngle + 90}deg)`,
            zIndex: rotationAngle % 360 === 180 ? 1 : 0,
          }}
        >
           <CardContent className={classes.cardContent}>
            <img src="assets/cardimages/propertyleads.jpeg" alt="Card 1" />
           
            <div className={classes.overlay}>
            <Typography sx={{fontSize:"20px", fontWeight:"bold"}} >
              Property Leads
            </Typography>
            </div>
          </CardContent>
        </Card>
        <Card
          className={classes.card}
          style={{
            transform: `rotate(${rotationAngle + 180}deg) translate(200px) rotate(-${rotationAngle + 180}deg)`,
            zIndex: rotationAngle % 360 === 90 ? 1 : 0,
          }}
        >
           <CardContent className={classes.cardContent}>
            <img src="assets/cardimages/propertysurvilence.jpeg" alt="Card 1" />
           
            <div className={classes.overlay}>
            <Typography sx={{fontSize:"20px", fontWeight:"bold"}} >
              Property Survilence
            </Typography>
            </div>
          </CardContent>
        </Card>
        <Card
          className={classes.card}
          style={{
            transform: `rotate(${rotationAngle + 270}deg) translate(200px) rotate(-${rotationAngle + 270}deg)`,
            zIndex: rotationAngle % 360 === 360 ? 1 : 0,
          }}
        >
           <CardContent className={classes.cardContent}>
            <img src="assets/cardimages/verifiedlisting.jpeg" alt="Card 1" />
           
            <div className={classes.overlay}>
            <Typography sx={{fontSize:"20px", fontWeight:"bold"}} >
              Verified
            </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CircularRotationCards;


