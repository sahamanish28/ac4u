import { blue } from '@mui/material/colors';
import React from 'react'

export const NotificationList = () => {
    // Dummy notification data
    const notifications = [
        { id: 1, text: 'Notification 1' },
        { id: 2, text: 'Notification 2' },
        { id: 3, text: 'Notification 3' },
        { id: 4, text: 'Notification 4' },
        { id: 5, text: 'Notification 5' },
        { id: 6, text: 'Notification 6' },
        { id: 7, text: 'Notification 7' },
        { id: 8, text: 'Notification 8' },
        { id: 9, text: 'Notification 9' },
        { id: 10, text: 'Notification 10' },
      ];
    
      return (
        <div style={{ padding: '15px', margin: '10px', }}>
          {notifications.map(notification => (

            <div key={notification.id} 
                style={{ marginBottom: '20px', 
                         backgroundColor: '#2196F3', 
                         color: 'white', 
                         borderRadius: '5px' ,
                         height: '35px',
                         width: '300px',
                        }}>

              {notification.text}
              
            </div>
          ))}
        </div>
      );
    };
    
