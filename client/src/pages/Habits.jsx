import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";

const Habits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const { data } = await axios.get(`/api/habits`);
        setHabits(data); // expects an array of habits
      } catch (error) {
        console.error("Failed to load habits:", error);
      }
    };
    if (user?._id) fetchHabits();
  }, [user]);

  return (
    <>
      <h2 className="text-2xl font-semibold uppercase heading2 mb-8">
        Your Habits
      </h2>
      <div className="grid grid-cols-1 gap-10">
        {habits.map((habit) => (
          <div
            className={`${habit.color} w-full ring-1 ring-inset ring-[#e8e8e8] shadow-lg backdrop-blur-sm rounded-lg p-6`}
            key={habit._id}
          >
            <h2 className="text-lg font-semibold uppercase mb-2">
              {habit.title}
            </h2>
            <h2 className="text-xs font-semibold uppercase line-clamp-2">
              {habit.desc}
            </h2>
            <button
              type="button"
              className="md:w-9/12 w-full mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all flex items-center justify-center gap-2"
              onClick={() => navigate(`/Habit/${habit._id}`)}
            >
              Check analytics
              <span className="material-symbols-rounded text-emerald-400">
                analytics
              </span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Habits;
