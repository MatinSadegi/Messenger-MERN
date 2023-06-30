import React, { useEffect } from "react";

import { useCreateChatMutation } from "../../../../services/chatApiSlice";
import { useDispatch} from "react-redux";
import { setSelectedChat } from "../../../../redux/chatSlice";

const User = ({
  user,
  setSearch,
  setCreateChatStatus,
}) => {
  const {firstName, lastName, _id, email} = user
  const userId = _id
  const dispatch = useDispatch();
  const [createChat, { isLoading, isSuccess }] = useCreateChatMutation();
  const accessChat = async () => {
    const { data } = await createChat({ userId });
    dispatch(setSelectedChat(data));
    setSearch(false);
  };
  useEffect(() => {
    setCreateChatStatus({ loading: isLoading, success: isSuccess });
  }, [isLoading, isSuccess]);

  return (
    <>
      <div onClick={accessChat} className="user">
        <img className="user__profile" src={`${user.avatar.url}`} alt='user-profile'/>
        <div className="user__info">
          <p className="user__name">
            {firstName} {lastName}
          </p>
          <p className="user__email">{email}</p>
        </div>
      </div>
    </>
  );
};

export default User;
