import React from 'react';
import { useCreateChatMutation } from '../../../features/chat/chatApiSlice';

const User = ({firstName,lastName,email,id}) => {
  const [createChat] = useCreateChatMutation()
  return (
    <>
    <div onClick={() => createChat(id)} className='user__container'>
        <div className="user__profile"></div>
        <div className='user__info'>
            <p className='user__name'>{firstName} {lastName}</p>
            <p className='user__email'>{email}</p>
        </div>
    </div>
    </>
  )
}

export default User