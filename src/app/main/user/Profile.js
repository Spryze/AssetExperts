// import React from "react";
// import { Typography, Grid, Paper, Container, Button } from "@mui/material";
// import { useSelector } from "react-redux";
// import { selectUser } from "app/store/userSlice";
// import { useState } from "react";
// import UpdateProfile from "./UpdateProfile";
// import { useEffect } from "react";

// const ProfilePage = () => {
//   const profileData = useSelector(selectUser);
//   console.log("profileData", profileData);
//   const [openDialog, setOpenDialog] = useState(false);
//   const handleUpdateProfileClick = () => {
//     setOpenDialog(true);
//   };

//   useEffect(()=>{},[[profileData]]);
 

//   return (
//     <Container sx={{ marginTop: "20px" }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}></Grid>
//         {profileData && (
//           <>
//             <Grid item xs={12} md={6}>
//               {/* <Paper elevation={3} style={{ padding: "20px" }}> */}
//               <Typography sx={{ margin: "5px 0px" }} variant="h6" gutterBottom>
//                 Profile Information
//               </Typography>
//               <hr style={{ marginBottom: "20px" }} />
//               <Typography
//                 sx={{
//                   margin: "5px 0px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   background:"#ededed",
//                   padding:"10px",
//                   borderRadius:"10px"
//                 }}
//                 variant="body1"
//               >
//                 <span>
//                   <strong>Name:</strong>
//                 </span>
//                 <span> {profileData.data.displayName}</span>
//               </Typography>
//               <Typography
//                 sx={{
//                   margin: "5px 0px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding:"10px",
//                   borderRadius:"10px",
//                   background:"#ededed",
//                 }}
//                 variant="body1"
//               >
//                 <span>
//                   <strong>Email:</strong>
//                 </span>
//                 <span>{profileData.data.email}</span>
//               </Typography>
//               <Typography
//                 sx={{
//                   margin: "5px 0px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding:"10px",
//                   borderRadius:"10px",
//                   background:"#ededed",
//                 }}
//                 variant="body1"
//               >
//                 <span>
//                   <strong>Whatsapp Number:</strong>
//                 </span>
//                 <span>{profileData.data.phone_num_1}</span>
//               </Typography>
//               <Typography
//                 sx={{
//                   margin: "5px 0px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding:"10px",
//                   borderRadius:"10px",
//                   background:"#ededed",
//                 }}
//                 variant="body1"
//               >
//                 <span>
//                   <strong>Contact Number:</strong>
//                 </span>
//                 <span>{profileData.data.phone_num_2}</span>
//               </Typography>
//               <Typography
//                 sx={{
//                   margin: "5px 0px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding:"10px",
//                   borderRadius:"10px",
//                   background:"#ededed",
//                 }}
//                 variant="body1"
//               >
//                 <span>
//                   <strong>Role:</strong>
//                 </span>
//                 <span>{profileData.role}</span>
//               </Typography>
//               <Typography
//                 sx={{
//                   margin: "5px 0px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding:"10px",
//                   borderRadius:"10px",
//                   background:"#ededed",
//                 }}
//                 variant="body1"
//               >
//                 <span>
//                   <strong>Profession:</strong>
//                 </span>
//                 <span> {profileData.data.profession}</span>
//               </Typography>
//               <Typography
//                 sx={{
//                   margin: "5px 0px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding:"10px",
//                   borderRadius:"10px",
//                   background:"#ededed",
//                 }}
//                 variant="body1"
//               >
//                 <span>
//                   <strong>Address:</strong>
//                 </span>
//                 <span>{profileData.data.address}</span>
//               </Typography>
//               <Typography
//                 sx={{
//                   margin: "5px 0px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding:"10px",
//                   borderRadius:"10px",
//                   background:"#ededed",
//                 }}
//                 variant="body1"
//               >
//                 <span>
//                   <strong>Requirements:</strong>
//                 </span>
//                 <span> {profileData.data.requirements}</span>
//               </Typography>
//               <Typography
//                 sx={{
//                   margin: "5px 0px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding:"10px",
//                   borderRadius:"10px",
//                   background:"#ededed",
//                 }}
//                 variant="body1"
//               >
//                 <span>
//                   <strong>My Properties</strong>
//                 </span>
//                 <span> {profileData.data.requirements}</span>
//               </Typography>

//               {/* </Paper> */}
//             </Grid>
//             {/* <Grid item xs={12} md={6}>
//               <Paper elevation={3} style={{ padding: "20px" }}>
//                 <Typography variant="h6" gutterBottom>
//                   Address & Additional Details
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Address:</strong> {profileData.address}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Requirements:</strong> {profileData.requirements}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Comments:</strong> {profileData.comments}
//                 </Typography>
//               </Paper>
//             </Grid> */}
//           </>
//         )}
//       </Grid>
//       <UpdateProfile
//         open={openDialog}
//         handleClose={() => setOpenDialog(false)}
//       />
//     </Container>
//   );
// };

// export default ProfilePage;


import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Container,
  Button,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import UpdateProfile from "./UpdateProfile";
import EditIcon from '@mui/icons-material/Edit';

const ProfilePage = () => {
  const profileData = useSelector(selectUser);
  const [openDialog, setOpenDialog] = useState(false);



  useEffect(() => {}, [profileData]);

  const renderProfileDetail = (label, value) => {
    if (value === null || value === undefined) {
      return null;
    }
  
    if (typeof value === "object") {
      value = JSON.stringify(value, null, 2); 
    }
    return (
      <Paper  sx={{ padding: "10px", margin: "10px 0", borderRadius: "10px",boxShadow:"none" }}>
        <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            <strong>{label}:</strong>
          </span>
          <span>{value}</span>
        </Typography>
      </Paper>
    );
  };

  return (
    <Container sx={{ marginTop: "20px", marginBottom: "20px" }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            My Profile
          </Typography>
        </Grid>
        {profileData && (
          <Grid item xs={12} md={8}>
            <Card sx={{ overflow: "visible", position: "relative", borderRadius: "20px" }}>
              <CardHeader
                avatar={
                  <Avatar
                    alt={profileData.data.displayName}
                    src={profileData.data.avatarUrl || "/static/images/avatar/1.jpg"}
                    sx={{ width: 80, height: 80 }}
                  />
                }
                title={
                  <Typography variant="h5" fontWeight="bold">
                    {profileData.data.displayName}
                  </Typography>
                }
                subheader={profileData.data.email}
                sx={{
                  background: `linear-gradient(135deg, #00204a 0%, #2575fc 100%)`,
                  color: "#fff",
                  borderRadius: "20px 20px 0 0",
                  padding: "16px",
                }}
              />
              <Divider />
              <CardContent sx={{ paddingTop: "24px", paddingBottom: "24px" }}>
                {renderProfileDetail("Name", profileData.data.displayName)}
                {renderProfileDetail("Email", profileData.data.email)}
                {renderProfileDetail("Whatsapp Number", profileData.data.phone_num_1)}
                {renderProfileDetail("Contact Number", profileData.data.phone_num_2)}
                {/* {renderProfileDetail("Role", profileData.role)} */}
                {renderProfileDetail("Profession", profileData.data.profession)}
                {renderProfileDetail("Address", profileData.data.address)}
                {renderProfileDetail("Requirements", profileData.data.requirements)}
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  padding: "16px",
                }}
              >
                <UpdateProfile open={openDialog} handleClose={() => setOpenDialog(false)} />
              </Box>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ProfilePage;



