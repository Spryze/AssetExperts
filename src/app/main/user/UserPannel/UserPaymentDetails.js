import React from 'react'
import{ Paper,TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Typography}from '@mui/material';
import { selectUser } from 'app/store/userSlice';
import {useSelector} from 'react-redux';

const UserPaymentDetails = () => {
  const userObj = useSelector(selectUser);
//   console.log("Payment Details Table :",userObj);
const PaymentDetailsTable = [

  { id: 'transaction_id', label: 'Transaction ID', minWidth: 100, align: 'center' },
    { id: 'payment_id', label: 'Payment ID', minWidth: 100, align: 'center' },
    { id: 'subscription_plan_type', label: 'Subscription Plan Type', minWidth: 100, align: 'center' },
    { id: 'from_date', label: 'Plan Start', minWidth: 150, align: 'center' },
    { id: 'to_date', label: 'Plan End', minWidth: 150, align: 'center' },
    { id: 'order_id', label: 'Order ID', minWidth: 170, align: 'center' },
    { id: 'payment_date', label: 'Payment Date', minWidth: 140, align: 'center' },
    { id: 'payment_gateway', label: 'Payment Gateway', minWidth: 100, align: 'center' },
    { id: 'comments', label: 'Comments', minWidth: 100, align: 'center' },
    { id: 'active_notifications', label: 'Active Notifications', minWidth: 100, align: 'center' },
    { id: 'Payment_status', label: 'Payment Status', minWidth: 100, align: 'center' },
    { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
];

  return (
    <div>    
            <>
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
              {userObj.payments && userObj.payments.length > 0 ?(
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {PaymentDetailsTable.map((column) => (
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
                        {userObj?.payments.map((row, index) => (
                          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {PaymentDetailsTable.map((column) => {
                              const value = row[column.id];
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
                </Paper>
            ) : (
                <Typography variant="body1" align="center" mt={2}>
                  No payment data found
                </Typography>
              )}
            </Paper>
              </>
            
         
      
    </div>
  )
};

export default UserPaymentDetails
