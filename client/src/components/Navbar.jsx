import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // AuthContext se logout le rahe hain
  const [isDark, setIsDark] = useState(() => {
    return localStorage.theme === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleLogout = () => {
    logout(); // Context se user logout
    navigate("/login"); // login page par bhej de
  };

  return (
    <>
      <section className="container">
        <div className="flex justify-between items-center py-6 px-3">
          <div>
            <span className="material-symbols-rounded text-2xl font-semibold">
              360
            </span>
          </div>
          <div>
            <nav>
              <ul className="flex items-center text-sm font-semibold space-x-4 justify-center ring-1 ring-inset dark:bg-[#242424] dark:ring-[#2a2a2a] ring-[#e8e8e8] bg-[#f9f9f9] transition-all py-2 px-4 rounded-xl">
                {user ? (
                  <>
                    <li
                      className="uppercase cursor-pointer"
                      onClick={() => navigate("/dashboard")}
                    >
                      home
                    </li>
                    <li
                      className="uppercase text-base text-red-500 font-semibold cursor-pointer material-symbols-rounded"
                      onClick={handleLogout}
                    >
                      logout
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className="uppercase cursor-pointer"
                      onClick={() => navigate("/signup")}
                    >
                      signup
                    </li>
                    <li
                      className="uppercase cursor-pointer"
                      onClick={() => navigate("/login")}
                    >
                      login
                    </li>
                  </>
                )}
                <li className="link">
                  <span
                    className="material-symbols-rounded text-lg font-semibold"
                    onClick={() => setIsDark(!isDark)}
                  >
                    {isDark ? "backlight_high" : "bedtime"}
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
