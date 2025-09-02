/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { FaTrophy, FaCrown, FaUsers, FaChevronUp } from "react-icons/fa";

import medal1 from "./images/medal1.png";
import medal2 from "./images/medal2.png";
import medal3 from "./images/medal3.png";

// Define the fixed color sequence for the first 10 users
const fixedColors = [
  "#E2C08D", // Tan
  "#3E2617", // Brown
  "#F5E3B3", // Cream
  "#E53935", // Red
  "#1A1A1C", // Black
  "#E2C08D", // Tan
  "#3E2617", // Brown
  "#F5E3B3", // Cream
  "#E53935", // Red
  "#1A1A1C" // Black
];

// Define the color for all other users
const defaultColor = "#3E2617";

const LeaderboardPage: React.FC = () => {
  const { userID } = useUser();

  const [ownRanking, setOwnRanking] = useState({
    username: "",
    totalgot: 0,
    position: 0
  });

  const [leaderboardData, setLeaderboardData] = useState<
    Array<{ username: string; totalgot: number; position: number }>
  >([]);
  const [totalUsers, setTotalUsers] = useState("0");

  // Function to save data to localStorage
  const saveToLocalStorage = (key: string, value: any) => {
    const data = {
      value,
      timestamp: new Date().getTime()
    };
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Function to retrieve data from localStorage
  const getFromLocalStorage = (key: string, expiry: number = 5 * 60 * 1000) => {
    const dataString = localStorage.getItem(key);
    if (!dataString) return null;

    const data = JSON.parse(dataString);
    const now = new Date().getTime();

    // Check if data is not expired
    if (now - data.timestamp > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return data.value;
  };

  // Function to get a color for each user based on their position
  const getColorForPosition = (index: number, username: string): string => {
    if (username === ownRanking.username) {
      return "#FFC300";
    }
    return index < 10 ? fixedColors[index] : defaultColor;
  };

  // Function to format numbers with K, M, B suffixes
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Load leaderboard data from localStorage if available
  useEffect(() => {
    const storedLeaderboardData = getFromLocalStorage("leaderboardData");
    const storedOwnRanking = getFromLocalStorage("ownRanking");
    const storedTotalUsers = getFromLocalStorage("totalUsers");

    if (storedLeaderboardData) {
      setLeaderboardData(storedLeaderboardData);
    }
    if (storedOwnRanking) {
      setOwnRanking(storedOwnRanking);
    }
    if (storedTotalUsers) {
      setTotalUsers(storedTotalUsers);
    }

    // Fetch latest leaderboard data from the server
    const fetchLeaderboardData = async () => {
      try {
        const initData = window.Telegram.WebApp.initData || ""; // Get initData from Telegram WebApp
        const response = await fetch(
          `https://93.127.185.85:5000/get_user_ranking?UserId=${userID}`,
          {
            headers: {
              "X-Telegram-Init-Data": initData // Add initData to headers
            }
          }
        );
        const data = await response.json();

        if (data.requested_user) {
          const userRanking = {
            username: data.requested_user.username,
            totalgot: data.requested_user.totalgot,
            position: data.requested_user.position
          };
          setOwnRanking(userRanking);
          saveToLocalStorage("ownRanking", userRanking);
        }

        if (data.top_users) {
          const formattedLeaderboardData = data.top_users.map((user: any) => ({
            username: user.username,
            totalgot: user.totalgot,
            position: user.rank
          }));
          setLeaderboardData(formattedLeaderboardData);
          saveToLocalStorage("leaderboardData", formattedLeaderboardData);
        }

        if (data.total_users) {
          setTotalUsers(data.total_users);
          saveToLocalStorage("totalUsers", data.total_users);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, [userID]);

  // const fakeLeaderboardData = [
  //   { username: "User1", totalgot: 100000, position: 1 },
  //   { username: "User2", totalgot: 90000, position: 2 },
  //   { username: "User3", totalgot: 80000, position: 3 },
  //   { username: "User4", totalgot: 70000, position: 4 },
  //   { username: "User5", totalgot: 60000, position: 5 },
  //   { username: "User6", totalgot: 50000, position: 6 },
  //   { username: "User7", totalgot: 40000, position: 7 },
  //   { username: "User8", totalgot: 30000, position: 8 },
  //   { username: "User9", totalgot: 20000, position: 9 },
  //   { username: "User10", totalgot: 10000, position: 10 }
  // ];

  return (
    <div className="relative min-h-screen bg-[#1A1A1C] z-10 text-[#E2C08D]">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#3E2617]/40 to-transparent z-0"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-[#E2C08D]/20 to-transparent z-0"></div>

      <div className="relative z-10 flex flex-col items-center pt-6 h-[94vh] overflow-y-scroll hide-scrollbar pb-16 px-4">
        {/* Header with glow effect */}
        <div className="mb-6">
          <h1 className="text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E2C08D] to-[#3E2617]  font-[Poppins] animate-gradient-x">
            HYENA Leaderboard
          </h1>
          <div className="flex items-center justify-center mt-1 space-x-1">
            <FaTrophy className="w-4 h-4 text-[#E2C08D]" />
            <p className="text-sm text-[#E2C08D]">
              Top HYENA Miners in the Cosmos
            </p>
          </div>
        </div>

        {/* Current User Card - Glowing Effect */}
        <div className="w-full mb-6 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-[0.2px] bg-gradient-to-r from-[#E2C08D] to-[#3E2617] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>

            <div className="relative bg-gradient-to-br from-[#3E2617] to-[#1A1A1C] rounded-xl border border-[#E2C08D]/40 shadow-lg overflow-hidden">
              {/* Animated gradient background */}
              <div className="h-1 w-full bg-gradient-to-r from-[#E2C08D] via-[#3E2617] to-[#F5E3B3] bg-[length:200%_100%] animate-gradient-x"></div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-[#E2C08D] via-[#3E2617] to-[#F5E3B3] shadow-md shadow-[#3E2617]/10">
                        <span className="text-[#3E2617] font-bold text-xl">
                          {ownRanking.username
                            ? ownRanking.username.slice(0, 2).toUpperCase()
                            : "YO"}
                        </span>
                      </div>
                      <div className="absolute -inset-0.5 border border-[#E2C08D]/30 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-semibold text-[#E2C08D]">
                          {ownRanking.username || "Your Rank"}
                        </p>
                        {ownRanking.position <= 3 && (
                          <FaCrown className="w-4 h-4 text-[#FDF1B6]" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="px-2 py-0.5 bg-[#3E2617]/40 rounded-full border border-[#E2C08D]/30">
                          <p className="text-sm text-[#E2C08D] font-medium">
                            {formatNumber(ownRanking.totalgot)} HYENA
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-[#E2C08D]">
                          <FaChevronUp className="w-3 h-3 text-[#3E2617]" />
                          <span>Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-[0.8px] bg-[#E2C08D]/10 rounded-full blur-sm"></div>
                      <div className="relative bg-[#3E2617] px-3 py-1 rounded-full border border-[#E2C08D]/30">
                        <span className="text-[#E2C08D] font-bold text-xl">
                          #{ownRanking.position || "?"}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-[#E2C08D] mt-1">
                      Your Rank
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Members Card - Glassmorphism */}
        <div className="w-full mb-6 relative">
          <div className="absolute -inset-[0.3px] bg-gradient-to-r from-[#E2C08D]/30 to-[#3E2617]/30 rounded-xl blur-sm"></div>
          <div className="relative bg-[#3E2617]/80 backdrop-blur-sm rounded-xl border border-[#E2C08D]/40 p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#3E2617] rounded-lg">
                  <FaUsers className="w-5 h-5 text-[#E2C08D]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#E2C08D]">Community</h2>
                  <p className="text-xs text-[#E2C08D]">Total HYENA Miners</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[#E2C08D] font-bold text-xl">
                  {totalUsers
                    ? formatNumber(Number.parseInt(totalUsers))
                    : "47.2M+"}
                </span>
                <p className="text-xs text-[#E2C08D]">Active Miners</p>
              </div>
            </div>

            {/* Animated progress bar */}
            <div className="mt-3 h-1.5 w-full bg-[#3E2617] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E2C08D] via-[#3E2617] to-[#F5E3B3] rounded-full animate-pulse"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Leaderboard List - Modern Cards with Hover Effects */}
        <div className="w-full space-y-3 pb-4">
          {leaderboardData.map((user, index) => (
            <div
              key={index}
              className="group relative bg-[#3E2617]/80 rounded-xl p-4 border border-[#E2C08D]/40 shadow-lg transition-all duration-300 hover:bg-[#3E2617]/90 hover:border-[#E2C08D]/60 hover:translate-x-1"
            >
              <div className="flex items-center justify-between">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ring-2 ring-offset-2 ring-offset-[#1A1A1C] ${
                        index === 0
                          ? "ring-[#E2C08D]"
                          : index === 1
                          ? "ring-[#F5E3B3]"
                          : index === 2
                          ? "ring-[#E53935]"
                          : ""
                      }`}
                      style={{
                        backgroundColor: getColorForPosition(
                          index,
                          user.username
                        )
                      }}
                    >
                      <span className="font-bold text-[#1A1A1C] text-sm">
                        {user.username.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    {index < 3 && (
                      <div
                        className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full 
                        flex items-center justify-center shadow-lg ${
                          index === 0
                            ? "bg-[#E2C08D]"
                            : index === 1
                            ? "bg-[#F5E3B3]"
                            : "bg-[#E53935]"
                        }`}
                      >
                        <span className="text-[#3E2617] text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-[#E2C08D]">
                        {user.username}
                      </p>
                      {index === 0 && (
                        <span className="text-xs px-1.5 py-0.5 bg-[#E2C08D]/20 text-[#E2C08D] rounded-full border border-[#E2C08D]/30">
                          Top Miner
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <p className="text-sm text-[#E2C08D] font-medium">
                        {formatNumber(user.totalgot)} HYENA
                      </p>
                      <div className="flex items-center space-x-1">
                        <div className="h-1 w-1 bg-[#E2C08D] rounded-full"></div>
                        <p className="text-xs text-[#E2C08D]">Active Miner</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Position Indicator */}
                <div className="flex items-center">
                  {index < 3 ? (
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-full blur-sm"
                        style={{
                          backgroundColor:
                            index === 0
                              ? "rgba(226, 192, 141, 0.2)"
                              : index === 1
                              ? "rgba(245, 227, 179, 0.2)"
                              : "rgba(229, 57, 53, 0.2)"
                        }}
                      ></div>
                      <img
                        src={
                          index === 0 ? medal1 : index === 1 ? medal2 : medal3
                        }
                        alt={`Rank ${index + 1}`}
                        className="w-8 h-8 object-contain animate-softbounce relative z-10"
                      />
                    </div>
                  ) : (
                    <div className="px-3 py-1 bg-[#3E2617] rounded-full border border-[#E2C08D]/40">
                      <span className="text-[#E2C08D] font-bold text-sm">
                        #{index + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Line */}
              <div
                className="absolute bottom-0  left-1 h-[2px] bg-gradient-to-r from-[#E2C08D] to-[#3E2617]"
                style={{
                  width: `${Math.min((user.totalgot / 100000) * 100, 97)}%`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
