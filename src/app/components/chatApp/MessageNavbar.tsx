import React from "react";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import { useChatStore, User } from "../../../store/useChatStore";
import { serverApi } from "../../../lib/config";
import { useAuthStore } from "../../../store/useAuthStore";

const MessageNavbar = () => {
  const { getUsers, users, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return <div>User not selected...</div>;
  return (
    <div className="chosen-user-main-header">
      <div className="chosen">
        <img
          src={
            selectedUser?.memberImage
              ? `${serverApi}/${selectedUser?.memberImage}`
              : "/icons/default-user.svg"
          }
          alt=""
        />
        <div className="user-status">
          <span style={{ fontWeight: "600", fontSize: "16px" }}>
            {selectedUser.memberNick}
          </span>
          <span style={{ fontStyle: "italic" }}>
            {onlineUsers.includes(selectedUser._id) ? "online" : "offline"}
          </span>
        </div>
      </div>
      <div onClick={() => setSelectedUser(null)}>
        <CancelScheduleSendIcon />
      </div>
    </div>
  );
};

export default MessageNavbar;
