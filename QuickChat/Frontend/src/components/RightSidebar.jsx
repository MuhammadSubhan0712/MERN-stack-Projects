import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  // Get all images from the messages and set them to state:
  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser && (
      <>
  <div className={`fixed right-0 top-0 h-screen w-80 z-10 bg-gradient-to-b from-gray-900/80 to-purple-900/20 backdrop-blur-md border-l border-gray-700/30 ${selectedUser ? "max-md:hidden" : ""}`}>
  <div className="p-6 flex flex-col items-center">
    <div className="relative mb-4">
      <img
        src={selectedUser?.profilePic || assets.avatar_icon}
        alt={selectedUser.fullName}
        className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500/30"
      />
      {onlineUsers.includes(selectedUser._id) && (
        <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-gray-800"></span>
      )}
    </div>
    <h3 className="text-xl font-bold text-white">{selectedUser.fullName}</h3>
    <p className="text-gray-400 text-sm mb-6 text-center">{selectedUser.bio || "Hey there! I'm using QuickChat"}</p>
    
    <div className="flex gap-4 mb-8">
      <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </button>
      <button className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>
    </div>
  </div>

  <div className="px-6 mb-6">
    <h4 className="text-sm font-medium text-gray-300 mb-3">Shared Media</h4>
    <div className="grid grid-cols-3 gap-2">
      {msgImages.slice(0, 6).map((url, index) => (
        <div
          key={index}
          onClick={() => window.open(url)}
          className="aspect-square bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img
            src={url}
            alt={`Media ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>

  <div className="mt-auto p-6">
    <button
      onClick={logout}
      className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 px-4 rounded-lg transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
      Logout
    </button>
  </div>
</div>
      </>
    )
  );
};

export default RightSidebar;
