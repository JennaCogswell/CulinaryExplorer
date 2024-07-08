"use client";

/**
 * @authors
 * Adam Melvin
 * Santi - Styling
 */

import React, { useEffect, useState } from "react";
import MessageHistory from "@/components/Messaging/MessageHistory";
import MessageInput from "@/components/Messaging/MessageInput";
import Conversations from "@/components/Messaging/Conversations";

const Messaging = () => {
  const [takeFullHeight, setTakeFullHeight] = useState(false);
  const [burgerClicked, setBurgerClicked] = useState(false);

  const updateBurgerClick = (bool) => {
    setBurgerClicked(bool);
  };

  return (
    <div className="flex flex-col sm:flex-row h-[80vh] sm:justify-between sm:gap-x-[20px] sm:px-[10px]">
      <Conversations
        takeFullHeight={takeFullHeight}
        updateBurgerClick={updateBurgerClick}
        burgerClicked={burgerClicked}
      />

      {!burgerClicked && (
        <div className="h-[100%] w-[100%] sm:w-[65%] lg:w-[70%] 2xl:w-[70%]">
          <div className="flex flex-col justify-between h-[100%] bg-neutral-300 sm:rounded-3xl p-[20px]">
            <MessageHistory />
            <MessageInput />
          </div>
        </div>
      )}
    </div>
  );
};

export default Messaging;
