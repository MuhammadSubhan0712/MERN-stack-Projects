import React from "react";
import assets from "../assets/assets";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  return (
    <>
      <div>
        <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
          <img
            src={assets.profile_martin}
            alt="profile"
            className="w-8 rounded-full"
          />
          <p>
            Martin Johnson
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </p>
          <img
          onClick={() => }
            src={assets.arrow_icon}
            alt="arrow"
            className="md:hidden max-w-7"
          />
        </div>
      </div>
    </>
  );
};

export default ChatContainer;
