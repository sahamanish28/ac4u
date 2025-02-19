import React from 'react'
import Sidenav from '../AdminComponents/Sidenav'
import Box from '@mui/material/Box';
import Navbar from '../AdminComponents/Navbar';
import UserList from './UserList';
import { Link } from 'react-router-dom';

export default function User() {
  return (
    <>
      {(localStorage.getItem('admin'))
        ?
        <>
          <Navbar />
          <Box height={52} />
          <Box sx={{ display: 'flex' }}>
            <Sidenav></Sidenav>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <UserList />
            </Box>
          </Box>
        </>
        :
        <>
            <h1>Please Provide the secret key <Link to='/admin_login'>here</Link> for administrative works</h1>
        </>
      }

    </>
  )
}


