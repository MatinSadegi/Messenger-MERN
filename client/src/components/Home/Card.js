import React from 'react'

const Card = ({user}) => {
  return (
    <div className='card'>
      <div className='card__profile'></div>
      <div className='card__info'>
        <p>{user.firstName} {user.lastName}</p>
        <p>Hi there, how are you?</p>
      </div>
      <div className='card__status'>
        <p>09:00</p>
        <p>3</p>
      </div>
    </div>
  );
}

export default Card