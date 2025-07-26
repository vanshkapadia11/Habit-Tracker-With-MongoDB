import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, register } = useAuth();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(username, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-20 justify-self-center container md:w-9/12">
        <form onSubmit={handleSignup} className="flex flex-col rounded-lg">
          <h2 className="text-2xl font-bold text-zinc-800 mb-6 text-center heading1 uppercase">
            Sign Up
          </h2>

          {error && (
            <p className="text-red-400 text-sm mb-4 font-semibold uppercase">
              {error}
            </p>
          )}

          <label
            htmlFor="username"
            className="text-xs font-semibold mb-2 uppercase"
          >
            Enter Your Name
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 border rounded outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset"
            required
          />

          <label
            htmlFor="email"
            className="text-xs font-semibold mb-2 uppercase"
          >
            Enter Your Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset"
            required
          />

          <label
            htmlFor="password"
            className="text-xs font-semibold mb-2 uppercase"
          >
            Enter Your Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border rounded outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset"
            required
          />

          <button
            type="submit"
            className="w-1/2 justify-self-center py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-10 flex justify-center items-center flex-col">
          <h2 className="font-semibold text-lg uppercase mb-5">OR</h2>
          <button
            type="button"
            className="w-1/2 justify-self-center py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
