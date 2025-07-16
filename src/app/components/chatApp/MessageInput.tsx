import React, { useRef, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { Send } from "@mui/icons-material";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { Messages } from "../../../lib/config";
import { useChatStore } from "../../../store/useChatStore";

const MessageInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { sendMessage, messages } = useChatStore();

  const handleImageIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: T) => {
    const file = e.target.files?.[0];

    const fileType = file?.type,
      validateImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSendMessage = async (e: T) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    console.log("texttrim", text);
    console.log("imagePreview", imagePreview);

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setText("");
      setImagePreview(null);
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <div className="message-input-main">
        <div className="message-input-container">
          <input
            type="text"
            placeholder="Type a message..."
            className="message-text-input"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />

          <div className="message-sender">
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden-file-input"
            />

            {/* MUI Image icon */}
            <ImageIcon
              style={{
                cursor: "pointer",
                color: imagePreview ? "#10b981" : "#888",
              }}
              onClick={handleImageIconClick}
            />
          </div>
          <button type="submit" className="btn btn-sm btn-circle">
            <Send />
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
