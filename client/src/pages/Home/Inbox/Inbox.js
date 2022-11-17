import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Messages, CreateGroupCard, UnreadMessages } from "../..";
import { useForMobile } from "../../../utils/mediaQuery";
import { inboxVariant } from "../../../utils/variants";

const Inbox = ({ inbox, setShowSideBar }) => {
  const forMobile = useForMobile();
  const showInbox = useSelector((state) => state.chat.showInbox);
  const [search, setSearch] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  return (
    <motion.div
      variants={inboxVariant}
      initial={false}
      animate={
        showInbox && forMobile
          ? "m_visible"
          : showInbox && !forMobile
          ? "visible"
          : !showInbox && forMobile
          ? "m_hidden"
          : "hidden"
      }
      className="inbox"
    >
      <div className="inbox__section-name">
        {forMobile && (
          <img
            src="https://img.icons8.com/material/20/A9A9A9/menu--v1.png"
            alt="menu"
            className="inbox__hamburger-menu"
            onClick={() => setShowSideBar(true)}
          />
        )}
        <h3>{inbox}</h3>
        <img
          src="https://img.icons8.com/small/10/000000/plus-math.png"
          alt="plus"
          className="inbox__plus-icon"
          onClick={() =>
            inbox === "Messages" ? setSearch(!search) : setCreateGroup(true)
          }
        />
      </div>
      {!search && <UnreadMessages inbox={inbox} />}
      <Messages search={search} setSearch={setSearch} />
      <CreateGroupCard
        createGroup={createGroup}
        setCreateGroup={setCreateGroup}
      />
    </motion.div>
  );
};

export default Inbox;
