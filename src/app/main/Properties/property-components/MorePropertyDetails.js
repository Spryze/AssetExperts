// import React from "react";
// import { useSelector } from "react-redux";
// import { selectProperties } from "../PropertySlice1";
// import { Card, Typography } from "@mui/material";
// import { useState, useEffect } from "react";
// import SellIcon from "@mui/icons-material/Sell";
// import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
// import MergeTypeIcon from "@mui/icons-material/MergeType";
// import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
// import NorthWestIcon from "@mui/icons-material/NorthWest";
// import NearMeIcon from "@mui/icons-material/NearMe";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { width } from "@mui/system";

// const MorePropertyDetails = () => {
//   const propertyData = useSelector(selectProperties);
//   console.log(propertyData)
//   const propertyType = propertyData?.data?.property?.p_type

//   const toggleShowMore = () => {
//     setShowMore(!showMore);
//   };
//   return (
//     <>
//       <Card
//         id="PropertyDetails"
//         className="card"
//         sx={{
//           borderRadius: "10px",
//           padding: "30px",
//           display: "flex",
//           flexDirection: "column",
//           margin: "20px 0px",
//         }}
//       >
//         <Typography className="heading-text" variant="h6">
//           Property Details
//         </Typography>
//         <hr />
       
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div className="detailsFlex" sx={{display:'flex',flexDirection:'column',width:{xs:'100%',md:'50%',}}}>
//             <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
//               <SellIcon />
//               <span style={{ fontWeight: "600" }}>
      
//                 Price per {propertyData?.data?.property?.unit}:
//               </span>
//               <span style={{ marginLeft: "20px" }}>
//                 ₹ {propertyData?.data?.property?.price}
//               </span>
//             </Typography>

//             <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
//               <AccountBalanceSharpIcon />
//               <span style={{ fontWeight: "600" }}> Approoved by :</span>
//               <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
//                 {propertyData?.data?.property?.approved_by}
//               </span>
//             </Typography>
//           </div>

//           <div className="detailsFlex" sx={{display:'flex',flexDirection:'column',width:{xs:'100%',md:'50%',}}}>
//             <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
//               <AccountTreeIcon />{" "}
//               <span style={{ fontWeight: "600" }}> Area :</span>
//               <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
//                 {propertyData?.data?.property?.area} {propertyData?.data?.property?.unit}
//               </span>
//             </Typography>

//             <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
//               <MergeTypeIcon />{" "}
//               <span style={{ fontWeight: "600" }}> Property Type :</span>
//               <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
//                 {propertyData?.data?.property?.p_type}
//               </span>
//             </Typography>
//           </div>

//           <div className="detailsFlex" sx={{display:'flex',flexDirection:'column',width:{xs:'100%',md:'50%',}}}>
//             <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
//               <CloseFullscreenIcon />
//               <span style={{ fontWeight: "600" }}> Dimensions :</span>
//               <span style={{ marginLeft: "20px" }}>
//                 {propertyData?.data?.property?.dimensions}
//               </span>
//             </Typography>
//             <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
//               <NorthWestIcon />
//               <span style={{ fontWeight: "600" }}>Facing :</span>
//               <span style={{ textTransform: "capitalize", marginLeft: "20px" }}>
//                 {propertyData?.data?.property?.direction}
//               </span>
//             </Typography>
//           </div>
//           <div className="detailsFlex" sx={{display:'flex',flexDirection:'column',width:{xs:'100%',md:'50%',}}}>
//             <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
//               <NearMeIcon />
//               <span style={{ fontWeight: "600" }}>Landmark :</span>
//               <span style={{ textTransform: "capitalize", marginLeft: "20px" }}>
//                 {propertyData?.data?.property?.landmark}
//               </span>
//             </Typography>
//             {propertyType === "Flat" && (
//               <Typography
//                 variant="p"
//                 sx={{ margin: "10px 0", fontSize: "15px" }}
//               >
//                 <span style={{ fontWeight: "600" }}> Established Year :</span>
//               </Typography>
//             )}
//           </div>
//           <div className="detailsFlex" sx={{display:'flex',flexDirection:'column',width:{xs:'100%',md:'50%',}}}>
//             {propertyType === "Plot" && (
//               <Typography
//                 variant="p"
//                 sx={{ margin: "10px 0", fontSize: "15px" }}
//               >
//                 <span style={{ fontWeight: "600" }}>No.Of.OpenSides : </span>
//                 <span
//                   style={{ textTransform: "capitalize", marginLeft: "20px" }}
//                 >
//                   {propertyData?.data?.property?.est_year}
//                 </span>
//               </Typography>
//             )}
//             <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
//               <LocationOnIcon />
//               <span style={{ fontWeight: "600" }}>Address :</span>
//               <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
//                 {`${propertyData?.data?.property?.village}, ${propertyData?.data?.property?.district}, ${propertyData?.data?.property?.state}`}
//               </span>
//             </Typography>
//           </div>

