// import React from "react";
// import { selectProperties } from "../PropertySlice1";
// import { useSelector } from "react-redux";
// import { Typography, Paper } from "@mui/material";
// import RatingStar1 from "src/assets/Ratings/star1.png";
// import RatingStar2 from "src/assets/Ratings/star2.png";


// const Rating = () => {
//   const PropertyData = useSelector(selectProperties);
//   console.log("PropertyData", PropertyData);
//   const Rating = PropertyData?.data?.property?.rating
//   return (
//     <div>
//       <Paper>
//         <Typography> Property Rating</Typography>

//       </Paper>
//     </div>
//   );
// };

// export default Rating;
import React from "react";
import { selectProperties } from "../PropertySlice1";
import { useSelector } from "react-redux";
import { Typography, Paper, Box } from "@mui/material";
import RatingStar1 from "src/assets/Default/Ratings/star1.png";  // Filled star
import RatingStar2 from "src/assets/Default/Ratings/star2.png";  // Empty star
import { width } from "@mui/system";

const Rating = () => {
  const PropertyData = useSelector(selectProperties);
  console.log("PropertyData", PropertyData);
  const rating = PropertyData?.data?.property?.rating || 3;
  
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<img key={i} src={RatingStar1} alt="Filled Star" style={{ width: "auto", height: 35 }} />);
    } else {
      stars.push(<img key={i} src={RatingStar2} alt="Empty Star" style={{ width: "auto", height: 35 }} />);
    }
  }

  return (
    <div style={{justifyContent:"center",margin:"20px 0px"}}>
         <Typography className="heading-text">Property Rating</Typography>
         
      <Paper sx={{width:"-webkit-fill-available",padding:"10px",boxShadow:"none",borderRadius:"25px"}}>
       
        <Box display="flex">
          {stars}
        </Box>
      </Paper>
    </div>
  );
};

export default Rating;
