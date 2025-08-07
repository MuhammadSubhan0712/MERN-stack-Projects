import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";
import { IoMdContacts } from "react-icons/io";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";

const HomePage = () => {
  const { selectedUser, setSelectedUser } = useContext(ChatContext);

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

        {/* mobile navigation buttons */}
        <div className="md:hidden fixed bottom-4 left-0 right-0 flex justify-center gap-4 z-30">
          <button
            onClick={() => setSelectedUser(null)}
            className="p-3 bg-purple-500 rounded-full shadow-lg">
            <TiThMenu />
          </button>
          <button
            onClick={() => setSelectedUser(null)}
            className="p-3 bg-gray-800 rounded-full shadow-lg">
            <IoMdContacts />
          </button>
          <button
            onClick={() => setSelectedUser((prev) => prev || users[0])}
            className="p-3 bg-indigo-600 rounded-full shadow-lg">
            <IoChatboxEllipsesOutline />
          </button>
        </div>
      </div>
    </>
  );
};

// To memorize components:
export default React.memo(HomePage);
