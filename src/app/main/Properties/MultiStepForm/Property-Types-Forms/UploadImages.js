import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UploadImages = ({ property_id }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [floorPlanPreviews, setFloorPlanPreviews] = useState([]);

  const Navigate = useNavigate();

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const imagesFormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      imagesFormData.append('images', files[i]);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleFloorPlanUpload = async (event) => {
    const files = event.target.files;
    const floorPlansFormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      floorPlansFormData.append('floor_plans', files[i]);

      const reader = new FileReader();
      reader.onload = () => {
        setFloorPlanPreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const upload = async () => {
    try {
      // Handle image upload
      const imageFiles = document.getElementById('imageUpload').files;
      const imagesFormData = new FormData();
      for (let i = 0; i < imageFiles.length; i++) {
        imagesFormData.append('images', imageFiles[i]);
      }
      imagesFormData.append('property_id', property_id);

      const imageUploadResponse = await fetch('https://db93a4e7-afba-4acc-8fb6-24c6904c08a7-00-wzqnnh54dv12.sisko.replit.dev/property_image', {
        method: 'POST',
       
        body: imagesFormData,
      });

      if (!imageUploadResponse.ok) {
        throw new Error('Image Upload failed');
      }

      // Handle floor plan upload
      const floorPlanFiles = document.getElementById('floorPlanUpload').files;
      const floorPlansFormData = new FormData();
      for (let i = 0; i < floorPlanFiles.length; i++) {
        floorPlansFormData.append('floor_plans', floorPlanFiles[i]);
      }
      floorPlansFormData.append('property_id', property_id);

      const floorPlanUploadResponse = await fetch('YOUR_FLOOR_PLAN_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: floorPlansFormData,
      });

      if (!floorPlanUploadResponse.ok) {
        console.log('Floor Plan Upload failed');
      }

      window.alert('Upload successful');
      Navigate('/properties');
    } catch (error) {
      console.error('Error uploading files:', error);
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
