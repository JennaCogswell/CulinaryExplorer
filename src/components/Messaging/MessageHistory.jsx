"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import { useSession } from "next-auth/react";
import { Context } from "@/utils/ContextProvider";

/**
 *
 * @authors
 * Adam Melvin
 * Santi - Styling and moved the fetch to the ContextProvider.js, so there arent duplicate code. Fixed filter after chages.
 */
const MessageHistory = () => {
  const session = useSession();
  const currentUser = session?.data?.user?.name;
  const messageContainerRef = useRef(null);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const { conversations, selectedUser } = useContext(Context);

  useEffect(() => {
    //So message history will scroll down to the newest messages on load
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }

    const fetchMessages = async () => {
      try {
        if (conversations) {
          const filtered = conversations?.find(
            (thread) => thread._id === selectedUser
          );
          setFilteredMessages(filtered?.messages);
        } else {
          setFilteredMessages([]);
        }
      } catch (error) {
        console.error("Error Getting Messages:", error);
      }
    };

    fetchMessages();
  }, [conversations, selectedUser, messageContainerRef]);

  if (!selectedUser) {
    return <div className="mb-[10px]">Start a conversation!</div>;
  } else {
    return (
      <div
        ref={messageContainerRef}
        className="rounded-3xl p-5 overflow-y-auto h-[100%]"
      >
        {filteredMessages?.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.sender === currentUser ? " justify-end" : " justify-start"
            }`}
          >
            <p
              className={`text-black rounded-xl px-2 py-1 my-1 w-fit sm:max-w-[60%] ${
                message.sender === currentUser ? "bg-blue-200" : "bg-gray-200"
              }`}
            >
              {message.messageBody}
            </p>
          </div>
        ))}
      </div>
    );
  }
};

export default MessageHistory;
