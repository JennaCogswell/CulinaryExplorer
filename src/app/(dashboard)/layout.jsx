"use client";

import Footer from "@/components/Footer/Footer";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { useSession } from "next-auth/react";
import ContextProvider from "@/utils/ContextProvider";

/**
 * @author Santi
 */

const DashboardLayout = ({ children }) => {
  const session = useSession();
  return (
    session?.status !== "loading" && (
      <div className="flex flex-col justify-between min-h-[100vh] max-w-[100vw] md:pt-[50px] md:px-[3rem] lg:px-[5rem] xl:px-[10rem] 2xl:px-[15rem] gap-y-[3rem]">
        <ContextProvider>
          <Navbar />
          <div className="md:px-[10px]">{children}</div>
          <Footer />
        </ContextProvider>
      </div>
    )
  );
};

export default DashboardLayout;
