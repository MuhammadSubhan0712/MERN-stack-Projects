import { Home, List, Settings, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", path: "/dashobard", icon: Home },
  { name: "Task", path: "/task", icon: List },
  { name: "Profile", path: "/profile", icon: User },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r dark:border-gray-700 bg-white dark bg-gray-800">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Task Manager
              </span>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.path
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}>
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-shrink-0 flex border-t dark:border-gray-700 p-4">
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full justify-start">
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
