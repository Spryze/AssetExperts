import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Paper, Typography, Grid, CircularProgress, Alert,Tab,Box } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { getUserProfileOnSearch, selectSearchUserResults, selectUserProfile } from './ManageSearchSlice';

const UserProfileData = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { data: userData, loading, error } = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);
  let userDataFromState = useSelector(selectUserProfile);
  const userResults =  useSelector(selectSearchUserResults);
  const [isUserDataFound, setUserDataFound] = useState(false);
  const [localError, setLocalError] = useState(null);
  let userDataTemp;
  const [userData, setUserData] = useState(null);
  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect( () => {

    if (isUserDataFound)
      {
        console.log('user data found set')
        setUserData(userDataTemp);
      }
      else {
        setUserData(userDataFromState);
      }
  },[userDataFromState, isUserDataFound]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setLocalError("User not found in local storage");
      return;
    }


    const req_user_id = user.uid;
    if (!userId) {
      setLocalError("User ID not found in URL parameters");
      return;
    }
    userDataTemp = userResults.find(user => (user.id === userId) || (user.id === String(userId)));
    if (!userDataTemp)
      {
        dispatch(getUserProfileOnSearch({ user_id: userId, req_user_id })).then((result)=> {
          setLoading(false);
        });
        setLoading(true);
      }
      else {
        console.log('user data found ', userDataTemp)
        
        // setUserDataFound(true);
        setUserData(userDataTemp);
      }
      
  }, [userId, dispatch]);
  
