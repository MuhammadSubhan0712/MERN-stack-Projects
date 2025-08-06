import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <>
      <div className="flex h-screen bg-[url('./src/assets/home_page2.jpg')] bg-contain bg-center">
        <div className="border w-full h-screen sm:px-[15%] sm:py-[5%]">
          <div
            className={`${
              selectedUser ? "hidden md:block" : "block"
            } w-full md:w-72 flex-shrink-0`}>
            <Sidebar />
          </div>

          <div
            className={`flex-1 ${selectedUser ? "hidden md:block" : "block"}`}>
            <ChatContainer />
          </div>

          {selectedUser && (
            <div className="hidden md:block w-80 flex-shrink-0">
              <RightSidebar />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
