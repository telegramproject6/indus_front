import React from "react";
import { owlLogo } from "./images";

const sparkles = Array.from({ length: 18 });

const LoadingScreen: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #3E2617 0%, #E2C08D 50%, #E53935 100%)" }}>
      {/* Animated floating hyena logo */}
      <div className="relative flex flex-col items-center z-10 mb-5 w-full">
        <img
          src={owlLogo}
          alt="hyena"
          className="w-40 h-40 rounded-full animate-bounce shadow-2xl border-4 border-[#E2C08D] bg-[#1A1A1C]/80 p-2"
          style={{ animation: "floatLogo 2.5s ease-in-out infinite" }}
        />
      </div>
      {/* Animated Spinner */}
      <div className="z-20 mt-2">
        <div className="custom-spinner"></div>
      </div>
      {/* Sparkles/Particles */}
      {sparkles.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-70 animate-sparkle"
          style={{
            width: `${8 + Math.random() * 12}px`,
            height: `${8 + Math.random() * 12}px`,
            background: `radial-gradient(circle, #F5E3B3 60%, #E2C08D 100%)`,
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatLogo {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-24px); }
        }
        @keyframes sparkle {
          0% { opacity: 0.7; transform: scale(1) translateY(0); }
          50% { opacity: 1; transform: scale(1.2) translateY(-10px); }
          100% { opacity: 0.7; transform: scale(1) translateY(0); }
        }
        .animate-sparkle {
          animation: sparkle 2.5s infinite ease-in-out;
        }
        .custom-spinner {
          width: 64px;
          height: 64px;
          border: 6px solid #E2C08D;
          border-top: 6px solid #E53935;
          border-right: 6px solid #3E2617;
          border-bottom: 6px solid #F5E3B3;
          border-left: 6px solid #1A1A1C;
          border-radius: 50%;
          animation: spin 1.2s linear infinite;
          box-shadow: 0 0 24px #E2C08D44;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
