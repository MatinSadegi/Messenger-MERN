import React,{useEffect} from 'react';
import {io} from 'socket.io-client'
import {Inbox, StatusBar, SideBar, ChatScreen} from '../';

const Home = () => {
  useEffect (() => {
    io('http://localhost:5000')
  },[])
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