import React from 'react';
import { useSelector } from 'react-redux';
import { selectProperties } from './PropertySlice1';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

const Amenities = () => {
    const propertyData = useSelector(selectProperties);

    const hasAmenities = propertyData?.properties?.Amenities && propertyData.properties.Amenities.length > 0;

    if (!hasAmenities) {
        return null; // Return null if no amenities are present
    }

    return (
        <>
        <Card >
            <Typography sx={{margin:"30px 0px 0px 30px"}} variant='h6'>Amenities</Typography>
            <div style={{display:"flex", flexWrap:"wrap"}}>
            {propertyData?.properties?.Amenities.slice(0,10).map((item, index) => (
                <span key={index} style={{margin :"30px", width:""}}>
                    <p>{item}</p>
                </span>
            ))}
            </div>
        </Card>
        </>
    );
};

export default Amenities;
