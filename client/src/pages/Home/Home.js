import React, {useState } from "react";
import { Inbox, StatusBar, SideBar, ChatScreen, Profile } from "../";

const Home = () => {
  
  const [inbox, setInbox] = useState("Messages");
  const [showSideBar, setShowSideBar] = useState(false);

  // console.log(signedUser);
  // useEffect(() => {
  //   // if(signedUser === null){
  //   //   navigate("/auth")
  //   // }
  //   navigate("https://www.google.com/")
  // },[])

  return (
    <div className="home">
      <SideBar
        setInbox={setInbox}
        setShowSideBar={setShowSideBar}
        showSideBar={showSideBar}
      />
      <Inbox inbox={inbox} setShowSideBar={setShowSideBar} />
      <ChatScreen />
      <StatusBar />
      <Profile />
    </div>
  );
};

export default Home;
