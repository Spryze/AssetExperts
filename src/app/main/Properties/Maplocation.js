import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap,Tooltip } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import { useSelector } from 'react-redux';
import { selectProperties } from './PropertySlice1';
import { useNavigate } from 'react-router-dom';
import './maplocation.css'


function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Maplocation = () => {
  const navigate = useNavigate() 
  const propertyData = useSelector(selectProperties);
  const initialLongitude = propertyData?.data?.property?.longitude || 0;
  const initialLatitude = propertyData?.data?.property?.latitude || 0;
  
  const [recomendedprop, setRecomendedprop] = useState([]);
  const [longitude, setLongitude] = useState(initialLongitude);
  const [latitude, setLatitude] = useState(initialLatitude);

  const markerIcon = new Icon({
    iconUrl: 'assets/images/Location/location-red.png',
    iconSize: [35, 45],
  });
  const recomendedmarkerIcon = new Icon({
    iconUrl: 'assets/images/Location/recomended.png',
    iconSize: [35, 45],
  });
  const handlePopupclick = (property_id)=>{
    const url = `/property/${property_id}`;
    window.open(url, '_blank');
    console.log(property_id)
  }

  useEffect(() => {
    setLongitude(propertyData?.data?.property?.longitude ?? 0);
    setLatitude(propertyData?.data?.property?.latitude ?? 0);
    setRecomendedprop(propertyData?.recomended_prop || []);
    
    
  }, [propertyData]);
  

  const filteredRecommendedProps = recomendedprop.filter(item => item.latitude !== 0 && item.longitude !== 0);


  return (
  
    
      <MapContainer center={[latitude, longitude]} zoom={8} style={{ height: '400px', width: '100%', marginTop:"20px" }}>
      <ChangeView center={[latitude, longitude]} zoom={13} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Main property marker */}
        <Marker position={[latitude, longitude]} icon={markerIcon}>
          {/* <Popup>
            {propertyData?.data?.property?.area}
            {[latitude, longitude]}
          </Popup> */}
          {/* <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>{propertyData.price}</Tooltip> */}
        </Marker>

        {/* Render filtered markers for recommended properties */}
        {filteredRecommendedProps.map((item, index) => (
          // console.log(item);
          <Marker key={index} position={[item.latitude, item.longitude]} icon={recomendedmarkerIcon}>
            
            <Popup >
              <div style={{cursor:"pointer"}} onClick={()=>{handlePopupclick(item.property_id)}}>
                <img src={item.prop_image} style={{height:"250px",width:"auto"}}/>
              <h4><span style={{fontWeight:"bold", color:"#0090DA"}}>Property Location: </span>{item.landmark}, {item.district}</h4>
              <h4><span style={{fontWeight:"bold", color:"#0090DA"}}>Property Area: </span>{item.area} {item.unit}s</h4>
              </div>
            </Popup>
            <Tooltip  direction="right" offset={[0, 0]} opacity={1} permanent className={item.listing_type} >{"  ₹" + item.unit_price + "/" + item.unit}</Tooltip>
          </Marker>
        ))}
      </MapContainer>

  );
}

export default Maplocation;
