// import React, { useState,useEffect } from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { TextField, Button, Box, Grid } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectUser } from 'app/store/userSlice';
// import { fetchDataWithPut, selectManageSearch } from './ManageSearchSlice';

// const columns = [
//   { id: 'id', label: 'ID', minWidth: 170 },
//   { id: 'name', label: 'Name', minWidth: 100 },
//   { id: 'email', label: 'Email', minWidth: 170 },
//   { id: 'address', label: 'Address', minWidth: 170, align: 'right' },
//   { id: 'phone_num_1', label: 'Phone Number 1', minWidth: 170 },
//   { id: 'phone_num_2', label: 'Phone Number 2', minWidth: 170 },
//   { id: 'comments', label: 'Comments', minWidth: 170 },
//   { id: 'requirements', label: 'Requirements', minWidth: 170 },
//   { id: 'role', label: 'Role', minWidth: 170 },
// ];

// const SearchResult = () => {
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     email: '',
//     address: '',
//     phone_num_1: '',
//     phone_num_2: '',
//     comments: '',
//     requirements: '',
//     role: '',
//   });
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filteredData, setFilteredData] = useState([]);
//   const dispatch = useDispatch();
//   const users = useSelector(selectManageSearch); 
//   const user = useSelector(selectUser);
//   const [offset,setOffset] = useState(0);
//   const [loading,setLoading] = useState(false);
//   const [resultsCount,setResultCount] = useState(0);
//   const userId = user?.uid;

//   const handleSearchChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSearchSubmit = () => {
//     const updatedFormData = {
//       ...formData,
//       user_id: userId,
//       req_user_id: userId,
//     };

//     dispatch(fetchDataWithPut(updatedFormData))
//       .then((response) => {
//         console.log("Response from backend:", response);

//         const filteredUsers = users?.filter((user) => {
//           return Object.keys(formData).every((key) =>
//             formData[key] === '' || user[key]?.toString().toLowerCase().includes(formData[key].toLowerCase())
//           );
//         });
        
//         setFilteredData(filteredUsers);
//         setResultCount(filteredUsers.length);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };



// const handleScrollBar =_.throttle(()=> {
//   if(!loading &&(window.innerHeight + document.documentElement.scrollTop)>= document.documentElement.offsetHeight - 29) {
//     setLoading(true);
//   const newOffset = offset + 29;
//   dispatch(fetchDataWithPut({...formData,offset: newOffset}))
//   .then((response) => {
//     console.log("Response from backend:", response);
//     setFilteredData((prevData) => [...prevData, ...response.payload]); // Append new data
//     setOffset(newOffset);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   })
//   .finally(() => {
//     setLoading(false);
//   });
// }
// }, 300);



// useEffect(() => {
//   window.addEventListener('scroll', handleScrollBar);
//   return () => {
//     window.removeEventListener('scroll', handleScrollBar);
//   };
// }, [offset, loading]);















//   return (
//     <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '16px' }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" padding={2} style={{ backgroundColor: 'white' }}>
//         <h1>Search Result({resultsCount})</h1>
//         <Button variant="contained" color="primary" onClick={handleSearchSubmit}>
//           Search
//         </Button>
//       </Box>
//       <Box display="flex" justifyContent="space-between" alignItems="center" padding={2} style={{ backgroundColor: 'white' }}>
//         <Grid container spacing={2}>
//           {Object.keys(formData).map((key) => (
//             <Grid item xs={12} sm={6} md={4} key={key}>
//               <TextField
//                 label={columns.find(col => col.id === key)?.label || key}
//                 name={key}
//                 variant="outlined"
//                 value={formData[key]}
//                 onChange={handleSearchChange}
//                 size="small"
//                 fullWidth
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//       <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'white' }}>
//         {filteredData && filteredData.length > 0 ? (
//           <>
//             <TableContainer sx={{ maxHeight: 440 }}>
//               <Table stickyHeader aria-label="sticky table">
//                 <TableHead>
//                   <TableRow>
//                     {columns.map((column) => (
//                       <TableCell
//                         key={column.id}
//                         align={column.align}
//                         style={{ minWidth: column.minWidth }}
//                       >
//                         {column.label}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
//                     <TableRow hover role="checkbox" tabIndex={-1} key={index}>
//                       {columns.map((column) => {
//                         const value = user[column.id];
//                         return (
//                           <TableCell key={column.id} align={column.align}>
//                             {value}
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <TablePagination
//               rowsPerPageOptions={[10, 25, 100]}
//               component="div"
//               count={filteredData?.length || 0}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </>
//         ) : (
//           <div style={{ padding: '16px', textAlign: 'center', backgroundColor: 'white' }}>
//             <h6>No data found</h6>
//           </div>
//         )}
//       </Paper>
//     </div>
//   );
// };

// export default SearchResult;






import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { fetchDataWithPut, selectManageSearch } from './ManageSearchSlice';
import _ from 'lodash';

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
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector(selectManageSearch); 
  const user = useSelector(selectUser);
  const userId = user?.uid;
  const [responseResult,setResultsCount] = useState (0);

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSearchSubmit = () => {
    const updatedFormData = {
      ...formData,
      user_id: userId,
      req_user_id: userId,
    };

    dispatch(fetchDataWithPut(updatedFormData))
      .then((response) => {
        console.log("Response from backend:", response);

  //       const filteredUsers = users?.filter((user) => {
  //         return Object.keys(formData).every((key) =>
  //           formData[key] === '' || user[key]?.toString().toLowerCase().includes(formData[key].toLowerCase())
  //         );
  //       });
        
  //       setFilteredData(filteredUsers);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };
  const allFieldsEmpty = Object.values(formData).every(value => value === '');

  const filteredUsers = allFieldsEmpty ? users : users?.filter((user) => {
    return Object.keys(formData).every((key) =>
      formData[key] === '' || user[key]?.toString().toLowerCase().includes(formData[key].toLowerCase())
    );
  });

  setFilteredData(filteredUsers);
  setResultsCount(filteredUsers.length);
})
.catch((error) => {
  console.error("Error fetching data:", error);
});
};

  const handleScroll = _.throttle(() => {
    if (!loading && (window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.offsetHeight - 40) {
      setLoading(true);
      const newOffset = offset + 29;
      dispatch(fetchDataWithPut({ ...formData, offset: newOffset }))
        .then((response) => {
          console.log("Response from backend:", response);
          const newUsers = response.payload;

          // Check if the response payload is an array before trying to append
          if (Array.isArray(newUsers)) {
            setFilteredData((prevData) => [...prevData, ...newUsers]);
            setOffset(newOffset);
          } else {
            console.error("Unexpected response structure: payload is not an array", newUsers);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, 300);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset, loading]);


 

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '16px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={2} style={{ backgroundColor: 'white' }}>
        <h1>Search Result{(responseResult)}</h1>
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
                  {filteredData.map((user, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = user[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <div style={{ padding: '16px', textAlign: 'center', backgroundColor: 'white' }}>
            <h6>No data found</h6>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default SearchResult;
