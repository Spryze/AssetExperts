import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Link,
  CardContent,
  Container,
  Paper,
  Typography,
  Card,
  Grid,
  CircularProgress,
  Alert,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DefaultImg from 'src/assets/Default/DegaultImg.gif';
import {
  getUserProfileOnSearch,
  selectSearchUserResults,
  selectUserProfile,
} from './ManageSearchSlice';
import Property from '../Properties/Property';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MySubscriptions from '../Properties/Pages/MySubscriptions';
import {
  AddIntrests,
  selectManageUserSubscription,
  selectManageUserpaymentDetails,
  postPaymentDetailsAdd,
  putPaymentDetailsUpdate,
} from '../Properties/PropertySlice1';

// import { useNavigate } from 'react-router-dom';

const UserProfileData = ({ isAdmin }) => {
  const { userId } = useParams();
  // const { req_user_id } = useParams();
  const navigate = useNavigate();
  const userPaymentAddUpdate = useSelector(selectManageUserpaymentDetails);
  console.log('userPaymentAddUpdate user details:', userPaymentAddUpdate);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const usersSearchResult = useSelector(selectUserProfile);
  console.log('usersSearchResult', usersSearchResult);
  const userResults = useSelector(selectSearchUserResults);
  // const usersSearchResult = useSelector(selectUserProfile);
  const [isUserDataFound, setUserDataFound] = useState(false);
  const [localError, setLocalError] = useState(null);
  let userDataTemp;
  const [userData, setUserData] = useState(null);
  // const [userData, setUserData] = useState();
  console.log('userData check', userData);
  const [value, setValue] = useState(0);
  const [change, setChange] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = Array.isArray(usersSearchResult) ? usersSearchResult : [];

  const manageUserSubscription = useSelector(selectManageUserSubscription);
  const [role, setRole] = useState('');
  const [planType, setPlanType] = useState('');
  const [comments, setComments] = useState('');
  const [PaymentStatus, setPaymentStatus] = useState('');
  const [OrderId, setOrderIdStatus] = useState('');
  // const [subscriptionPlanType, setSubscriptionPlanType] = useState('');
  const [showPayments, setShowPayments] = useState([]);
  const [commentformData, setCommentFormData] = useState({
    subscription_plan_type: '',
    v_comments: '',
    role: '',
    payment_status: '',
  });

  const Tabels = [
    { id: 'transaction_id', label: 'Transaction ID', minWidth: 170, align: 'center' },
    { id: 'order_id', label: 'Order ID', minWidth: 100, align: 'center' },
    { id: 'subscription_plan_type', label: 'Plan Type', minWidth: 170, align: 'center' },
    { id: 'payment_status', label: 'Payment Status', minWidth: 170, align: 'center' },
    { id: 'payment_gateway', label: ' Payment GateWay', minWidth: 170, align: 'center' },
    { id: 'payment_date', label: ' Payment Date', minWidth: 170, align: 'center' },
    { id: 'comments', label: ' comments', minWidth: 170, align: 'center' },
  ];
  const handlePropertyClick = (propertyId) => {
    console.log('so see the what is inside of the propertyId:', propertyId);
    const newWindow = window.open(`/property/${propertyId}`, '_blank');
    if (newWindow) {
      newWindow.focus();
    } else {
      console.error('Unable to open new window/tab');
    }
  };

  const PropertyColumns = [
    {
      id: 'property_id',
      label: 'Property ID',
      minWidth: 100,
      align: 'center',
      render: (item) => (
        <Button
          component={Link}
          // style={{ color: "blue", textDecoration: "underline", background: "none" }}
          to={`/property/${item.property_id}`}
          rel="noopener noreferrer"
          onClick={() => handlePropertyClick(item.property_id)}
        >
          {item.property_id}
        </Button>
      ),
    },
    { id: 'user_id', label: 'User ID', minWidth: 100, align: 'center' },
    { id: 'listing_type', label: 'Listing Type', minWidth: 100, align: 'center' },
    { id: 'p_type', label: 'Property Type', minWidth: 100, align: 'center' },
    { id: 'area', label: 'Area', minWidth: 100, align: 'center' },
    { id: 'unit', label: 'Unit', minWidth: 100, align: 'center' },
    { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
    { id: 'dimensions', label: 'Dimensions', minWidth: 100, align: 'center' },
    { id: 'direction', label: 'Direction', minWidth: 100, align: 'center' },
    { id: 'est_year', label: 'Est. Year', minWidth: 100, align: 'center' },
    { id: 'latitude', label: 'Latitude', minWidth: 100, align: 'center' },
    { id: 'longitude', label: 'Longitude', minWidth: 100, align: 'center' },
    { id: 'state', label: 'State', minWidth: 100, align: 'center' },
    { id: 'district', label: 'District', minWidth: 100, align: 'center' },
    { id: 'village', label: 'Village', minWidth: 100, align: 'center' },
    { id: 'landmark', label: 'Landmark', minWidth: 100, align: 'center' },
    { id: 'ad_info', label: 'Ad Info', minWidth: 100, align: 'center' },
    { id: 'developments', label: 'Developments', minWidth: 100, align: 'center' },
    { id: 'med_name', label: 'Mediator Name', minWidth: 100, align: 'center' },
    { id: 'med_num1', label: 'Mediator Number 1', minWidth: 100, align: 'center' },
    { id: 'med_num2', label: 'Mediator Number 2', minWidth: 100, align: 'center' },
    { id: 'own_name', label: 'Owner Name', minWidth: 100, align: 'center' },
    { id: 'own_num1', label: 'Owner Number 1', minWidth: 100, align: 'center' },
    { id: 'own_num2', label: 'Owner Number 2', minWidth: 100, align: 'center' },
    { id: 'docfile', label: 'Document File', minWidth: 100, align: 'center' },
    { id: 'rera_status', label: 'RERA Status', minWidth: 100, align: 'center' },
    { id: 'lift', label: 'Lift', minWidth: 100, align: 'center' },
    { id: 'furnished', label: 'Furnished', minWidth: 100, align: 'center' },
    { id: 'bound_wall', label: 'Boundary Wall', minWidth: 100, align: 'center' },
    { id: 'num_open_sides', label: 'Number of Open Sides', minWidth: 100, align: 'center' },
    { id: 'loan_eligible', label: 'Loan Eligible', minWidth: 100, align: 'center' },
    { id: 'approved_by', label: 'Approved By', minWidth: 100, align: 'center' },
    { id: 'survey_number', label: 'Survey Number', minWidth: 100, align: 'center' },
    { id: 'document_number', label: 'Document Number', minWidth: 100, align: 'center' },
    { id: 'disputes', label: 'Disputes', minWidth: 100, align: 'center' },
    { id: 'property_name', label: 'Property Name', minWidth: 100, align: 'center' },
    { id: 'government_price', label: 'Government Price', minWidth: 100, align: 'center' },
    { id: 'register_location', label: 'Register Location', minWidth: 100, align: 'center' },
    { id: 'parking', label: 'Parking', minWidth: 100, align: 'center' },
    { id: 'p_created_on', label: 'Created On', minWidth: 100, align: 'center' },
    { id: 'p_updated_on', label: 'Updated On', minWidth: 100, align: 'center' },
    { id: 'updated_by', label: 'Updated By', minWidth: 100, align: 'center' },
    { id: 'property_status', label: 'Property Status', minWidth: 100, align: 'center' },
    { id: 'verification_status', label: 'Verification', minWidth: 100, align: 'center' },
    { id: 'verifier_comments', label: 'VerifierComments', minWidth: 100, align: 'center' },
    { id: 'is_property_notified', label: 'PropertyNotified', minWidth: 100, align: 'center' },
  ];

  // useEffect(() => {
  //   if (usersSearchResult && userId) {
  //     setLoading(true);
  //     setUserData(usersSearchResult.profile);
  //     setRole(usersSearchResult.profile?.role || 'woring');
  //     setPlanType(usersSearchResult.payments?.[0]?.subscription_plan_type || 'wrowong');
  //     setPaymentStatus(usersSearchResult.payments?.[0]?.Payment_status || 'wrowing');
  //     setComments(usersSearchResult.profile?.comments || 'wrowing');
  //     setLoading(false);
  //   }
  // }, [usersSearchResult, userId]);
  // console.log("this is the data from new use effect  :",usersSearchResult);
  // console.log("this is the data from new userId :",userId);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handlePlanTypeChange = (event) => {
    setPlanType(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handlePaidTypeChange = (event) => {
    setPaymentStatus(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log('usersSearchResult above profile', usersSearchResult);

  const { profile = {}, properties = [], interested_areas = [], payments = [] } = usersSearchResult;
  console.log('profile', profile);

  // Combine initial and updated payment details
  //  const combinedPayments = [...payments, ...userPaymentAddUpdate];

  // useEffect(() => {
  //     if (paymentDetailsFromState && paymentDetailsFromState.userId === userId) {
  //         setCombinedPayments(paymentDetailsFromState.combinedPayments);
  //     }
  // }, [paymentDetailsFromState, userId]);
  // useEffect(() => {
  //   setCombinedPayments([...payments, ...userPaymentAddUpdate]);
  // }, [payments, userPaymentAddUpdate]);

  useEffect(() => {
    if (usersSearchResult && userId) {
      setLoading(true);
      setUserData(usersSearchResult.profile);
      setPlanType(usersSearchResult.payments?.[0]?.subscription_plan_type || '');
      setPaymentStatus(usersSearchResult.payments?.[0]?.payment_status || '');
      setOrderIdStatus(usersSearchResult.payments?.[0]?.order_id || '');

      setLoading(false);
    }
  }, [usersSearchResult, userId]);
  console.log('userData after profile ', userData);
  console.log('tjhis was the usersSearchResult', usersSearchResult);

  // useEffect( () => {

  //   if (isUserDataFound)
  //     {
  //       console.log('user data found set')
  //       setUserData(usersSearchResult);
  //     }
  //     else {
  //       setUserData(userDataTemp);
  //     }
  // },[ isUserDataFound]);
  // console.log({userDataTemp},{usersSearchResult})

  useEffect(() => {
    if (usersSearchResult && usersSearchResult.id === userId) {
      setUserData(usersSearchResult);
    }
  }, [usersSearchResult, userId]);

  // useEffect(()=>{
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const req_user_id = user.uid;
  //   dispatch(getUserProfileOnSearch({ user_id: userId, req_user_id })).then((response)=>{console.log(response)});
  // })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const req_user_id = user?.uid;

    if (req_user_id) {
      dispatch(getUserProfileOnSearch({ user_id: userId, req_user_id })).then((response) => {
        console.log(response);
      });
    }
  }, [userId, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setUserData(null); // Clear userData when userId changes

      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setLocalError('User not found in local storage');
        setLoading(false);
        return;
      }

      const req_user_id = user.uid;
      if (!userId) {
        setLocalError('User ID not found in URL parameters');
        return;
      }
      const userDataTemp = userResults.find(
        (user) => user.id === userId || user.id === String(userId)
      );
      if (!userDataTemp) {
        setLoading(true);
        await dispatch(getUserProfileOnSearch({ user_id: userId, req_user_id })).then(
          (response) => {
            console.log(response);
          }
        );
        setLoading(false);
      } else {
        console.log('user data found ', userDataTemp);
        setUserData(userDataTemp);
      }
    };
    setUserData(null);
    setLoading(true);
    fetchData().then(() => setLoading(false));
  }, [userId, dispatch, userResults]);

  console.log('userData this is issue of the code data  ', userData);
  console.log('userDataTemp ', userDataTemp);

  const handleBackClick = () => {
    navigate(-1);
  };

  /* This is Handle ADD Payment Details Function */
  const handleAdd = () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const req_user_id = user?.uid;

    const AddData = {
      user_id: userId,
      req_user_id,

      payment_status: PaymentStatus,
      subscription_plan_type: planType,
    };
    dispatch(postPaymentDetailsAdd(AddData));
    setLoading(false);
  };

  const handleUpdatePaymentDetails = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const req_user_id = user?.uid;

    const UpdatePaymentDetailsData = {
      user_id: userId,
      req_user_id,
      payment_status: PaymentStatus,
      subscription_plan_type: planType,
      order_id: OrderId,
    };
    dispatch(putPaymentDetailsUpdate(UpdatePaymentDetailsData)).then(() => {
      setLoading(false);
    });
    setLoading(true);
  };
  /* this is the my functions on the code snippit*/

  useEffect(() => {
    setCombinedPayments([...payments, ...userPaymentAddUpdate]);
  }, [payments, userPaymentAddUpdate]);

  const handleSaveChanges =  () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const req_user_id = user?.uid;

    const updatedData = {
      user_id: userId,
      req_user_id,
      role,
      planType,

      comments,
    };

    try {
      dispatch(getUserProfileOnSearch({ user_id: userId, req_user_id, updatedData }));
      // await dispatch(AddIntrests({ body: updatedData, user_id: userId, isadmin: isAdmin, req_user_id }));
      // Instead of full reload, refresh the local data and reset the loading state
      // dispatch(getUserProfileOnSearch({ user_id: userId, req_user_id })).then((response) => {
      //   console.log(response);
      //   setLoading(false);
      // });
    } catch (error) {
      console.error('Failed to save changes:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </div>
    );
  }
  // const subscriptions = userId === localStorage.getItem("user_id") ? mySubscription : manageUserSubscription;

  console.log('user id isadmin', userId, isAdmin);
  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', height: '45px' }}>
        <Toolbar>
          <Button
            onClick={handleBackClick}
            sx={{
              color: 'red',
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

      <Box sx={{ maxWidth: { xs: 320, sm: 1120 }, bgcolor: 'background.paper', height: '2px' }}>
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
          <Tab label="User Details" sx={{ minWidth: 120, margin: '0 20px' }} />
          <Tab label="Properties" sx={{ minWidth: 120, margin: '0 20px' }} />
          <Tab label="Intersted Areas" sx={{ minWidth: 120, margin: '0 20px' }} />
          <Tab label="Payment Details" sx={{ minWidth: 120, margin: '0 20px' }} />
          {/* <Tab label="Profile Update" sx={{minWidth: 120,margin:'0 20px'}}/> */}
          <Tab label="Profile Update" sx={{ minWidth: 120, margin: '0 20px' }} />
          <Tab label="Payment " sx={{ minWidth: 120, margin: '0 20px' }} />
          <Tab label="Profile Update" sx={{ minWidth: 120, margin: '0 20px' }} />
        </Tabs>
      </Box>

      <Container maxWidth="lg" style={{ marginTop: '65px' }}>
        {value === 1 && (
          <div>
            {/* <Paper elevation={12} style={{ padding: 50, minHeight: 1000 }}> */}
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              align="left"
              sx={{ minWidth: 0, margin: '25px 0.1px' }}
            >
              Property Details
            </Typography>

            {console.log('properties Data :', properties)}
            {properties && properties.length > 0 ? (
              <>
                {/* <Property/> */}
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {PropertyColumns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {properties.map((row, index) => (
                          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {PropertyColumns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.render ? column.render(row) : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </>
            ) : (
              <Typography variant="body1">No properties available</Typography>
            )}
            {/* </Paper> */}
          </div>
        )}
        {value === 0 && (
          <div>
            <Paper elevation={7} style={{ padding: 20, minHeight: 600 }}>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                align="left"
                sx={{ minWidth: 0, margin: '25px 0.1px' }}
              >
                User Profile Details
              </Typography>
              <Grid container spacing={12}>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>ID: </strong>
                    {userId}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Name: </strong>
                    {profile?.name || ''}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Email: </strong>
                    {profile?.email}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Address: </strong>
                    {profile?.address}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Phone Number 1: </strong>
                    {profile?.phone_num_1}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Phone Number 2: </strong>
                    {profile?.phone_num_2}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Comments: </strong>
                    {profile?.comments}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Requirements: </strong>
                    {profile?.requirements}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Role: </strong>
                    {profile?.role}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Notifications: </strong>
                    {profile?.active_notifications}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </div>
        )}

        {/* {value === 3 && (
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
              <Typography variant="body1"><strong>Updated On: </strong>{userData?.parking}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Created On: </strong>{userData?.Payment_status}</Typography>
            </Grid>
          </Grid>
        </Paper>
        </div>
         )} */}

        {value === 2 && (
          <div>
            <Paper elevation={7} style={{ padding: 20, minHeight: 600 }}>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                align="left"
                sx={{ minWidth: 0, margin: '25px 0.1px' }}
              >
                Intersted Areas
              </Typography>
              <MySubscriptions
                userid={userId}
                isAdmin={isAdmin}
                subscriptions={manageUserSubscription}
              />
            </Paper>
          </div>
        )}
        {/* {value === 3 && (
        <div>
        <Paper elevation={5} style={{ padding: 20, minHeight: 600 }}>
          <Typography variant="h6" component="h3" gutterBottom align="left" sx={{minWidth: 0,margin:'25px 0.1px'}}>
            Profile Update data state
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
         )} */}
        {value === 3 && (
          <div>
            <Paper elevation={7} style={{ padding: 20, minHeight: 600 }}>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                align="left"
                sx={{ minWidth: 0, margin: '25px 0.1px' }}
              >
                Payment Details
              </Typography>
              <Button
                onClick={handleAdd}
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
                Add
              </Button>
              <Button
                onClick={handleUpdatePaymentDetails}
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
                Update
              </Button>
              {combinedPayments && combinedPayments.length > 0 ? (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {Tabels.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {combinedPayments
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                {Tabels.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      {value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              ) : (
                <Typography variant="body1" align="center" mt={2}>
                  No payment data found
                </Typography>
              )}
            </Paper>
          </div>
        )}

        {value === 5 && (
          <div>
            <Paper elevation={7} style={{ padding: 20, minHeight: 600 }}>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                align="left"
                sx={{ minWidth: 0, margin: '25px 0.1px' }}
              >
                Profile Update
              </Typography>
              <Grid container spacing={6}>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Requirements: </strong>
                    {userData?.id || ''}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    {' '}
                    <strong>Name: </strong>
                    {userData?.name || ''}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Email: </strong>
                    {userData?.email}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Profile Verification: </strong>
                    {userData?.address}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Total Assets Value: </strong>
                    {userData?.address}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Comments On Assets: </strong>
                    {payments.length > 0 ? payments[0].Payment_status : 'Null'}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Role: </strong>
                    {profile?.role}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Plan Type: </strong>
                    {payments.length > 0 ? payments[0].subscription_plan_type : 'No Plan Type'}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Current Plan End: </strong>
                    {profile?.comments}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth margin="normal" size="medium">
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      label="Role"
                      // defaultValue={userData.role}
                      onChange={handleRoleChange}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="staff">Staff</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth margin="normal" size="medium">
                    <InputLabel id="demo-simple-select-label">PlanType</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="subscription_plan_type"
                      value={planType}
                      label="Plan Type"
                      onChange={handlePlanTypeChange}
                    >
                      <MenuItem value="free">Free</MenuItem>
                      <MenuItem value="classic">Classic</MenuItem>
                      <MenuItem value="premium">Premium</MenuItem>
                      <MenuItem value="exclusive">Exclusive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth margin="normal" size="medium">
                    <InputLabel id="demo-simple-select-label">PaymentStatus</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Payment_status"
                      value={PaymentStatus}
                      label="Payment Status"
                      onChange={handlePaidTypeChange}
                    >
                      <MenuItem value="unpaid">Unpaid</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box
                  sx={{
                    width: 1500,
                    maxWidth: '100%',
                  }}
                >
                  <FormControl fullWidth margin="normal" size="medium">
                    <TextField
                      fullWidth
                      label="Comments"
                      id="comments"
                      multiline
                      minRows={1}
                      maxRows={10}
                      variant="outlined"
                      value={comments}
                      defaultValue={profile?.comments}
                      onChange={handleCommentsChange}
                    />
                  </FormControl>
                </Box>

                <Button
                  varient="contained"
                  onClick={handleSaveChanges}
                  style={{ backgroundColor: 'orange', color: 'white' }}
                >
                  Save Changes
                </Button>
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
