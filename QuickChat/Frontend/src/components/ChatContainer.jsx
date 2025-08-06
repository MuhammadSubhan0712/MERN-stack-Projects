import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import assets from "../assets/assets";
import { formateMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";


const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  // const chatContainerRef = useRef();

  const [input, setInput] = useState("");

  // Handle sending a message:
  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput('');
  };

  // Handle sending a image:
  const handleSendImage = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth", block: "nearest" // to prevent unwanted jumps:
     });
    }
  }, [messages]);
  
  const memorizedMessages = useMemo(() => messages, [messages.length]);

 return selectedUser ? (
  <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900/80 to-purple-900/20 backdrop-blur-md">
    {/* Header */}
    <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-900/50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-900"></span>
          )}
        </div>
        <div>
          <h2 className="font-medium text-white">{selectedUser.fullName}</h2>
          <p className="text-xs text-gray-400">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-1.5 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
          </svg>
        </button>
        <button 
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-1.5 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    {/* Chat Area */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/30 to-transparent
    scrollbar-thin scrollbar-thumb-gray-700">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.senderId !== authUser._id ? "justify-start" : "justify-end"}`}
        >
          <div className={`max-w-xs md:max-w-md relative group ${msg.senderId !== authUser._id ? "pl-10" : "pr-10"}`}>
            {msg.image ? (
              <div className="rounded-xl overflow-hidden border border-gray-700/50 hover:border-indigo-500/50 transition-colors">
                <img
                  src={msg.image}
                  alt="chat media"
                  className="max-w-full max-h-64 object-cover"
                />
              </div>
            ) : (
              <div
                className={`p-3 rounded-xl ${msg.senderId !== authUser._id 
                  ? "bg-gray-800/60" 
                  : "bg-indigo-600/80"} shadow-lg`}
              >
                <p className="text-white">{msg.text}</p>
              
              </div>
            )}
            <div  className={`absolute top-0 ${msg.senderId !== authUser._id ? "-left-2" : "-right-2"}`}>
              <img
                src={msg.senderId === authUser._id 
                  ? authUser?.profilePic || assets.avatar_icon
                  : selectedUser?.profilePic || assets.avatar_icon}
                alt="avatar"
                className="w-8 h-8 rounded-full border-2 border-gray-800"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">
              {formateMessageTime(msg.createdAt)}
            </p>
          </div>
        </div>
      ))}
      <div ref={scrollEnd} />
    </div>

    {/* Input Area */}
    <div className="flex-shrink-0 p-4 border-t border-gray-700/50 bg-gray-900/20">
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <div className="flex-1 relative">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Type your message..."
            className="w-full bg-gray-700/50 border border-gray-700 rounded-full py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12"
          />
          <label className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <input
              onChange={handleSendImage}
              type="file"
              id="image"
              accept="image/png, image/jpg"
              className="hidden"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </label>
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!input.trim()}
          className={`p-2 rounded-full ${input.trim() 
            ? "bg-indigo-600 text-white hover:bg-indigo-700" 
            : "bg-gray-700 text-gray-500"} transition-colors`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  </div>
) : (
  <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-900/50 to-purple-900/20 p-8 text-center">
    <div className="max-w-xs">
      <img src={assets.logo_icon} className="w-20 mx-auto mb-6 opacity-80" alt="logo" />
      <h2 className="text-2xl font-bold text-white mb-2">QuickChat</h2>
      <p className="text-gray-400 mb-6">Select a conversation to start chatting or create a new one</p>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full font-medium transition-colors">
        New Conversation
      </button>
    </div>
  </div>
);
};

export default ChatContainer;
