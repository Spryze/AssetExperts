import React from 'react'
import { useSelector } from 'react-redux';
import { selectProperties } from '../PropertySlice1';
import { Card,Typography } from '@mui/material'

const MorePropertyDetails = () => {
  const propertyData = useSelector(selectProperties);


  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
   <>
   <Card id="PropertyDetails" className="card" sx={{borderRadius:"10px",padding:"30px", display:"flex", flexDirection:"column",margin:"20px 0px"}} >
    <Typography variant='h6'>
        Property Details
    </Typography> 
    <hr/>
    <div style={{display:"flex"}}>
    <div style={{display:"flex", flexDirection:"column", margin:"0px 20px"}}>
    <Typography variant='p'sx={{margin:"10px 0", fontSize:"15px"}}>
    Price per {propertyData?.data?.property?.unit}
    </Typography>
    {/* <Typography variant='p'sx={{margin:"10px 0", fontSize:"15px"}}>
    General Price 
    </Typography> */}
    {/* <Typography variant='p'sx={{margin:"10px 0", fontSize:"15px"}}>
   EMI Price 
    </Typography> */}
    {/* <Typography variant='p'sx={{margin:"10px 0", fontSize:"15px"}}>
   Furnished/Unfurnished 
    </Typography>
    <Typography variant='p'sx={{margin:"10px 0", fontSize:"15px"}}>
    Power Back Up 
    </Typography> */}
    <Typography variant='p'sx={{margin:"10px 0", fontSize:"15px"}}>
    Facing 
    </Typography>
    {/* <Typography variant='p'sx={{margin:"10px 0", fontSize:"15px"}}>
    Landmark 
    </Typography> */}
    {/* <Typography variant='p'sx={{margin:"10px 0", fontSize:"15px"}}>
    Property Developer 
    </Typography> */}
    <Typography variant='p'sx={{margin:"10px 0", fontSize:"15px"}}>
    Address 
    </Typography>
    </div>
    <div style={{display:"flex", flexDirection:"column", fontWeight:"500",}}>
        <Typography variant='p' sx={{margin:"10px 0", fontSize:"15px"}}>:<span style={{marginLeft:"20px"}}> ₹ {propertyData?.data?.property?.price}</span></Typography>
        {/* <Typography variant='p' sx={{margin:"10px 0", fontSize:"15px"}}>:<span> {propertyData?.properties?.price}</span></Typography> */}
        {/* <Typography variant='p' sx={{margin:"10px 0", fontSize:"15px"}}>:<span> {propertyData?.properties?.emiprice}</span></Typography> */}
        {/* <Typography variant='p' sx={{margin:"10px 0", fontSize:"15px"}}>:<span style={{marginLeft:"20px"}}> {propertyData?.properties?.Furnishing}</span></Typography> */}
        {/* <Typography variant='p' sx={{margin:"10px 0", fontSize:"15px"}}>:<span style={{marginLeft:"20px"}}> {propertyData?.properties?.PowerBackUp}</span></Typography>/ */}
        <Typography variant='p' sx={{margin:"10px 0", fontSize:"15px"}}>:<span style={{textTransform:"capitalize",marginLeft:"20px"}}> {propertyData?.data?.property?.direction}</span></Typography>
        {/* <Typography variant='p' sx={{margin:"10px 0", fontSize:"15px"}}>:<span style={{textTransform:"capitalize",marginLeft:"20px"}}> {propertyData?.data?.property?.landmark}</span></Typography> */}
        {/* <Typography variant='p' sx={{margin:"10px 0", fontSize:"15px"}}>:<span> {propertyData?.properties?.propertyDeveloper}</span></Typography> */}
        <Typography variant='p' sx={{ margin: "10px 0", fontSize: "15px", textTransform:"capitalize", }}>: <span style={{marginLeft:"20px"}}>
    {`${propertyData?.data?.property?.village}, ${propertyData?.data?.property?.district}, ${propertyData?.data?.property?.state}`}
  </span>
</Typography>

       
        

    </div>
    </div>

   </Card>
   </>
  )
}

export default MorePropertyDetails