import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Button from "../UI/button";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <header className="bg-white shadow-sm dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex itms-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Task Manager
              </span>
            </Link>

            <nav className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost">Dashobard</Button>
                  </Link>

                  <Link to="/tasks">
                    <Button variant="ghost">Tasks</Button>
                  </Link>

                  <Button onClick={logout} variant="outline">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline">Sign Up</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
