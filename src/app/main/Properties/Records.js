import React from "react";
import { useSelector } from "react-redux";
import { Card, Typography } from "@mui/material";
import { selectProperties } from "./PropertySlice1";
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PollIcon from '@mui/icons-material/Poll';

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
        <Typography className="heading-text" variant="h6">
          More Details
        </Typography>
        <hr />
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="detailsFlex">
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
                <BrokenImageIcon/>
                <span style={{ fontWeight: "600" }}> Disputes :</span>
                <span style={{ marginLeft: "20px" }}>
                  {propertyData?.data?.property?.disputes}
                </span>
              </Typography>
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
                <FileCopyIcon/>
                <span style={{ fontWeight: "600" }}> Document Number :</span>
                <span style={{ marginLeft: "20px" }}>
                  {propertyData?.data?.property?.document_number}
                </span>
              </Typography>
            </div>
            <div className="detailsFlex">
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
                <AccountBalanceIcon/>
                <span style={{ fontWeight: "600" }}> Loan Eligibility :</span>
                <span style={{ marginLeft: "20px" }}>
                  {propertyData?.data?.property?.loan_eligible}
                </span>
              </Typography>
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
                <MapsHomeWorkIcon/>
                <span style={{ fontWeight: "600" }}> Registrar Location :</span>
                <span style={{ marginLeft: "20px" }}>
                  {propertyData?.data?.property?.register_location}
                </span>
              </Typography>
            </div>
            <div className="detailsFlex">
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
                <PollIcon/>
                <span style={{ fontWeight: "600" }}> Survey Number :</span>
                <span style={{ marginLeft: "20px" }}>
                  {propertyData?.data?.property?.survey_number}
                </span>
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Records;
