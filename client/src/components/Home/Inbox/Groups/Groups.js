import React, { useState } from "react";
import {CreateGroupCard} from '../../../index';


const Groups = () => {
  const [createGroup, setCreateGroup] = useState(false);
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
      <div className="search__container">
        <div className="search-result__container"></div>
      </div>
      <div className="unreaded__container"></div>
      <CreateGroupCard
        createGroup={createGroup}
        setCreateGroup={setCreateGroup}
      />
    </div>
  );
};

export default Groups;
