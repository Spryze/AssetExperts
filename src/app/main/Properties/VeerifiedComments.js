import React from 'react'
import { selectProperties } from './PropertySlice1'
import { useSelector } from 'react-redux'
import { Card } from '@mui/material'

const VeerifiedComments = () => {
    const PropertyData = useSelector(selectProperties);
    console.log("PropertyData",PropertyData);
  return (
    <div>
<Card>
{
  PropertyData?.data?.property?.Property_Comments?.map((item, index) => (
    <li key={index}>{item}</li>
  ))
}
</Card>
    </div>
  )
}

export default VeerifiedComments;