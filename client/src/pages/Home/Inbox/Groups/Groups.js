import React from "react";
import { CreateGroupCard, Card } from "../../../index";
import { useFetchAllChatsQuery } from "../../../../services/chatApiSlice";

const Groups = ({ createGroup, setCreateGroup }) => {
  const { data, isLoading } = useFetchAllChatsQuery();
  return (
    <div>
      <div className="unreaded__container">
        {isLoading && <span className="loader"></span>}
        {data &&
          data.length > 0 &&
          data.map(
            (chat) => chat.isGroupChat && <Card key={chat._id} chat={chat} />
          )}
      </div>
      <CreateGroupCard
        createGroup={createGroup}
        setCreateGroup={setCreateGroup}
      />
    </div>
  );
};

export default Groups;
