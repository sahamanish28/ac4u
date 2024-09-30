import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import { ReceiptLong } from '@mui/icons-material';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function ReqList() {

  const [clinicreqs, setclinicreqs] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('admin')) {
      console.log('request send to server');
      axios.get(`http://localhost:5000/admin_clinicreq`)
        .then(result => {
          setclinicreqs(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, 1000);

  const reject = (id) => {
    const choice = window.confirm("Are you sure?");
    if (choice) {
      axios.delete(`http://localhost:5000/admin_clinicreq/${id}`)
        .then((res) => {
          if (res) {
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  const accept = (id) => {
    const choice2 = window.confirm("Are you sure?");
    if (choice2) {
      axios.post(`http://localhost:5000/admin_clinicreq/${id}`)
        .then((res) => {
          if (res) {
            console.log(res.data);
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }


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
          Clinic Request List
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
              <TableCell style={{ fontSize: 'large' }} align="center" >Email</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Phone</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Accept/Reject</TableCell>
              {/* <TableCell align="center" >Status</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody >
            {clinicreqs.map((clinicreq, i) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                <TableCell style={{ fontSize: 'large' }} align="center">{i + 1}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{clinicreq._id}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{clinicreq.clinicname}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{clinicreq.cliniclocality}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{clinicreq.email}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{clinicreq.phone}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">

                  <button style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none' }}
                    onClick={() => { accept(clinicreq._id) }}>
                    Accept
                  </button>
                  <button style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none' }}
                    onClick={() => { reject(clinicreq._id) }}>
                    Reject
                  </button>
                </TableCell>

              </TableRow >
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}
