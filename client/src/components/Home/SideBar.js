import React, { useState } from 'react';
import message from '../../assets/icons/message-regular.svg';
import channel from '../../assets/icons/people-group-solid.svg';
import group from '../../assets/icons/user-group-solid.svg';

const SideBar = () => {
  const [hover, setHover] = useState(false);
  return (
    <div className='side-bar__container'>
      <div className='logo__div'>
        <img
          src='https://img.icons8.com/emoji/45/000000/water-wave.png'
          alt='wave'
        />
        <p>Wave</p>
      </div>
      <ul>
        <li>
          <img src={message} alt='message' />
          <span>Messages</span>
        </li>
        <li>
          <img src={channel} alt='channel' />
          <span>Channels</span>
        </li>
        <li>
          <img src={group} alt='group'/>
          <span>Group</span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
