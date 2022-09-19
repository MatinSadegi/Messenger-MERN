import React from 'react'
import {Card} from '../';

const Inbox = () => {
  return (
    <div className='inbox__container'>
      <div className='section-name'>
        <h3>Group</h3>
        <img
          src='https://img.icons8.com/small/10/000000/plus-math.png'
          alt='plus'
        />
      </div>
      <div className='search_div'>
        <input type='text' />
        <img src='https://img.icons8.com/fluency-systems-regular/18/A9A9A9/search--v1.png' alt='search' />
      </div>
      <div className='unreaded__container'>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  );
}

export default Inbox