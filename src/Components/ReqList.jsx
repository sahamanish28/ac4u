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

  const [appointmentreqs, setappointmentreqs] = useState([]);
  const clinic_name = localStorage.getItem('clinic');
  useEffect(() => {
    if (clinic_name) {
      console.log('request send to server');
      axios.get(`http://localhost:5000/appointment_requests/${clinic_name}`)
        .then(result => {
          console.log(result.data);
          setappointmentreqs(result.data);
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [clinic_name]);

  setInterval(() => {
    window.location.reload();
  }, 60000);

  const statusdone = (id) => {
    const choice33 = window.confirm("Are you sure?");
    if (choice33) {
      const status = 'Done';
      axios.patch('http://localhost:5000/appointment_requests', { id, status })
        .then(response => {
          if (response.status === 200) {
            window.alert('Status updated');
            window.location.reload();
          } else {
            console.log('Something went wrong');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const statusreject = (id) => {
    const choice87 = window.confirm("Are you sure?");
    if (choice87) {
      const status = 'Rejected';
      axios.patch('http://localhost:5000/appointment_requests', { id, status })
        .then(response => {
          if (response.status === 200) {
            window.alert('Status updated');
            window.location.reload();
          } else {
            console.log('Something went wrong');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };



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
          Appointment List
        </h3>
      </Typography>
      <Divider />


      <TableContainer sx={{ maxHeight: 380 }}>
        <Table stickyHeader aria-label="sticky table">

          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: 'large' }} align="center" >No.</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Name</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Email</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Phone</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Pet</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Gender</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Breed</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Date</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Time</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Status</TableCell>
              <TableCell style={{ fontSize: 'large' }} align="center" >Update Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody >
            {appointmentreqs.map((appointmentreq, i) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                <TableCell style={{ fontSize: 'large' }} align="center">{i + 1}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{appointmentreq.fullname}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{appointmentreq.email}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{appointmentreq.phonenumber}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{appointmentreq.pets}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{appointmentreq.gender}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{appointmentreq.breed}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{appointmentreq.date}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{appointmentreq.time}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">{appointmentreq.status}</TableCell>
                <TableCell style={{ fontSize: 'large' }} align="center">
                  <button style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none' }}
                    onClick={() => { statusdone(appointmentreq._id) }}>
                    Done
                  </button>
                  <button style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none' }}
                    onClick={() => { statusreject(appointmentreq._id) }}
                  >
                    Cancel
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
