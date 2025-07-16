import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../../store/useChatStore";
import { useGlobals } from "../../hooks/useGlobals";
import { formatMessageTime } from "../../../lib/utils";
import { serverApi } from "../../../lib/config";

const ChatContainer = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    messages,
    getMessages,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authMember } = useGlobals();

  useEffect(() => {
    if (!selectedUser) return;
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser]);

  useEffect(() => {
    // Scroll the scrollable container down when messages update
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop =
        scrollableContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-main-container" ref={scrollableContainerRef}>
      {messages.map((message: any, i) => (
        <div
          className={`message-item ${
            message.senderId === authMember?._id ? "end" : "start"
          }`}
          key={i}
        >
          <img
            src={
              authMember?.memberImage
                ? `${serverApi}/${authMember?.memberImage}`
                : "/icons/default-user.svg"
            }
            alt=""
          />
          <div className="message-item-text">
            <span>{formatMessageTime(message.createdAt)}</span>
            <div className="text-container">
              <span>{message.text}</span>
            </div>
          </div>
        </div>
      ))}
      {/* Optional: you can keep a dummy div to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;
