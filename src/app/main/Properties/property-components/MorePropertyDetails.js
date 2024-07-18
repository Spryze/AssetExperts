import React from "react";
import { useSelector } from "react-redux";
import { selectProperties } from "../PropertySlice1";
import { Card, Typography } from "@mui/material";
import { selectUser } from "app/store/userSlice";
import SellIcon from "@mui/icons-material/Sell";
import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import NearMeIcon from "@mui/icons-material/NearMe";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from '@mui/icons-material/Description';

const MorePropertyDetails = () => {
  const propertyData = useSelector(selectProperties);
  const propertyType = propertyData?.data?.property?.p_type;
  const user = useSelector(selectUser);

  const openPdfInNewTab = (url) => {
    window.open(url, '_blank');
  };
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <>
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="detailsFlex">
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <SellIcon />
              <span style={{ fontWeight: "600" }}>Property ID :</span>
              <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.property_id}
              </span>
            </Typography>

            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <AccountBalanceSharpIcon />
              <span style={{ fontWeight: "600" }}> Property Size :</span>
              <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.size}
              </span>
            </Typography>
          </div>
          <div className="detailsFlex">
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <SellIcon />
              <span style={{ fontWeight: "600" }}>Property Name :</span>
              <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.prop_name}
              </span>
            </Typography>

            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <AccountBalanceSharpIcon />
              <span style={{ fontWeight: "600" }}> Approoved by :</span>
              <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.approved_by}
              </span>
            </Typography>
          </div>
          <div className="detailsFlex">
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <SellIcon />
              <span style={{ fontWeight: "600" }}>
                Price per {propertyData?.data?.property?.unit}:
              </span>
              <span style={{ marginLeft: "20px" }}>
                ₹ {propertyData?.data?.property?.price}
              </span>
            </Typography>

            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <AccountBalanceSharpIcon />
              <span style={{ fontWeight: "600" }}> Survey Number :</span>
              <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.survey_number}
              </span>
            </Typography>
          </div>

          <div className="detailsFlex">
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <AccountTreeIcon />{" "}
              <span style={{ fontWeight: "600" }}> Area :</span>
              <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.area}{" "}
                {propertyData?.data?.property?.unit}
              </span>
            </Typography>

            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <MergeTypeIcon />{" "}
              <span style={{ fontWeight: "600" }}> Property Type :</span>
              <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
                {propertyData?.data?.property?.p_type}
              </span>
            </Typography>
          </div>

          <div className="detailsFlex">
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <CloseFullscreenIcon />
              <span style={{ fontWeight: "600" }}> Dimensions :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.dimensions}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <NorthWestIcon />
              <span style={{ fontWeight: "600" }}>Facing :</span>
              <span style={{ textTransform: "capitalize", marginLeft: "20px" }}>
                {propertyData?.data?.property?.direction}
              </span>
            </Typography>
          </div>
          <div className="detailsFlex">
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <CloseFullscreenIcon />
              <span style={{ fontWeight: "600" }}> Loan Eligible :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.loan_eligibile}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <NorthWestIcon />
              <span style={{ fontWeight: "600" }}>Disputes :</span>
              <span style={{ textTransform: "capitalize", marginLeft: "20px" }}>
                {propertyData?.data?.property?.disputes}
              </span>
            </Typography>
          </div>
          <div className="detailsFlex">
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <CloseFullscreenIcon />
              <span style={{ fontWeight: "600" }}> Registrar Location :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.reg_loc}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <NorthWestIcon />
              <span style={{ fontWeight: "600" }}>Government Price (₹) :</span>
              <span style={{ textTransform: "capitalize", marginLeft: "20px" }}>
                {propertyData?.data?.property?.govt_price}
              </span>
            </Typography>
          </div>
          <div className="detailsFlex">
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <NearMeIcon />
              <span style={{ fontWeight: "600" }}>Landmark :</span>
              <span style={{ textTransform: "capitalize", marginLeft: "20px" }}>
                {propertyData?.data?.property?.landmark}
              </span>
            </Typography>
            {propertyType === "flat" && (
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
                <span style={{ fontWeight: "600" }}> Established Year :</span>
                <span
                  style={{ textTransform: "capitalize", marginLeft: "20px" }}
                >
                  {propertyData?.data?.property?.est_year}
                </span>
              </Typography>
            )}
          </div>
          <div className="detailsFlex">
            {propertyType === "plot" && (
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
                <span style={{ fontWeight: "600" }}>No.Of.OpenSides : </span>
                <span
                  style={{ textTransform: "capitalize", marginLeft: "20px" }}
                >
                  {propertyData?.data?.property?.num_open_sides}
                </span>
              </Typography>
            )}
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <LocationOnIcon />
              <span style={{ fontWeight: "600" }}>Address :</span>
              <span style={{ marginLeft: "20px", textTransform: "capitalize" }}>
                {`${propertyData?.data?.property?.village}, ${propertyData?.data?.property?.district}, ${propertyData?.data?.property?.state}`}
              </span>
            </Typography>
          </div>

          {propertyType === "flat" && (
            <div className="detailsFlex">
              {propertyType === "flat" && (
                <Typography
                  variant="p"
                  sx={{ margin: "10px 0", fontSize: "15px" }}
                >
                  <span style={{ fontWeight: "600" }}> Furnished :</span>
                  <span
                    style={{ textTransform: "capitalize", marginLeft: "20px" }}
                  >
                    {propertyData?.data?.property?.furnshied}
                  </span>
                </Typography>
              )}
              {propertyType === "flat" && (
                <Typography
                  variant="p"
                  sx={{ margin: "10px 0", fontSize: "15px" }}
                >
                  RERA Status :
                  <span
                    style={{ textTransform: "capitalize", marginLeft: "20px" }}
                  >
                    {propertyData?.data?.property?.rera_status}
                  </span>
                </Typography>
              )}
            </div>
          )}
          {propertyType === "flat" && (
            <div className="detailsFlex">
              {propertyType === "flat" && (
                <Typography
                  variant="p"
                  sx={{ margin: "10px 0", fontSize: "15px" }}
                >
                  Lift :
                  <span
                    style={{ textTransform: "capitalize", marginLeft: "20px" }}
                  >
                    {propertyData?.data?.property?.lift}
                  </span>
                </Typography>
              )}
              {propertyType === "plot" && (
                <Typography
                  variant="p"
                  sx={{ margin: "10px 0", fontSize: "15px" }}
                >
                  <span style={{ fontWeight: "600" }}>Boundry Wall :</span>

                  <span
                    style={{ textTransform: "capitalize", marginLeft: "20px" }}
                  >
                    {propertyData?.data?.property?.bound_wall}
                  </span>
                </Typography>
              )}
            </div>
          )}
          {user?.role === "admin" && (
            <div className="detailsFlex">
              
              <div style={{display:"flex"}}>
              <Typography
                  variant="p"
                  sx={{ margin: "10px 0", fontSize: "15px" }}>
                    <DescriptionIcon/>
                    <span style={{ fontWeight: "600" }}>Documents : </span></Typography>
                <ul>
                  {propertyData?.data?.property?.docfile?.map((url, index) => (
                    <li key={index}>
                      <a
                      style={{display:"flex"}}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openPdfInNewTab(url);
                        }}
                      >
                        Document {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <NearMeIcon />
              <span style={{ fontWeight: "600" }}>Document No. :</span>
              <span style={{ textTransform: "capitalize", marginLeft: "20px" }}>
                {propertyData?.data?.property?.document_number}
              </span>
            </Typography>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default MorePropertyDetails;
