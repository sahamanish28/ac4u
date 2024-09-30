import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from "react";
import Badge from '@mui/material/Badge';
import { NotificationList } from './NotificationList';
import { useRef } from 'react';


export const Notification = () => {
    const [showNotifications, setShowNotifications] = useState(false);
  
    const handleNotificationsClick = () => {
      setShowNotifications(!showNotifications);
    };
  
    return (
      <div>
        <div onClick={handleNotificationsClick} style={{ cursor: 'pointer' }}>
          {/* Your notification icon */}

          <Badge badgeContent={5} color="error">
            <NotificationsIcon />
          </Badge>
          
        </div>
        {showNotifications && (
          <div style={{ position: 'fixed', 
                        top: '80px', 
                        right: '20px',
                        backgroundColor: 'white', 
                        width: '350px',
                        height: '320px', 
                        border: '2px solid #2196F3 ',
                        borderRadius: '10px',
                        overflow: 'auto' }}>
            {/* Your notification content */}
            <NotificationList/>
          </div>
        )}
      </div>
    );
  };

