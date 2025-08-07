import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import { AuthContext } from "../../context/AuthContext";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";
import { IoMdContacts } from "react-icons/io";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { selectedUser, setSelectedUser } = useContext(ChatContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
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
          <div className="relative group">
            <button className="p-2.5 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            <div className="absolute right-0 z-20 w-48 mt-2 origin-top-right bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="py-1">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700 w-full text-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
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
