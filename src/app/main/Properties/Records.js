import React from "react";
import { useSelector } from "react-redux";
import { Card, Typography } from "@mui/material";
import { selectProperties } from "./PropertySlice1";

const Records = () => {
  const propertyData = useSelector(selectProperties);
  return (
    <div>
      <Card
        sx={{
          borderRadius: "10px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          margin: "20px 0px",
        }}
      >
        <Typography variant="h6">More Details</Typography>
        <hr />
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
           
            }}
          >
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
             <span style={{fontWeight:"bold"}}> Disputes :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.disputes}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
             <span style={{fontWeight:"bold"}}> Document Number :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.document_number}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <span style={{fontWeight:"bold"}}> Loan Eligibility :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.loan_eligible}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <span style={{fontWeight:"bold"}}> Registrar Location :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.register_location}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
             <span style={{fontWeight:"bold"}}> Survey Number :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.survey_number}
              </span>
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Records;
