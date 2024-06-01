import React from "react";
import { Typography, Grid, Paper, Container, Button } from "@mui/material";
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
    <Container sx={{ marginTop: "20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        {profileData && (
          <>
            <Grid item xs={12} md={6}>
              {/* <Paper elevation={3} style={{ padding: "20px" }}> */}
              <Typography sx={{ margin: "5px 0px" }} variant="h6" gutterBottom>
                Profile Information
              </Typography>
              <hr style={{ marginBottom: "20px" }} />
              <Typography
                sx={{
                  margin: "5px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                  background:"#ededed",
                  padding:"10px",
                  borderRadius:"10px"
                }}
                variant="body1"
              >
                <span>
                  <strong>Name:</strong>
                </span>
                <span> {profileData.data.displayName}</span>
              </Typography>
              <Typography
                sx={{
                  margin: "5px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding:"10px",
                  borderRadius:"10px",
                  background:"#ededed",
                }}
                variant="body1"
              >
                <span>
                  <strong>Email:</strong>
                </span>
                <span>{profileData.data.email}</span>
              </Typography>
              <Typography
                sx={{
                  margin: "5px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding:"10px",
                  borderRadius:"10px",
                  background:"#ededed",
                }}
                variant="body1"
              >
                <span>
                  <strong>Phone 1:</strong>
                </span>
                <span>{profileData.data.phone_num_1}</span>
              </Typography>
              <Typography
                sx={{
                  margin: "5px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding:"10px",
                  borderRadius:"10px",
                  background:"#ededed",
                }}
                variant="body1"
              >
                <span>
                  <strong>Phone 2:</strong>
                </span>
                <span>{profileData.data.phone_num_2}</span>
              </Typography>
              <Typography
                sx={{
                  margin: "5px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding:"10px",
                  borderRadius:"10px",
                  background:"#ededed",
                }}
                variant="body1"
              >
                <span>
                  <strong>Role:</strong>
                </span>
                <span>{profileData.role}</span>
              </Typography>
              <Typography
                sx={{
                  margin: "5px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding:"10px",
                  borderRadius:"10px",
                  background:"#ededed",
                }}
                variant="body1"
              >
                <span>
                  <strong>Profession:</strong>
                </span>
                <span> {profileData.data.profession}</span>
              </Typography>
              <Typography
                sx={{
                  margin: "5px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding:"10px",
                  borderRadius:"10px",
                  background:"#ededed",
                }}
                variant="body1"
              >
                <span>
                  <strong>Address:</strong>
                </span>
                <span>{profileData.data.address}</span>
              </Typography>
              <Typography
                sx={{
                  margin: "5px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding:"10px",
                  borderRadius:"10px",
                  background:"#ededed",
                }}
                variant="body1"
              >
                <span>
                  <strong>Requirements:</strong>
                </span>
                <span> {profileData.data.requirements}</span>
              </Typography>

              {/* </Paper> */}
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
      <UpdateProfile
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </Container>
  );
};

export default ProfilePage;
