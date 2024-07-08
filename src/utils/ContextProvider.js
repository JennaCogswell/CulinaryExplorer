"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

/**
 * @authors Santi, Adam M, Adma S, Ayush
 */

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [recipes, setRecipes] = useState();
  const [user, setUser] = useState();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);

  const session = useSession();
  const path = usePathname();

  const getAllRecipes = async () => {
    try {
      const res = await axios.get("/api/recipes");

      if (res.status === 200) {
        setRecipes(res?.data?.recipes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`/api/profile/${session?.data?.user?.name}`);

      if (res.status === 200) {
        setUser(res?.data?.userInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchConversations = async (selectedUser) => {
    try {
      const response = await fetch(
        `/api/messages?user=${session?.data?.user?.name}&selectedUser=${selectedUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();

        if (data.conversationThreads) {
          const sortedConversations = data.conversationThreads.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
          });
          setConversations(sortedConversations);
        } else {
          setConversations([]);
        }
      } else {
        window.alert("Failed to get conversations.");
      }
    } catch (error) {
      console.error("Error Getting Conversations:", error);
    }
  };

  const updateRecipes = async () => {
    await getAllRecipes();
  };

  const updateUser = async () => {
    await getUser();
  };

  const updateConversations = async (selectedUser) => {
    setSelectedUser(selectedUser);
    await fetchConversations(selectedUser);
  };

  useEffect(() => {
    getAllRecipes();
    getUser();
    path === "/messages" && fetchConversations(null);
  }, []);

  return (
    <Context.Provider
      value={{
        recipes,
        user,
        conversations,
        selectedUser,
        updateRecipes,
        updateUser,
        updateConversations,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
