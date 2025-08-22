import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import ReactCanvasConfetti from "react-canvas-confetti";
import axios from "../utils/api";

const HabitDetails = () => {
  const { habitId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const confettiRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");

  const priorityColors = {
    "green-500": "bg-green-500",
    "amber-500": "bg-amber-500",
    "rose-500": "bg-rose-500",
  };
  const priorityArray = [
    ["green-500", "low"],
    ["amber-500", "medium"],
    ["rose-500", "high"],
  ];

  const fireConfetti = useCallback(() => {
    if (confettiRef.current) {
      confettiRef.current({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, []);

  // Fetch single habit
  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const { data } = await axios.get(`/api/habits/${habitId}`);
        // console.log("habit.priority:", habit.priority[1]);
        if (data.user !== user._id) {
          navigate("/"); // unauthorized
        } else {
          setHabit(data);
        }
      } catch (error) {
        console.error("Error fetching habit:", error);
        navigate("/");
      }
    };
    if (user?._id) fetchHabit();
  }, [habitId, user?._id, navigate]);

  // Completion check
  const isCompleted = habit?.planner?.every(Boolean);
  const remainingDays = habit?.planner
    ? 21 - habit.planner.filter(Boolean).length
    : 21;

  useEffect(() => {
    if (isCompleted) fireConfetti();
  }, [isCompleted, fireConfetti]);

  // Toggle single day
  const toggleDay = async (index) => {
    try {
      const updatedPlanner = [...habit.planner];
      updatedPlanner[index] = !updatedPlanner[index];

      setHabit({ ...habit, planner: updatedPlanner });

      // Backend expects index in body
      await axios.patch(`/api/habits/${habitId}`, { id: index });
    } catch (error) {
      console.error("Toggle failed:", error);
    }
  };

  // Save edited habit
  const saveEdit = async () => {
    try {
      console.log();
      const updatedHabit = {
        ...habit,
        title: editedTitle,
        desc: editedDesc,
        priority: selectedPriority,
      };
      setHabit(updatedHabit);
      setIsEditing(false);

      await axios.patch(`/api/habits/${habitId}`, {
        title: editedTitle,
        desc: editedDesc,
        priority: selectedPriority,
      });
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  // Delete habit
  const deleteHabit = async () => {
    await axios.delete(`/api/habits/${habitId}`);
    navigate("/");
  };

  if (!habit) return null;

  return (
    <>
      <ReactCanvasConfetti
        refConfetti={(instance) => (confettiRef.current = instance)}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 uppercase">Delete Habit?</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300 font-semibold uppercase">
              Are you sure you want to permanently delete this habit?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-1/2 mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm uppercase hover:scale-105 transition-all text-blue-400"
              >
                Cancel
              </button>
              <button
                onClick={deleteHabit}
                className="w-1/2 mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm uppercase hover:scale-105 transition-all text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl w-[90%] max-w-md shadow-xl">
            <h2 className="text-xl font-bold uppercase mb-6">Edit Habit</h2>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full uppercase p-3 mb-6 border rounded-lg outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset"
              required
            />
            <textarea
              rows={10}
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
              className="w-full uppercase p-3 mb-6 border rounded-lg outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset"
              required
            />
            <div className="mb-10 flex flex-wrap gap-3">
              {priorityArray.map((item) => (
                <div
                  key={item[0]}
                  onClick={() => setSelectedPriority(item)}
                  className={`bg-${
                    item[0]
                  } w-fit px-3 py-2 rounded-lg cursor-pointer text-sm font-semibold uppercase text-white
    ${
      selectedPriority[0] === item[0]
        ? "border border-black dark:border-white scale-110"
        : "border-transparent"
    }
    transition-all duration-200`}
                >
                  {item[1]}
                </div>
              ))}
            </div>
            <div className="flex gap-2 w-full justify-center items-center">
              <button
                onClick={() => setIsEditing(false)}
                className="w-1/2 mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm uppercase hover:scale-105 transition-all text-red-400"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="w-1/2 mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm uppercase hover:scale-105 transition-all text-green-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="container flex flex-col justify-between">
        <div className="mt-10">
          <button
            onClick={() => navigate(-1)}
            className="md:w-3/12 w-8/12 mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all flex items-center justify-center gap-2"
          >
            Back
            <span className="material-symbols-rounded text-red-400">
              arrow_back
            </span>
          </button>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold uppercase heading2">
            {habit.title}
          </h2>
          <p className="text-sm font-semibold uppercase heading1 mt-2 mb-10">
            {habit.desc}
          </p>
          <span
            className={`${priorityColors[habit.priority[0]] || "bg-gray-400"} 
              text-white text-sm font-semibold uppercase px-3 py-1 rounded-lg`}
          >
            {habit.priority[1]}
          </span>
        </div>

        {!isCompleted ? (
          <div className="flex gap-4 md:w-1/2 my-6">
            <button
              className="md:w-9/12 w-full mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 transition-all text-blue-400 flex items-center justify-center gap-3"
              onClick={() => {
                setIsEditing(true);
                setEditedDesc(habit.desc);
                setEditedTitle(habit.title);
              }}
            >
              Edit
              <span className="material-symbols-rounded text-blue-400">
                format_list_bulleted_add
              </span>
            </button>
            <button
              className="md:w-9/12 w-full mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 transition-all text-red-400 flex items-center justify-center gap-3"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
              <span className="material-symbols-rounded text-red-400">
                backspace
              </span>
            </button>
          </div>
        ) : (
          <button className="md:w-9/12 w-full mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase cursor-default transition-all text-green-600 flex items-center justify-center gap-3">
            let's go you did it!!!!
            <span className="material-symbols-rounded ">taunt</span>
          </button>
        )}

        <div className="mt-10">
          {!isCompleted ? (
            <p className="text-sm text-gray-600 justify-self-center uppercase font-semibold">
              Keep going! Only{" "}
              <span className="font-bold text-green-400">{remainingDays}</span>{" "}
              day{remainingDays > 1 ? "s" : ""} left!
            </p>
          ) : (
            <p className="text-sm text-green-500 font-bold mt-5 uppercase justify-self-center">
              🎉 Congratulations! You've completed this habit!
            </p>
          )}
        </div>

        {/* 21-day tracker */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold uppercase mb-4">
            21-Day Progress Tracker
          </h2>
          <div className="grid grid-cols-7 gap-4">
            {habit.planner.map((done, index) => (
              <button
                key={index}
                onClick={() => toggleDay(index)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold text-sm transition-all duration-300 ${
                  done
                    ? "bg-green-500 text-white"
                    : `${habit.color || "bg-gray-200"}`
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Footer />
        </div>
      </section>
    </>
  );
};

export default HabitDetails;
