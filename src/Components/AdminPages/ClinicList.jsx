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
import { ReceiptLong } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function ClinicList() {

  const [clinics, setclinics] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('admin')) {
      console.log('request send to server');
      axios.get(`http://localhost:5000/admin_clinic`)
        .then(result => {
          console.log(result.data);
          setclinics(result.data);
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
          Clinic List
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
              <TableCell style={{ fontSize: 'large' }} align="center" >Locality</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Phone</TableCell>
              {/* <TableCell align="center" >Status</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody >
            {clinics.map((clinic, i) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                <TableCell style={{ fontSize: 'large' }} align="center">{i + 1}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{clinic._id}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{clinic.clinicname}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{clinic.cliniclocality}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{clinic.phone}</TableCell>

              </TableRow >
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}
