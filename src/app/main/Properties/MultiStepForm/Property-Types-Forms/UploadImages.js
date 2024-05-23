import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddImage } from '../../PropertySlice1';

const UploadImages = ({ responseData }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [floorPlanPreviews, setFloorPlanPreviews] = useState([]);

  const dispatch = useDispatch();

  const handleImageUpload = async (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleFloorPlanUpload = async (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        setFloorPlanPreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const upload = async () => {
    try {
      const imageFiles = document.getElementById('imageUpload').files;
      const floorPlanFiles = document.getElementById('floorPlanUpload').files;
      const formData = new FormData();

      // Add image files to form data with key "images"
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append('images', imageFiles[i]);
      }

      // Add floor plan files to form data with key "images"
      for (let i = 0; i < floorPlanFiles.length; i++) {
        formData.append('images', floorPlanFiles[i]);
      }

      formData.append('p_id', responseData.p_id);
      formData.append('req_user_id', responseData.req_user_id);
      formData.append('user_id', responseData.user_id);


      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      dispatch(AddImage(formData));
      
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3 style={{ margin: '20px 0' }}>Add Property Images</h3>
      <input id="imageUpload" type="file" multiple onChange={handleImageUpload} />
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }}>
        {imagePreviews.map((previewUrl, index) => (
          <img
            key={index}
            src={previewUrl}
            alt={`Image Preview ${index}`}
            style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
          />
        ))}
      </div>

      <h3 style={{ margin: '20px 0' }}>Add Floor Plans</h3>
      <input id="floorPlanUpload" type="file" multiple onChange={handleFloorPlanUpload} />
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }}>
        {floorPlanPreviews.map((previewUrl, index) => (
          <img
            key={index}
            src={previewUrl}
            alt={`Floor Plan Preview ${index}`}
            style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
          />
        ))}
      </div>

      <Button
        sx={{
          padding: '10px 40px',
          backgroundColor: '#FF6600',
          borderRadius: '2px',
          margin: '20px 10px 0',
        }}
        onClick={upload}
      >
        Upload
      </Button>
    </div>
  );
};

export default UploadImages;
