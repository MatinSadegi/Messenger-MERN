import React, { useState } from "react";
import { Inbox, StatusBar, SideBar, ChatScreen } from "../";


const Home = () => {
  const [inbox, setInbox] = useState({ message: true, group: false });

  return (
    <div className="home">
      <SideBar setInbox={setInbox} />
      <Inbox inbox={inbox}/>
      <ChatScreen  />
      <StatusBar />
    </div>
  );
};

export default Home;
