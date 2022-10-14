import React from 'react'
import { useSelector } from 'react-redux'

const Sender = ({message}) => {
  const signedUser = useSelector(state => state.auth.user)
  const {sender,content} = message
  // console.log(signedUser.existingUser._id === message.sender._id)
  console.log(message)
  return (
    <div
      className="message__container"
      style={{
        justifyContent:
          signedUser.existingUser._id === sender._id ? "flex-end" : "flex-start",
      }}
    >
      <div
        className="message"
        style={{
          backgroundColor:
            signedUser.existingUser._id === sender._id ? "#3b82f6" : "red",
        }}
      >
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Sender