console.log('userData ', userData);
console.log('userDataTemp ', userDataTemp);
  
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }


  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', height: '45px' }}>
        <Toolbar>
          <Button
            onClick={handleBackClick}
            sx={{
              color: 'black',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '16px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '8px' }}>{'<-'}</span>
            Back to previous page
          </Button>
        </Toolbar>
      </AppBar>


      <Box sx={{ maxWidth: { xs: 320, sm: 1120 }, bgcolor: 'background.paper',height:"2px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 40 },
          },
        }}
      >
        <Tab label="User Details" sx={{minWidth: 120,margin:'0 20px'}}/>
        <Tab label="Properties"sx={{minWidth: 120,margin:'0 20px'}} />
        <Tab label="Item Three"sx={{minWidth: 120,margin:'0 20px'}} />
        <Tab label="Item Four" sx={{minWidth: 120,margin:'0 20px'}}/>
        <Tab label="Item Five" sx={{minWidth: 120,margin:'0 20px'}}/>
        <Tab label="Other" sx={{minWidth: 120,margin:'0 20px'}}/>
        <Tab label="Payment " sx={{minWidth: 120,margin:'0 20px'}}/>
        <Tab label="Comments" sx={{minWidth: 120,margin:'0 20px'}}/>
      </Tabs>
    </Box>
    

      <Container maxWidth="lg" style={{ marginTop: '65px' }}>
      {value === 1 && (
            <div>
             <Paper elevation={7} style={{ padding: 20, minHeight: 600 }}>
          <Typography variant="h6" component="h3" gutterBottom align="left" sx={{minWidth: 0,margin:'25px 0.1px'}}>
          Property Details
          </Typography>
          <Grid container spacing={12}>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Listing Type: </strong>{userData?.id || ''}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Property Id: </strong>{userData?.name || ''}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Property Type: </strong>{userData?.email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>User ID: </strong>{userData?.address}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Area: </strong>{userData?.ph_num_1}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Unit: </strong>{userData?.ph_num_2}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Price: </strong>{userData?.comments}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>State: </strong>{userData?.requirements}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>District: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Village: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Landmark: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Ad_info: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Developments: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Mediator Name: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Mediator Number 1 : </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Mediator Number 2 : </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Owner Name: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Owner Number 1 : </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Owner Number 2 : </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Owner Name: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Owner Name: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Owner Name: </strong>{userData?.role}</Typography>
            </Grid>
            
          </Grid>
        </Paper>
            </div>
          )}
      {value === 0 && (
        <div>
        <Paper elevation={7} style={{ padding: 20, minHeight: 600 }}>
          <Typography variant="h6" component="h3" gutterBottom align="left" sx={{minWidth: 0,margin:'25px 0.1px'}}>
            User Profile Details
          </Typography>
          <Grid container spacing={12}>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>ID: </strong>{userData?.id || ''}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Name: </strong>{userData?.name || ''}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Email: </strong>{userData?.email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Address: </strong>{userData?.address}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Phone Number 1: </strong>{userData?.ph_num_1}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Phone Number 2: </strong>{userData?.ph_num_2}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Comments: </strong>{userData?.comments}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Requirements: </strong>{userData?.requirements}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Role: </strong>{userData?.role}</Typography>
            </Grid>
            
          </Grid>
        </Paper>
        </div>
         )}

     {value === 3 && (
        <div>
        <Paper elevation={7} style={{ padding: 20, minHeight: 600 }}>
          <Typography variant="h6" component="h3" gutterBottom align="left" sx={{minWidth: 0,margin:'25px 0.1px'}}>
            User Profile Details
          </Typography>
          <Grid container spacing={6.5}>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>ID: </strong>{userData?.id || ''}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Name: </strong>{userData?.name || ''}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Email: </strong>{userData?.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Address: </strong>{userData?.address}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Phone Number 1: </strong>{userData?.ph_num_1}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Phone Number 2: </strong>{userData?.ph_num_2}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Comments: </strong>{userData?.comments}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Requirements: </strong>{userData?.requirements}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Role: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Profession: </strong>{userData?.profession}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Active Notifications: </strong>{userData?.active_notifications}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Updated On: </strong>{userData?.updated_on}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Created On: </strong>{userData?.created_on}</Typography>
            </Grid>
          </Grid>
        </Paper>
        </div>
         )}
     {value === 4 && (
        <div>
        <Paper elevation={7} style={{ padding: 20, minHeight: 600 }}>
          <Typography variant="h6" component="h3" gutterBottom align="left" sx={{minWidth: 0,margin:'25px 0.1px'}}>
            User Profile Details
          </Typography>
          <Grid container spacing={6.5}>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>ID: </strong>{userData?.id || ''}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Name: </strong>{userData?.name || ''}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Email: </strong>{userData?.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Address: </strong>{userData?.address}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Phone Number 1: </strong>{userData?.ph_num_1}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Phone Number 2: </strong>{userData?.ph_num_2}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Comments: </strong>{userData?.comments}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Requirements: </strong>{userData?.requirements}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Role: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Profession: </strong>{userData?.profession}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Active Notifications: </strong>{userData?.active_notifications}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Updated On: </strong>{userData?.updated_on}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Created On: </strong>{userData?.created_on}</Typography>
            </Grid>
          </Grid>
        </Paper>
        </div>
         )}
     {value === 5 && (
        <div>
        <Paper elevation={5} style={{ padding: 20, minHeight: 600 }}>
          <Typography variant="h6" component="h3" gutterBottom align="left" sx={{minWidth: 0,margin:'25px 0.1px'}}>
            Other Details
          </Typography>
          <Grid container spacing={6.5}>
            <Grid item xs={8}>
              <Typography variant="body1"><strong>ID: </strong>{userData?.id || ''}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1"><strong>Name: </strong>{userData?.name || ''}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Email: </strong>{userData?.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Address: </strong>{userData?.address}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Phone Number 1: </strong>{userData?.ph_num_1}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1"><strong>Phone Number 2: </strong>{userData?.ph_num_2}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1"><strong>Comments: </strong>{userData?.comments}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1"><strong>Requirements: </strong>{userData?.requirements}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Role: </strong>{userData?.role}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1"><strong>Profession: </strong>{userData?.profession}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Active Notifications: </strong>{userData?.active_notifications}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Updated On: </strong>{userData?.updated_on}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1"><strong>Created On: </strong>{userData?.created_on}</Typography>
            </Grid>
          </Grid>
        </Paper>
        </div>
         )}
     {value === 6 && (
        <div>
        <Paper elevation={7} style={{ padding: 20, minHeight: 600 }}>
          <Typography variant="h6" component="h3" gutterBottom align="left" sx={{minWidth: 0,margin:'25px 0.1px'}}>
           Payment Details
          </Typography>
          <Grid container spacing={6.5}>
            <Grid item xs={12}>
              <Typography variant="body1"><strong> User ID: </strong>{userData?.id || ''}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Payment ID: </strong>{userData?.name || ''}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Transaction ID: </strong>{userData?.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Plan Type: </strong>{userData?.address}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Transaction Status: </strong>{userData?.ph_num_1}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Paid Details: </strong>{userData?.ph_num_2}</Typography>
            </Grid>
            
          </Grid>
        </Paper>
        </div>
         )}
     {value === 7 && (
        <div>
        <Paper elevation={7} style={{ padding: 20, minHeight: 600 }}>
          <Typography variant="h6" component="h3" gutterBottom align="left" sx={{minWidth: 0,margin:'25px 0.1px'}}>
            Comments
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Requirements: </strong>{userData?.id || ''}</Typography>
             
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"> <strong>Name: </strong>{userData?.name || ''}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Email: </strong>{userData?.email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Profile Verification: </strong>{userData?.address}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Total Assets Value: </strong>{userData?.address}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Comments On Assets: </strong>{userData?.address}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Status: </strong>{userData?.ph_num_1}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Current Plan Start: </strong>{userData?.ph_num_2}</Typography>
            </Grid>
           
            <Grid item xs={4}>
              <Typography variant="body1"><strong>Current Plan End: </strong>{userData?.payments}</Typography>
            </Grid>
           
          </Grid>
          <Grid item xs={4}>
          <Box
      sx={{
        width: 700,
        maxWidth: '200%',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"30vh",
        minWidth: 120,
        margin:'0 135px'
      }}
   
    >
      <TextField fullWidth label="fullWidth" id="fullWidth" />
      
      
    </Box>
          <Box
      sx={{
        width: 700,
        maxWidth: '200%',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"5vh",
        minWidth: 120,
        margin:'0 135px'
      }}
   
    >
      <TextField fullWidth label="fullWidth" id="fullWidth" />
      
      
    </Box>
          <Box
      sx={{
        width: 700,
        maxWidth: '200%',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"5vh",
        minWidth: 120,
        margin:'0 135px'
      }}
   
    >
      <TextField fullWidth label="fullWidth" id="fullWidth" />
      
      
    </Box>
          <Box
      sx={{
        width: 700,
        maxWidth: '200%',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"5vh",
        minWidth: 120,
        margin:'0 135px'
      }}
   
    >
      <TextField fullWidth label="fullWidth" id="fullWidth" />
      
      
    </Box>
          <Box
      sx={{
        width: 700,
        maxWidth: '200%',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"5vh",
        minWidth: 120,
        margin:'0 135px'
      }}
   
    >
      <TextField fullWidth label="fullWidth" id="fullWidth" />
      
      
    </Box>
    </Grid>
        </Paper>
        </div>
         )}
        
        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
          <Button
            sx={{
              backgroundColor: '#FFA500',
              color: 'white',
              width: '200px',
              height: '50px',
              '&:hover': {
                backgroundColor: '#05092e',
              },
            }}
          >
            Edit
          </Button>
        </div> */}
      </Container>
      
    </div>
  );
};

export default UserProfileData;
