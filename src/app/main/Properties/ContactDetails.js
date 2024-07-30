import React from "react";
import { useSelector } from "react-redux";
import { Button, Card, Typography } from "@mui/material";
import { selectProperties } from "./PropertySlice1";
import ContactSeller from "./property-components/ContactSeller";
import { selectUser } from "app/store/userSlice";
import Internal_Comments from "./Internal_Comments";
import VeerifiedComments from "./VeerifiedComments";
import Rating from "./property-components/Rating";

const ContactDetails = () => {
  const propertyData = useSelector(selectProperties);
  const user = useSelector(selectUser);

  const shownumber = user.role != "guest";
  const disableButton = user.role === "guest";


  const makeCall = () => {
    const telUrl = `tel:${propertyData?.data?.property?.med_num1}`;
    window.open(telUrl);
  };
  



  return (
    <>
      <Card
        sx={{ borderRadius: "10px", padding: "20px", marginBottom: "20px",position:"relative" }}
      >
        <Typography className="heading-text" variant="h6">

          Mediator Details
        </Typography>
        <div style={{ display: "flex", fontSize: "18px" }}>
          <Typography
            style={{ marginRight: "10px", textTransform: "capitalize" }}
          >
            {propertyData?.data?.property?.med_name}:
          </Typography>
          {shownumber ? (
            <Typography>{propertyData?.data?.property?.med_num1}</Typography>
          ) : (
            <Typography>+91 **********</Typography>
          )}
        </div>
        <Button
          disabled={disableButton}
          sx={{
            background: "orange",
            borderRadius: "8px",
            marginTop: "20px",
          }}
          onClick={makeCall}
        >
          Call
        </Button>
      </Card>
      <ContactSeller />
      {(user.role === "admin" || user.role === "staff") &&(<Internal_Comments/>)}
      {(user.role ==="admin" || user.role ==="staff" || user.role === "verifiedUser")&&(<VeerifiedComments/>)}
      <Rating/>
    </>
  );
};

export default ContactDetails;
