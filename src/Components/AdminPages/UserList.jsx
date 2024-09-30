import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Person } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { ReceiptLong } from '@mui/icons-material';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function UserList() {

  const [users, setusers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('admin')) {
      console.log('request send to server');
      axios.get(`http://localhost:5000/admin`)
        .then(result => {
          console.log(result.data);
          setusers(result.data);
          // console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },1000);
  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>

      <Typography
        gutterBottom
        variant='h5'
        component="div"
        sx={{ padding: "20px" }}>
        <h3>
          <IconButton style={{ width: '75px', height: '50px' }} color="inherit">
            <ReceiptLong style={{ fontSize: '35px' }} />
          </IconButton>
         Pet Owner List
        </h3>
      </Typography>
      <Divider />


      <TableContainer sx={{ maxHeight: 380 }}>
        <Table stickyHeader aria-label="sticky table">

          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: 'large' }} align="center" >Sl. No.</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Id No.</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Name</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Phone</TableCell>
            </TableRow>
          </TableHead>

          <TableBody >
            {users.map((user, i) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                <TableCell style={{ fontSize: 'large' }} align="center">{i + 1}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{user._id}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{user.username}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{user.email}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{user.phone}</TableCell>
              </TableRow >
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}