//           {propertyType === "Flat" && (<div className="detailsFlex" sx={{display:'flex',flexDirection:'column',width:{xs:'100%',md:'50%',}}}>
//             {propertyType === "Flat" && (
//               <Typography
//                 variant="p"
//                 sx={{ margin: "10px 0", fontSize: "15px" }}
//               >
//                 <span style={{ fontWeight: "600" }}> Furnished :</span>
//                 <span
//                   style={{ textTransform: "capitalize", marginLeft: "20px" }}
//                 >
//                   {propertyData?.data?.property?.est_year}
//                 </span>
//               </Typography>
//             )}
//             {propertyType === "Flat" && (
//               <Typography
//                 variant="p"
//                 sx={{ margin: "10px 0", fontSize: "15px" }}
//               >
//                 RERA Status :
//                 <span
//                   style={{ textTransform: "capitalize", marginLeft: "20px" }}
//                 >
//                   {propertyData?.data?.property?.est_year}
//                 </span>
//               </Typography>
//             )}
//           </div>)}
//           {propertyType === "Flat" && (<div className="detailsFlex" sx={{display:'flex',flexDirection:'column',width:{xs:'100%',md:'50%',}}}>
//             {propertyType === "Flat" && (
//               <Typography
//                 variant="p"
//                 sx={{ margin: "10px 0", fontSize: "15px" }}
//               >
//                 Lift :
//                 <span
//                   style={{ textTransform: "capitalize", marginLeft: "20px" }}
//                 >
//                   {propertyData?.data?.property?.est_year}
//                 </span>
//               </Typography>
//             )}
//             {propertyType === "Plot" && (
//               <Typography
//                 variant="p"
//                 sx={{ margin: "10px 0", fontSize: "15px" }}
//               >
//                 <span style={{ fontWeight: "600" }}>Boundry Wall :</span>

//                 <span
//                   style={{ textTransform: "capitalize", marginLeft: "20px" }}
//                 >
//                   {propertyData?.data?.property?.est_year}
//                 </span>
//               </Typography>
//             )}
//           </div>)}
          
//         </div>
//       </Card>
//     </>
//   );
// };

// export default MorePropertyDetails

import React from "react";
import { useSelector } from "react-redux";
import { selectProperties } from "../PropertySlice1";
import { Card, Typography, Box } from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import NearMeIcon from "@mui/icons-material/NearMe";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DetailBox from "./DetailBox";

const MorePropertyDetails = () => {
  const propertyData = useSelector(selectProperties);
  const propertyType = propertyData?.data?.property?.p_type;

  return (
    <Card
      id="PropertyDetails"
      className="card"
      sx={{
        borderRadius: "10px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        margin: "20px 0px",
      }}
    >
      <Typography className="heading-text" variant="h6">
        Property Details
      </Typography>
      <hr />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box
        sx={{
          backgroundColor: "#F0F8FF",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <Box
          className="detailsFlex"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: "10px", md: "20px" },
            boxShadow: `0px 0px 5px rgba(0, 0, 0, 0.1)`,            
          }}
        >
          <DetailBox>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <SellIcon />
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                Price per {propertyData?.data?.property?.unit}:
              </Typography>
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px" }}>
                ₹ {propertyData?.data?.property?.price}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <AccountBalanceSharpIcon />
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                Approved by:
              </Typography>
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.approved_by}
              </Typography>
            </Box>
          </Box>
          </DetailBox>
          <DetailBox>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <AccountTreeIcon />
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                Area:
              </Typography>
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.area} {propertyData?.data?.property?.unit}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <MergeTypeIcon />
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                Property Type:
              </Typography>
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.p_type}
              </Typography>
            </Box>
            
          </Box>
          </DetailBox>
         
        </Box>
       
        <Box
          className="detailsFlex"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: "10px", md: "20px" },
            
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <CloseFullscreenIcon />
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                Dimensions:
              </Typography>
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px" }}>
                {propertyData?.data?.property?.dimensions}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <NorthWestIcon />
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                Facing:
              </Typography>
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.direction}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <NearMeIcon />
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                Landmark:
              </Typography>
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.landmark}
              </Typography>
            </Box>
            {propertyType === "Flat" && (
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                  Established Year:
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          className="detailsFlex"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: "10px", md: "20px" },
            
          }}
        >
          {propertyType === "Plot" && (
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                  No.Of.OpenSides:
                </Typography>
                <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", textTransform: "capitalize" }}>
                  {propertyData?.data?.property?.est_year}
                </Typography>
              </Box>
            </Box>
          )}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <LocationOnIcon />
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                Address:
              </Typography>
              <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", textTransform: "capitalize" }}>
                {`${propertyData?.data?.property?.village}, ${propertyData?.data?.property?.district}, ${propertyData?.data?.property?.state}`}
              </Typography>
            </Box>
          </Box>
        </Box>

        {propertyType === "Flat" && (
          <Box
            className="detailsFlex"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: "10px", md: "20px" },
              boxShadow: `0px 0px 5px rgba(0, 0, 0, 1)`,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                  Furnished:
                </Typography>
                <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", textTransform: "capitalize" }}>
                  {propertyData?.data?.property?.est_year}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                  RERA Status:
                </Typography>
                <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", textTransform: "capitalize" }}>
                  {propertyData?.data?.property?.est_year}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                  Lift:
                </Typography>
                <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", textTransform: "capitalize" }}>
                  {propertyData?.data?.property?.est_year}
                </Typography>
              </Box>
              {propertyType === "Plot" && (
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", fontWeight: "600" }}>
                    Boundary Wall:
                  </Typography>
                  <Typography variant="p" sx={{ marginLeft: "10px", fontSize: "15px", textTransform: "capitalize" }}>
                    {propertyData?.data?.property?.est_year}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
      </Box>
    </Card>
  );
};

export default MorePropertyDetails;

