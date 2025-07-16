import { Container, Stack } from "@mui/material";
import React from "react";
import ChatNavbar from "../../components/chatApp/ChatNavbar";
import ChatSidebar from "../../components/chatApp/ChatSidebar";
import MessageNavbar from "../../components/chatApp/MessageNavbar";
import MessageInput from "../../components/chatApp/MessageInput";
import ChatContainer from "../../components/chatApp/ChatContainer";

const ChatApp = () => {
  return (
    <div className="chatty-app">
      <ChatNavbar />
      <Container className="chat-message-main-container">
        <div className="chat-message-container">
          <ChatSidebar />
          <div className="vertical-border"></div>
          <div className="message-bar-container">
            <MessageNavbar />
            <ChatContainer />
            <MessageInput />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ChatApp;
