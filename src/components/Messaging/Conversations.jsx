"use client";

/**
 * @authors
 * Adam Melvin
 * Santi - Styling
 */

import React, { useState, useContext } from "react";
import { Context } from "@/utils/ContextProvider";
import { RxHamburgerMenu } from "react-icons/rx";

const Conversations = ({ updateBurgerClick, burgerClicked }) => {
  const { conversations, updateConversations, selectedUser } =
    useContext(Context);

  const switchConvo = (conversation, bool) => {
    updateBurgerClick(bool);
    const selectedUser = conversation?._id;
    updateConversations(selectedUser);
  };

  return (
    <div
      className={`flex sm:w-[35%] lg:w-[30%] 2xl:w-[20%] ${
        burgerClicked ? "h-[100%]" : "h-[20%]"
      } sm:h-[100%]`}
    >
      <div className="sm:rounded-3xl bg-neutral-700 p-4 w-[100%] flex flex-col justify-between gap-y-[10px]">
        <div className="flex justify-between">
          <h2 className="font-semibold text-light-gold flex justify-center text-[1.2rem] tracking-wider">
            Conversations{" "}
            {!burgerClicked && `${selectedUser ? `- ${selectedUser}` : ""}`}
          </h2>
          <RxHamburgerMenu
            className=" cursor-pointer text-white text-[1.2rem] hover:text-light-gold sm:hidden"
            onClick={() => updateBurgerClick(!burgerClicked)}
          />
        </div>

        <nav
          className={`h-[100%] ${
            !burgerClicked && "hidden"
          } overflow-auto sm:flex`}
        >
          <ul className="flex flex-col gap-2 h-[100%] overflow-auto">
            {conversations.map((conversation) => (
              <li
                key={conversation._id}
                className={`text-white cursor-pointer hover:bg-neutral-400 hover:text-black rounded px-2 py-1 ${
                  selectedUser &&
                  selectedUser === conversation._id &&
                  " bg-neutral-500"
                }`}
                onClick={() => switchConvo(conversation, false)}
              >
                <h5 className="">{conversation._id}</h5>
                <p className="line-clamp-1 text-sm opacity-[80%]">
                  {
                    conversation.messages[conversation.messages.length - 1]
                      .messageBody
                  }
                </p>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex justify-center items-center p-t-[1.2rem] p-b-[20px]">
          <button
            className="rounded-full bg-dark-gold py-[10px] text-[1rem] text-white w-[100%] hover:bg-light-gold hover:text-black"
            onClick={() => switchConvo(undefined, false)}
          >
            New conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
