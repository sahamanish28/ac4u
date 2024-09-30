import React from 'react';
import Sidenav from './Sidenav';
import Box from '@mui/material/Box';
import Navbar from './Navbarc';
import { useRef } from 'react';
import ReqList from './ReqList';




export const AppointmentReq = () => {
  return (
    <>
      {(localStorage.getItem('clinic')) ?
        <>
          <Navbar />
          <Box height={52} />
          <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <h1>Welcome {localStorage.getItem('clinic')}</h1>
              <ReqList />
            </Box>
          </Box></>
        :
        <>
          <h1>Please Login with your clinic identity</h1>
        </>

      }

    </>

  )
}


