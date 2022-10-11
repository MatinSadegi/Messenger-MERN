import React, { useState } from "react";
import { useSearchUsersQuery } from "../../../../features/chat/chatApiSlice";
import { SearchResult } from "../../../index";

const CreateGroupCard = ({ createGroup, setCreateGroup }) => {
  const [skip, setSkip] = useState(true);
  const [groupInfo, setGroupInfo] = useState({ groupName: "", users: [] });
  const [searchUser, setSearchUser] = useState("");
  const { currentData, isFetching } = useSearchUsersQuery(searchUser, {
    skip,
  });
  return (
    <div
      className="groupchat-builder__container"
      style={{ display: createGroup ? "block" : "none" }}
    >
      <div className="groupchat-builder">
        <img
          src="https://img.icons8.com/material-rounded/20/000000/multiply--v1.png"
          alt="multiply"
          onClick={() => {
            setCreateGroup(false);
            setGroupInfo({ groupName: "", users: [] });
          }}
        />
        <h2>Create Group Chat</h2>
        <div className="inputs-div">
          <input
            type="text"
            placeholder="Chat Name"
            onChange={(e) =>
              setGroupInfo({ ...groupInfo, groupName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Add Users"
            onChange={(e) => {
              setSkip(false);
              setSearchUser(e.target.value);
              if ((e.target.value === "")) {
                setSkip(true)
              }
            }}
          />
        </div>
        <div className="selected-users">
          {groupInfo.users.length > 0 &&
            groupInfo.users.map((user) => (
              <div key={user._id} >
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <img
                  src="https://img.icons8.com/small/12/000000/multiply.png"
                  alt="multiply"
                  onClick={() => {
                    const index = groupInfo.users.indexOf(user);
                    if (index > -1) {
                      const newUsers = groupInfo.users.splice(index, 1);
                      setGroupInfo({ ...groupInfo, newUsers });
                    }
                  }}
                />
              </div>
            ))}
        </div>
        <div className="search-result">
          {isFetching && <p>loading...</p>}
          {currentData && currentData.length > 0 && (
            <div className="result">
              {currentData.map((user) => (
                <SearchResult
                  data={user}
                  key={user._id}
                  setGroupInfo={setGroupInfo}
                  groupInfo={groupInfo}
                />
              ))}
            </div>
          )}
        </div>
        <button>Create</button>
      </div>
    </div>
  );
};

export default CreateGroupCard;
