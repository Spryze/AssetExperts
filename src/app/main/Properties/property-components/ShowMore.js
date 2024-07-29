import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPropertyDetails, selectProperties } from 'app/store/propertySlice';
// import CloseIcon from '@mui/icons-material/Close';
import './ShowMore.css'; // Import your CSS file

const ShowMore = (props) => {
  // State variables
  const [images, setImages] = useState([]);
  
  // Redux state and dispatch
  const properties = useSelector(selectProperties);
  const dispatch = useDispatch();
  
  // Fetch properties and set images on mount and update
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const params = {};
        await dispatch(getProperties(params));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [dispatch]);

  useEffect(() => {
    setImages(properties?.images || []);
  }, [properties]);

  return (
    <div className="showmore-container">
      {/* Close button */}
      {/* <CloseIcon sx={{ float: "right", cursor: "pointer" }} onClick={() => props.setShowMoreVisible(false)} /> */}
      
      {/* Slideshow */}
      <Slide autoplay={true} duration={2000}>
        {images.map((imagePath, index) => (
          <div key={index} className="each-slide">
            <img src={imagePath} alt={`Image ${index}`} style={{ height: "auto", width: "100%" }} />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ShowMore;
