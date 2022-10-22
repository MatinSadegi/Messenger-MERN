import React, { useState } from "react";
import { Card, User } from "../../../index";
import {
  useSearchUsersQuery,
  useFetchAllChatsQuery,
} from "../../../../features/chat/chatApiSlice";
import searchIcon from "../../../../assets/icons/1492.gif";

const Messages = () => {
  const [search, setSearch] = useState(false);
  const [skip, setSkip] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const { data, isLoading } = useFetchAllChatsQuery();
  const [createChatStatus, setCreateChatStatus] = useState({
    loading: false,
    success: false,
  });
  const { isSuccess, currentData, isFetching } = useSearchUsersQuery(
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
      <div className="section-name">
        <h3>Messages</h3>
        <img
          src="https://img.icons8.com/small/10/000000/plus-math.png"
          alt="plus"
          onClick={() => setSearch(!search)}
        />
      </div>
      <div
        className="search__container"
        style={{ display: search ? "block" : "none" }}
      >
        <div className="search_div">
          <input
            type="text"
            placeholder="search user"
            onChange={(e) => {
              setSearchUser(e.target.value);
              setSkip(true);
            }}
          />
          <div onClick={findUser}>
            <img
              src="https://img.icons8.com/fluency-systems-regular/18/A9A9A9/search--v1.png"
              alt="search"
            />
          </div>
        </div>
        <p className="accessing-chat" style={{ display: createChatStatus.loading ? "block" : "none" }}>
          accessing chat ...
        </p>
        <div
          style={{ display: createChatStatus.loading ? "none" : "block" }}
          className="result"
        >
          {isFetching ? (
            <img src={searchIcon} alt="searchIcon" />
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
                setSearch={setSearch}
                setCreateChatStatus={setCreateChatStatus}
              />
            ))
          ) : null}
        </div>
      </div>
      <div
        className="unreaded__container"
        style={{ display: search ? "none" : "block" }}
      >
        {isLoading && <span className="loader"></span>}
        {data &&
          data.length > 0 &&
          data.map(
            (chat) => !chat.isGroupChat && <Card key={chat._id} chat={chat} />
          )}
      </div>
    </div>
  );
};

export default Messages;

//: isSuccess && data && !data.length ? ('not foundddd')
