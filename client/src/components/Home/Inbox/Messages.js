import React, { useState } from 'react';
import { Card, User } from '../../index';
import { useSearchUsersQuery, useFetchAllChatsQuery } from '../../../features/chat/chatApiSlice';
import searchIcon from '../../../assets/icons/1492.gif';

const Messages = () => {

  const [search, setSearch] = useState(false);
  const [skip, setSkip] = useState(true);
  const [searchUser, setSearchUser] = useState('');
  const {data ,isLoading} = useFetchAllChatsQuery()
  const { isSuccess, currentData, isFetching} = useSearchUsersQuery(
    searchUser,
    {
      skip,
    }
  );
  const findUser = () => {
    setSkip(false);
  };

    return (
      <div>
        <div className='section-name'>
          <h3>Messages</h3>
          <img
            src='https://img.icons8.com/small/10/000000/plus-math.png'
            alt='plus'
            onClick={() => setSearch(!search)}
          />
        </div>
        <div
          className='search__container'
          style={{ display: search ? 'block' : 'none' }}
        >
          <div className='search_div'>
            <input
              type='text'
              placeholder='search user'
              onChange={(e) => {
                setSearchUser(e.target.value);
                setSkip(true);
              }}
            />
            <div onClick={findUser}>
              <img
                src='https://img.icons8.com/windows/25/000000/quill-pen.png'
                alt='pen'
              />
            </div>
          </div>
          <div className='search-result__container'>
            {isFetching ? (
              <img src={searchIcon} alt='searchIcon' />
            ) : isSuccess && currentData && !currentData.length ? (
              <p>User Not Found !</p>
            ) : isSuccess && currentData ? (
              currentData.map((item) => (
                <User
                  firstName={item.firstName}
                  lastName={item.lastName}
                  email={item.email}
                  userId={item._id}
                  key={item.email}
                  setSearch = {setSearch}
                />
              ))
            ) : null}
          </div>
        </div>
        <div
          className='unreaded__container'
          style={{ display: search ? 'none' : 'block' }}
        >
          {isLoading && <p>LOADIIIIING</p>}
          {data && data.length> 0 && data.map(chat=> <Card key={chat._id} user={chat.users[1]}/>)}
        </div>
      </div>
    );
};

export default Messages;


//: isSuccess && data && !data.length ? ('not foundddd') 