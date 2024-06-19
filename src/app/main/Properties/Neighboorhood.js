import React from 'react';
import { useSelector } from 'react-redux';
import { selectProperties } from './PropertySlice1';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material/';

const Neighborhood = () => {
  const propertyData = useSelector(selectProperties);

  const hasDevelopments = propertyData?.data?.property?.developments && propertyData.data.property.developments.length > 0;

  if (!hasDevelopments) {
    return null; 
  }

  return (
    <div>
      <Card id="neighboorhood" className="card">
        <Typography className='heading-text' variant='h6' sx={{ margin: "25px 0px 0px 25px" }}>
          Around The Property
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {propertyData.data.property.developments.filter(item => item).map((item, index) => (
            <Card key={index} sx={{ margin: "10px" }}>
              <p style={{ margin: "25px", textTransform: "capitalize" }}>
                {item}
              </p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Neighborhood;
