import React, { useState } from "react";
import assets from "../assets/assets";
const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign up");

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex items-center 
    justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
        {/* Left side */}
        <img
          src={assets.logo_big}
          alt="logo"
          className="w-[min-(30vw, 250px)]"
        />

        {/* Right side */}
        <form
          className="border-2 bg-white/8 text-white border-gray-500 p-6 flex 
        flex-col gap-6 rounded-lg shadow-lg">
          <h2 className="font-medium text-2xl flex justify-between items-center">
            {currentState}
            <img
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          </h2>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
