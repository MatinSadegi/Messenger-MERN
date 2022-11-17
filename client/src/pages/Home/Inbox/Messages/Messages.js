import React, { useState } from "react";
import { Card, User } from "../../../index";
import {
  useSearchUsersQuery,
  useFetchAllChatsQuery,
} from "../../../../services/chatApiSlice";
import searchIcon from "../../../../assets/icons/1492.gif";

const Messages = ({search,setSearch}) => {
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
    <div className="messages" style={{ display: search ? "block" : "none" }}>
      <div className="search">
        <div className="search__container">
          <input
            type="text"
            placeholder="search user"
            className="search__input"
            onChange={(e) => {
              setSearchUser(e.target.value);
              setSkip(true);
            }}
          />
          <img
            src="https://img.icons8.com/fluency-systems-regular/18/A9A9A9/search--v1.png"
            alt="search"
            className="search__icon"
            onClick={findUser}
          />
        </div>
        <p
          className="search__accessing-chat"
          style={{ display: createChatStatus.loading ? "block" : "none" }}
        >
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
            currentData.map((user) => (
              <User
                user={user}
                key={user.email}
                setSearch={setSearch}
                setCreateChatStatus={setCreateChatStatus}
              />
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Messages;

