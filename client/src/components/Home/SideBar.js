import React from 'react'

const SideBar = () => {
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
          <img
            src='https://img.icons8.com/external-anggara-basic-outline-anggara-putra/20/000000/external-inbox-home-screen-anggara-basic-outline-anggara-putra.png'
            alt='message'
          />
          <span>Messages</span>
        </li>
        <li>
          <img
            src='https://img.icons8.com/ios/19/000000/decentralized-network.png'
            alt='channels'
          />
          <span>Channels</span>
        </li>
        <li>
          <img src='https://img.icons8.com/windows/21/000000/group-foreground-selected.png' alt='group' />
          <span>Group</span>
        </li>
      </ul>
    </div>
  );
}

export default SideBar