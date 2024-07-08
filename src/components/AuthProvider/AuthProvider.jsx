"use client"; // Render client side

import { SessionProvider } from "next-auth/react";
import React from "react";

/**
 * @Author Santi Rijal
 */

// Auth provider used for session info.
const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
