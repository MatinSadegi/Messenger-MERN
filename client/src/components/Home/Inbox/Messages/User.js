import React,{useEffect} from "react";
import { useCreateChatMutation } from "../../../../features/chat/chatApiSlice";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../../../features/chat/chatSlice";

const User = ({
  firstName,
  lastName,
  email,
  userId,
  setSearch,
  setCreateChatStatus,
}) => {
  const dispatch = useDispatch();
  const [createChat, { isLoading, isSuccess }] = useCreateChatMutation();
  const accessChat = async () => {
    const { data } = await createChat({ userId });
    dispatch(setSelectedChat(data));
    setSearch(false);
    
  };
  console.log(isLoading, isSuccess);
  useEffect(() => {
    setCreateChatStatus({loading:isLoading, success:isSuccess})
  },[isLoading])

  

  return (
    <>
      <div onClick={accessChat} className="user__container">
        <div className="user__profile"></div>
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