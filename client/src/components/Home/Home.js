import React from 'react';
import {Inbox, StatusBar, SideBar, ChatScreen} from '../';


const Home = () => {
  return (
    <div className='home'>
      <SideBar/>
      <Inbox/>
      <ChatScreen/>
      <StatusBar/>
    </div>
  )
}

export default Home