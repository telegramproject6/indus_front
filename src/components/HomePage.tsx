import { useState, useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import { FiZap } from "react-icons/fi";
import Button from "./ui/Button";


// import Image from "next/image"
// import { Calendar, Zap } from "lucide-react"
// import { Button } from "@/components/ui/button"

interface HomePageProps {
  onShowDailyLogin: () => void;
}

export default function HomePage({ onShowDailyLogin }: HomePageProps) {
  const [rotation, setRotation] = useState(0);

  // Rotate the fan continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <button
        onClick={onShowDailyLogin}
        className="self-start p-2 text-gray-500"
      >
        <BiCalendar size={24} />
      </button>

      <div className="relative flex items-center justify-center w-64 h-64 mt-8 mb-8">
        <div
          className="absolute w-full h-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.1s linear",
          }}
        >
          <img
            src="/fan.png"
            alt="Mining Fan"
            width={256}
            height={256}
            className="w-full h-full"
          />
        </div>
        <div className="absolute flex items-center justify-center w-16 h-16 bg-black rounded-full">
          <img
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </div>
      </div>

      <div className="text-4xl font-bold mb-1">0.00008505 SOL</div>
      <div className="flex items-center gap-2 mb-8 text-gray-600">
        Hashrate: 3 GH/s <FiZap className="text-yellow-400" size={16} />
      </div>

      <div className="grid w-full grid-cols-2 gap-4 mb-8">
        <Button
          // variant="outline"
          className="h-12 text-lg text-purple-600 border-gray-300"
        >
          Claim
        </Button>
        <Button className="h-12 text-lg bg-purple-600 hover:bg-purple-700">
          Booster
        </Button>
      </div>

      <div className="w-full mb-4">
        <h2 className="mb-1 text-2xl font-bold">Invite friends</h2>
        <p className="mb-4 text-gray-600">
          +1000 $MSOL for each friend you invite
        </p>

        <div className="grid grid-cols-6 gap-2">
          {["telegram", "whatsapp", "messenger", "line", "twitter", "link"].map(
            (platform) => (
              <button
                key={platform}
                className="flex items-center justify-center p-2 bg-blue-500 rounded-lg"
              >
                <img
                  src={`/${platform}.png`}
                  alt={platform}
                  width={32}
                  height={32}
                />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
