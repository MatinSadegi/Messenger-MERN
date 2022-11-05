import React, { useState } from "react";
import { CreateGroupCard, Card } from "../../../index";
import { useFetchAllChatsQuery } from "../../../../services/chatApiSlice";

const Groups = () => {
  const [createGroup, setCreateGroup] = useState(false);
  const { data, isLoading } = useFetchAllChatsQuery();
  return (
    <div>
      <div className="section-name">
        <h3>Groups</h3>
        <img
          src="https://img.icons8.com/small/10/000000/plus-math.png"
          alt="plus"
          onClick={() => setCreateGroup(true)}
        />
      </div>
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
