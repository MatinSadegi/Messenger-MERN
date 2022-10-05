import React from 'react';
import message from '../../assets/icons/message-regular.svg';
import channel from '../../assets/icons/people-group-solid.svg';
import group from '../../assets/icons/user-group-solid.svg';

const SideBar = ({setInbox}) => {
 
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
        <li onClick={() => setInbox({ message: true, group: false })}>
          <img src={message} alt='message' />
          <span>Messages</span>
        </li>
        <li>
          <img src={channel} alt='channel' />
          <span>Channels</span>
        </li>
        <li onClick={() => setInbox({ message: false, group: true })}>
          <img src={group} alt='group' />
          <span>Group</span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
