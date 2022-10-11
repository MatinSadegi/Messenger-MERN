import React from "react";

const SearchResult = ({ data, groupInfo, setGroupInfo }) => {
  const { users } = groupInfo;

  return (
    <>
      <div
        className="user__container"
        onClick={() =>{
          if(!users.includes(data)){
            setGroupInfo({
              ...groupInfo,
              users: [...users, data],
            });
          }
        }
        }
      >
        <div className="user__profile"></div>
        <div className="user__info">
          <p className="user__name">
            {data.firstName} {data.lastName}
          </p>
          <p className="user__email">{data.email}</p>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
