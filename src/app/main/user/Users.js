import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TextField, Button, Box, Grid, CircularProgress, Alert, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { fetchDataWithPut, selectSearchUserResults } from './ManageSearchSlice';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'address', label: 'Address', minWidth: 170, align: 'right' },
  { id: 'phone_num_1', label: 'Phone Number 1', minWidth: 170 },
  { id: 'phone_num_2', label: 'Phone Number 2', minWidth: 170 },
  { id: 'comments', label: 'Comments', minWidth: 170 },
  { id: 'requirements', label: 'Requirements', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 170 },
];

const LIMIT = 29;

const SearchResult = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    address: '',
    phone_num_1: '',
    phone_num_2: '',
    comments: '',
    requirements: '',
    role: '',
  });
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const dispatch = useDispatch();
  const users = useSelector(selectSearchUserResults);
  const user = useSelector(selectUser);
  const userId = user?.uid;
  const [resultsCount, setResultsCount] = useState(0);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);
  const loader = useRef(null);

  const navigate = useNavigate();


  useEffect(
    ()=> {
      setFilteredData(users);
      setResultsCount(users.length);
    },[users]
  )
  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSearchSubmit = () => {
    setSearchInitiated(true);
    setError(null);
    setRetryCount(0);
    const allFieldsEmpty = Object.values(formData).every(value => value === '');
    setInfiniteScrollEnabled(allFieldsEmpty); 

    const updatedFormData = {
      ...formData,
      user_id: userId,
      req_user_id: userId,
      offset: 0,
      limit: LIMIT,
    };

    setLoading(true);
    dispatch(fetchDataWithPut(updatedFormData))
      .then((response) => {
        console.log("response of fetchdata withput",response)
        const newUsers = response.payload;

        if (allFieldsEmpty) {
          // setFilteredData(newUsers);
          // setResultsCount(newUsers.length);
          // setOffset(LIMIT);
          setAllDataLoaded(false);
        } else {
          // const filteredUsers = newUsers?.filter((user) => {
          //   return Object.keys(formData).every((key) =>
          //     formData[key] === '' || user[key]?.toString().toLowerCase().includes(formData[key].toLowerCase())
          //   );
          // });
          // setFilteredData(filteredUsers);
          // setResultsCount(filteredUsers.length);
          setAllDataLoaded(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadMoreData = () => {
    // if (allDataLoaded || loading) return;

    // setLoading(true);
    // setError(null);
    // const updatedFormData = {
    //   ...formData,
    //   user_id: userId,
    //   req_user_id: userId,
    //   offset: offset,
    //   limit: LIMIT,
    // };

    // dispatch(fetchDataWithPut(updatedFormData))
    //   .then((response) => {
    //     const newUsers = response.payload;

    //     if (Array.isArray(newUsers) && newUsers.length > 0) {
    //       setFilteredData((prevData) => [...prevData, ...newUsers]);
    //       setOffset(prevOffset => prevOffset + LIMIT);
    //       setRetryCount(0);
    //     } else {
    //       setOffset(0);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //     setError("Failed to load more data. Retrying...");
    //     if (retryCount < 3) {
    //       setRetryCount(retryCount + 1);
    //       setTimeout(loadMoreData, 3000);
    //     } else {
    //       setAllDataLoaded(true);
    //     }
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    if (!searchInitiated || !infiniteScrollEnabled) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        loadMoreData();
      }
    }, { threshold: 0.5 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading, searchInitiated, infiniteScrollEnabled]);

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '16px', scrollBehavior: 'smooth' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={2} style={{ backgroundColor: 'white' }}>
        <h1>Search Results ({resultsCount})</h1>
        <Button variant="contained" color="primary" onClick={handleSearchSubmit}>
          Search
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={2} style={{ backgroundColor: 'white' }}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <TextField
                label={columns.find(col => col.id === key)?.label || key}
                name={key}
                variant="outlined"
                value={formData[key]}
                onChange={handleSearchChange}
                size="small"
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {error && (
        <Box display="flex" justifyContent="center" padding={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'white' }}>
        {filteredData && filteredData.length > 0 ? (
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
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
                  {filteredData?.map((user, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = user[column.id];
                        
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'id' ? (
                              <Button
                              style={{color:"blue",textDecoration:"underline",background:"none"}}
                              onClick={()=>{
                                navigate(`/user/${value}`)
                              }}
                              // to={`/property/${item.property_id}` target="_blank"}
                               rel="noopener">
                                
                                {value}
                              </Button>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {loading && (
              <Box display="flex" justifyContent="center" padding={2}>
                <CircularProgress />
              </Box>
            )}
          </>
        ) : (
          searchInitiated && !loading && (
            <div style={{ padding: '16px', textAlign: 'center', backgroundColor: 'white' }}>
              <h6>No data found</h6>
            </div>
          )
        )}
        <div ref={loader} />
      </Paper>
    </div>
  );
};

export default SearchResult;
