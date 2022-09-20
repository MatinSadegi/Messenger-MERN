import React from 'react'

const ChatScreen = () => {
  return (
    <div className='chat-screen__container'>
      <div className='chat-screen__header'>
        <div className='chat-screen__left'>
          <div className='card__profile'></div>
          <div className='card__info'>
            <p>Jhon Doe</p>
            <p>Online</p>
          </div>
        </div>
        <div className='chat-screen__right'>
          <img
            src='https://img.icons8.com/fluency-systems-regular/18/A9A9A9/microphone--v1.png'
            alt='voice'
          />
          <img
            src='https://img.icons8.com/fluency-systems-filled/18/A9A9A9/phone.png'
            alt='phone'
          />
          <img
            src='https://img.icons8.com/material-outlined/18/A9A9A9/video-call.png'
            alt='video-call'
          />
        </div>
      </div>
    </div>
  );
}

export default ChatScreen