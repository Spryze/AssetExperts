import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddImage,DeleteImage } from '../../PropertySlice1';
import { useLocation } from 'react-router-dom';


const UploadImages = ({ responseData, propertyData }) => {
  console.log("responseData", responseData);
  console.log("propertyData",propertyData);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [imagePreviews, setImagePreviews] = useState([]);
  const [documentPreviews, setDocumentPreviews] = useState([]);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [selectedDocumentNames, setSelectedDocumentNames] = useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const req_by = user.uid;
  console.log("req_by",req_by)

  useEffect(() => {
    // if (propertyData?.data?.images) {
    //   setexistingImagePreviews(propertyData.data.images);
    // }
    if (propertyData?.data?.docfile) {
      setDocumentPreviews(propertyData.data.docfile);
    }
  }, [propertyData]);

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

  const handleDocumentUpload = async (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        setDocumentPreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleImageSelect = (event, img_id) => {
    if (event.target.checked) {
      setSelectedImageIds((prevIds) => [...prevIds, img_id]);
    } else {
      setSelectedImageIds((prevIds) => prevIds.filter((id) => id !== img_id));
    }
  };

  const handleDocumentSelect = (event, documentName) => {
    if (event.target.checked) {
      setSelectedDocumentNames((prevNames) => [...prevNames, documentName]);
    } else {
      setSelectedDocumentNames((prevNames) => prevNames.filter((name) => name !== documentName));
    }
  };

  const handleDelete = async () => {
    try {
      const data = {
        p_id: propertyData.data?.property?.property_id,
        req_user_id: req_by,
        user_id: propertyData.data?.property?.user_id,
        delete_image_ids: selectedImageIds,
        delete_document_names: selectedDocumentNames
      };
      console.log(data)
      const response =  dispatch(DeleteImage(data));
      console.log("response", response);
      // if (response.meta.requestStatus === "fulfilled") {
      //   navigate(`/property/${responseData.details.p_id}`);
      //   window.location.reload();
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleUpload = async () => {
    try {
      const imageFiles = document.getElementById('imageUpload').files;
      const documentFiles = document.getElementById('documentUpload').files;
      const formData = new FormData();

      for (let i = 0; i < imageFiles.length; i++) {
        formData.append('images', imageFiles[i]);
      }

      for (let i = 0; i < documentFiles.length; i++) {
        formData.append('documents', documentFiles[i]);
      }

      formData.append('p_id', responseData?.details?.p_id || propertyData?.data?.property?.property_id);
      formData.append('req_user_id', responseData?.details?.req_user_id ||req_by);
      formData.append('user_id', responseData?.details?.user_id || propertyData?.data?.property?.user_id);

      console.log(formData);
      dispatch(AddImage(formData)).then((response) => {
        console.log("response", response);
        if (response.meta.requestStatus === "fulfilled") {
          navigate(`/property/${responseData.details.p_id}`);
          window.location.reload();
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{margin:"50px"}}>
      {currentPath === "/UpdateProperty" && (
        <div style={{ backgroundColor: "white" }}>
          <h3 style={{ margin: '20px 0' }}>Delete Existing Property Images and Documents</h3>
          <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }}>
            {propertyData?.data?.images?.map((image, index) => (
              <div key={index} style={{ margin: '5px' }}>
                <input
                  type="checkbox"
                  onChange={(e) => handleImageSelect(e, image.img_id)}
                />
                <img
                  src={image.img_url}
                  alt={`Existing Image ${index}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }}>
            {propertyData?.data?.docfile?.map((document, index) => (
              <div key={index} style={{ margin: '5px' }}>
                <input
                  type="checkbox"
                  onChange={(e) => handleDocumentSelect(e, document.name)}
                />
                <iframe
                  src={document.url}
                  title={`Existing Document ${index}`}
                  style={{ width: '100px', height: '100px', margin: '5px' }}
                />
              </div>
            ))}
          </div>

          <Button

            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      )}

      <div style={{ backgroundColor: "white" }}>
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

        <h3 style={{ margin: '20px 0' }}>Add Property Documents</h3>
        <input id="documentUpload" type="file" multiple onChange={handleDocumentUpload} />
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }}>
          {documentPreviews.map((previewUrl, index) => (
            <iframe
              key={index}
              src={previewUrl}
              title={`Document Preview ${index}`}
              style={{ width: '100px', height: '100px', margin: '5px' }}
            />
          ))}
        </div>

        <Button

          onClick={handleUpload}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default UploadImages;
