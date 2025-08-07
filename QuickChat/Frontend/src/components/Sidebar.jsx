import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { FaWindowClose } from "react-icons/fa";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState(false);

  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <>
      <div
        className={`flex flex-col justify-center h-full bg-gradient-to-b from-gray-900/80 to-purple-900/20 backdrop-blur-md border-r border-gray-700/30 
      w-full md:w-auto absolute md:static inset-0 z-20 transition-transform duration-300 
      ${
        selectedUser ? "-translate-x-full md:translate-x-0" : "translate-x-0"
      }`}>
        <div className="p-4 border-b border-gray-700/30">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              QuickChat
            </h1>
           
            <div className="relative group">
              <button className="p-1.5 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors">
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
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="w-full bg-gray-700/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              placeholder="Search contacts..."
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
              }}
              className={`flex items-center p-3 mx-2 rounded-lg cursor-pointer transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-indigo-600/20 border border-indigo-500/30"
                  : "hover:bg-gray-700/50"
              }`}>
              <div className="relative">
                <img
                  src={user?.profilePic || assets.avatar_icon}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-800"></span>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">
                  {user.fullName}
                </h3>
                <p className="text-sm text-gray-400 truncate">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </p>
              </div>
              {unseenMessages[user._id] > 0 && (
                <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unseenMessages[user._id]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
