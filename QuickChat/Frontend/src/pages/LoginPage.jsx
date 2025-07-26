import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { FiUser, FiMail, FiLock, FiEdit2, FiArrowLeft } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    bio: "",
  });
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currentState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    setIsSubmitting(true);
    try {
      await login(currentState === "Sign up" ? "signup" : "login", formData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(true);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center  p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
            <div className="p-8">
              <div className="flex justify-center mb-8">
                <img src={assets.logo_big} alt="QuickChat" className="h-16" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                {currentState === "Sign up" ? "Create Account" : "Welcome Back"}
              </h2>

              <form onSubmit={onSubmitHandler}>
                {currentState === "Sign up" && !isDataSubmitted && (
                  <div className="mb-4">
                    <label className="flex items-center bg-gray-800/50 rounded-lg px-4 py-3 border border-gray-700 focus-within:border-indigo-500">
                      <FiUser className="text-gray-400 mr-3" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                        required
                      />
                    </label>
                  </div>
                )}

                {setIsDataSubmitted && (
                  <>
                    <div className="mb-4">
                      <label className="flex items-center bg-gray-800/50 rounded-lg px-4 py-3 border border-gray-700 focus-within:border-indigo-500">
                        <FiMail className="text-gray-400 mr-3" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                          required
                        />
                      </label>
                    </div>

                    <div className="mb-6">
                      <label className="flex items-center bg-gray-800/50 rounded-lg px-4 py-3 border border-gray-700 focus-within:border-indigo-500">
                        <FiLock className="text-gray-400 mr-3" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                          className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                          required
                          minLength="6"
                        />
                      </label>
                    </div>
                  </>
                )}

                {currentState === "Sign up" && isDataSubmitted && (
                  <div className="mb-6">
                    <label className="flex items-start bg-gray-800/50 rounded-lg px-4 py-3 border border-gray-700 focus-within:border-indigo-500">
                      <FiEdit2 className="text-gray-400 mr-3 mt-1" />
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself..."
                        rows="3"
                        className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none resize-none"
                      />
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {currentState === "Sign up"
                        ? "Creating Account ..."
                        : "Logging in..."}
                    </span>
                  ) : currentState === "Sign up" ? (
                    "Continue"
                  ) : (
                    "Login"
                  )}
                </button>

                {isDataSubmitted && currentState === "Sign up" && (
                  <button
                    type="button"
                    onClick={() => setIsDataSubmitted(false)}
                    className="flex items-center justify-center w-full mt-3 text-indigo-400 hover:text-indigo-300">
                    <FiArrowLeft className="mr-2" />
                    Back to previous step
                  </button>
                )}
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                {currentState === "Sign up" ? (
                  <p>
                    Already have an account? {" "}
                    <button
                      onClick={() => {
                        setCurrentState("Login");
                        setIsDataSubmitted(false);
                      }}
                      className="text-indigo-400 hover:text-indigo-300 font-medium">
                      Login here
                    </button>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setCurrentState("Sign up")}
                      className="text-indigo-400 hover:text-indigo-300 font-medium">
                      Sign up
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
