"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/utils/ContextProvider";

/**
 *
 * @author Adam Melvin
 *  Made with referrence to Ayush and Santi's work in Contact Section.
 *
 */

const MessageInput = () => {
  const router = useRouter();
  const { user, selectedUser, updateConversations } = useContext(Context);

  const sendMessage = async (message) => {
    try {
      if (!selectedUser) {
        alert("No recipient selected");
        return;
      }

      const formData = new FormData();
      formData.append("messageBody", message);
      formData.append("selectedUser", selectedUser);
      formData.append("user", user?.name);

      const response = await fetch(
        `/api/messages?user=${user?.name}&selectedUser=${selectedUser}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 200) {
        await updateConversations(selectedUser);
        console.log("Sent Message!");
      } else {
        console.log("Failed to send message.");
      }
    } catch (error) {
      console.error("Error Sending Message:", error);
    }
  };

  const inputStyle = {
    backgroundColor: "#A4A291",
  };
  const buttonStyle = {
    backgroundColor: "#A3865E",
  };
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!recipient) {
        await sendMessage(message, selectedUser);
        setMessage("");
        setRecipient("");
        router.refresh();
      } else {
        await sendMessage(message, recipient);
        setMessage("");
        setRecipient("");
        switchConvo(recipient);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!selectedUser) {
    return (
      <div id="messageInput" className="h-[100%]">
        <form
          className="flex flex-col h-[100%] justify-between"
          onSubmit={handleSubmit}
        >
          <input
            style={inputStyle}
            className="shadow appearance-none rounded-full py-3 px-[20px] placeholder-black leading-tight focus:outline-none focus:shadow-outline"
            id="recipient"
            placeholder="Enter a Recipient..."
            value={recipient}
            onChange={handleRecipientChange}
            onKeyDown={handleKeyDown}
          />
          <div className="flex shadow rounded-full">
            <input
              style={inputStyle}
              className="rounded-l-full w-full py-3 px-[20px] placeholder-black leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter Message..."
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
            />
            <button
              style={buttonStyle}
              className="border-none px-[1.5rem] rounded-r-full"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div id="messageInput">
        <form
          className="flex flex-col h-[100%] justify-between"
          onSubmit={handleSubmit}
        >
          <div className="flex shadow rounded-full">
            <input
              style={inputStyle}
              className="rounded-l-full w-full py-3 px-[20px] placeholder-black leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter Message..."
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
            />
            <button
              style={buttonStyle}
              className="border-none px-[1.5rem] rounded-r-full"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default MessageInput;
