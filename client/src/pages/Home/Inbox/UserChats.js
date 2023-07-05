import React from "react";
import { Card } from "../../index";
import { useFetchAllChatsQuery } from "../../../services/chatApiSlice";

const UserChats = ({ inbox }) => {
  const { data, isLoading, isSuccess } = useFetchAllChatsQuery({
    refetchOnMountOrArgChange: true,
  });
  return (
    <div>
      <div className="unread-messages">
        {isLoading && <span className="unread-messages__loading-icon"></span>}
        {isSuccess &&
          data.length > 0 &&
          inbox === "Messages" &&
          data.map(
            (chat) => !chat.isGroupChat && <Card key={chat._id} chat={chat} />
          )}
        {data &&
          data.length > 0 &&
          inbox === "Groups" &&
          data.map(
            (chat) => chat.isGroupChat && <Card key={chat._id} chat={chat} />
          )}
      </div>
    </div>
  );
};

export default UserChats;
