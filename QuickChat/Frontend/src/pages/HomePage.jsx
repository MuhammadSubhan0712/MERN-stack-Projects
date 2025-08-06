import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('./src/assets/home_page2.jpg')] bg-contain bg-center"
          style={{
            transform: selectedUser ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        />
        <div className="relative flex h-full max-w-6xl mx-auto backdrop-blur-sm">
          <div
            className={`${
              selectedUser ? "hidden" : "block"
            } md:block w-full md:w-80 flex-shrink-0 border-r border-gray-700`}>
            <Sidebar />
          </div>

          <div
            className={`${selectedUser ? "block" : "hidden"} md:block flex-1`}>
            <ChatContainer />
          </div>

          {selectedUser && (
            <div className="hidden md:block w-80 flex-shrink-0 border-l border-gray-700">
              <RightSidebar />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// To memorize components:
export default React.memo(HomePage);
