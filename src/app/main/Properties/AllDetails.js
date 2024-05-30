import React, { useState } from "react";
import PropertyOverview from "./PropertyOverview";
import MorePropertyDetails from "./property-components/MorePropertyDetails";
import Neighboorhood from "./Neighboorhood";
import Records from "./Records";

const AllDetails = () => {
  return (
    <div>
      <PropertyOverview />
      <MorePropertyDetails />
      <Neighboorhood />
      <Records/>
    </div>
  );
};

export default AllDetails;

