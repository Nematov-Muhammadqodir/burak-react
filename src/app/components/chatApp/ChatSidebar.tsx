import React, { useEffect, useState } from "react";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import { Button } from "@mui/material";
import { useChatStore, User } from "../../../store/useChatStore";
import { serverApi } from "../../../lib/config";
import { useAuthStore } from "../../../store/useAuthStore";

const ChatSidebar = () => {
  const { getUsers, users, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <div className="sidebar-main-container">
      <div className="sidebar-header">
        <ContactMailOutlinedIcon />
        <span>Contacts</span>
      </div>
      <div className="border"></div>
      <div className="contact-list-container">
        {filteredUsers.map((user: User) => {
          return (
            <Button
              className={`user-container-btn ${
                selectedUser?._id === user._id ? "selected" : ""
              }`}
              onClick={() => setSelectedUser(user)}
              key={user._id}
              sx={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                textAlign: "left",
              }}
            >
              <img
                src={
                  user?.memberImage
                    ? `${serverApi}/${user?.memberImage}`
                    : "/icons/default-user.svg"
                }
                alt=""
              />
              <div className="user-info-container">
                <span style={{ fontWeight: "600", fontSize: "16px" }}>
                  {user.memberNick}
                </span>
                <span style={{ fontStyle: "italic" }}>
                  {onlineUsers.includes(user._id) ? "online" : "offline"}
                </span>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;
