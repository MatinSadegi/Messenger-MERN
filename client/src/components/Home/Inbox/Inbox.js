import React from 'react'
import {Messages,Groups} from '../..';


const Inbox = ({inbox}) => {

  return (
    <div className='inbox__container'>
      {inbox.message && <Messages/> }
      {inbox.group && <Groups/> }
    </div>
  );
}

export default Inbox