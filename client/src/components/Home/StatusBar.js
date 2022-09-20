import React,{useState} from 'react';

const StatusBar = () => {
  const [hover, setHover] = useState(false)
  return (
    <div className='status-bar__container'>
      <div className='status-bar__top'>
        <img
          src='https://img.icons8.com/material-outlined/18/A9A9A9/more.png'
          alt='dot'
        />
      </div>
      <div className='status-bar__bottom'>
        <img
          src='https://img.icons8.com/material-outlined/18/A9A9A9/info--v1.png'
          alt='info'
        />
        <img
          src='https://img.icons8.com/material-outlined/18/A9A9A9/notification-off.png'
          alt='notification-off'
        />
        <img
          src='https://img.icons8.com/material-outlined/18/A9A9A9/trash--v1.png'
          alt='trash'
        />
      </div>
    </div>
  );
}

export default StatusBar