import React from "react";
import { Typography, Grid, Paper, Container,Button } from "@mui/material";
import { useSelector } from "react-redux"; 
import { selectUser } from "app/store/userSlice";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";

const ProfilePage = () => {
  const profileData = useSelector(selectUser);
  console.log("profileData", profileData);
  const [openDialog, setOpenDialog] = useState(false);
  const handleUpdateProfileClick = () => {
    setOpenDialog(true); 
  };

  return (
    <Container sx={{marginTop:"20px"}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Profile Details
          </Typography>
          
        </Grid>
        {profileData && (
          <>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography sx={{margin:"5px 0px"}} variant="h6" gutterBottom>
                  Profile Information
                </Typography>
                <hr style={{marginBottom:"20px"}}/>
                <Typography sx={{margin:"5px 0px"}} variant="body1">
                  <strong>Name:</strong> {profileData.data.displayName}
                </Typography>
                <Typography sx={{margin:"5px 0px"}} variant="body1">
                  <strong>Email:</strong> {profileData.data.email}
                </Typography>
                <Typography sx={{margin:"5px 0px"}}variant="body1">
                  <strong>Phone 1:</strong> {profileData.data.phone_num_1}
                </Typography>
                <Typography sx={{margin:"5px 0px"}}variant="body1">
                  <strong>Phone 2:</strong> {profileData.data.phone_num_2}
                </Typography>
                <Typography sx={{margin:"5px 0px"}} variant="body1">
                  <strong>Role:</strong> {profileData.role}
                </Typography>
                <Typography sx={{margin:"5px 0px"}}variant="body1">
                  <strong>Profession:</strong> {profileData.data.profession}
                </Typography>
                <Typography sx={{margin:"5px 0px"}}variant="body1">
                  <strong>Address:</strong> {profileData.data.address}
                </Typography>
                <Typography sx={{margin:"5px 0px"}} variant="body1">
                  <strong>Requirements:</strong> {profileData.data.requirements}
                </Typography>
               
              </Paper>
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h6" gutterBottom>
                  Address & Additional Details
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {profileData.address}
                </Typography>
                <Typography variant="body1">
                  <strong>Requirements:</strong> {profileData.requirements}
                </Typography>
                <Typography variant="body1">
                  <strong>Comments:</strong> {profileData.comments}
                </Typography>
              </Paper>
            </Grid> */}
          </>
        )}
      </Grid>
      <UpdateProfile open={openDialog} handleClose={() => setOpenDialog(false)}  />
    </Container>
  );
};

export default ProfilePage;
