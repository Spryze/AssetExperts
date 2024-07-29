

import React, { useState } from 'react';
import { Paper, Grid, Typography, Button, Box, FormControl, TextField } from '@mui/material/';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import { postSupportCustomer, selectSupportCustomerStatus, selectSupportCustomerError } from '../user/ManageSearchSlice';
import { PostUserCallRequest } from "../Properties/PropertySlice1";
import { useNavigate } from 'react-router-dom';

const SupportCustomer = () => {
  const userContactData = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setSupportFormData] = useState({
    user_name: userContactData.data.displayName,
    email: userContactData.data.email,
    req_query: '',
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setSupportFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    dispatch(PostUserCallRequest(formData));
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Box>
        <Typography variant="h6" component="h3" gutterBottom align="left" sx={{ minWidth: 40, margin: '25px 0.1px' }}>
          Contact US WhatsApp <WhatsAppIcon sx={{ color: '#4ea944', fontSize:40 }} />
        </Typography>
        <Paper elevation={7} style={{ padding: 20, minHeight: 500, width: 900 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                id="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" size="medium" sx={{ width: '100%', minHeight: 150 }}>
                <TextField
                  fullWidth
                  label="Messages"
                  id="req_query"
                  multiline
                  minRows={3}
                  maxRows={10}
                  variant="outlined"
                  value={formData.req_query}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: '8px',
                    padding: '5px 20px',
                    backgroundColor: '#4ea944',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#0d7e00',
                    },
                  }}
                >
                  Submit
                </Button>
                <Button
                  onClick={handleCancel}
                  sx={{
                    borderRadius: '8px',
                    padding: '7px 15px',
                    backgroundColor: '#4ea944',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#0d7e00',
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default SupportCustomer;
