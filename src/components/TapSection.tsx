import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../UserContext";
import { dailyReward, owlLogo } from "../images";

interface TapEffect {
  id: number;
  x: number;
  y: number;
}

interface TapSectionProps {
  toggleDailyLogin: () => void;
}

export default function TapSection({ toggleDailyLogin }: TapSectionProps) {
  const { points, setPoints, trd, setTrd, userID } = useUser(); //  ← grab tap‑counter (trd) + id
  const [tapEffects, setTapEffects] = useState<TapEffect[]>([]);
  const [nextId, setNextId] = useState(0);
  const [tapStyle, setTapStyle] = useState({});

  /* ────────────────────────── helpers ────────────────────────── */

  // fire‑and‑forget write‑through so UI stays instant
  const sendTapToBackend = async (
    newPoints: number,
    newClaimedTotal: number
  ) => {
    if (!userID) return; // safety
    const initData = window.Telegram?.WebApp?.initData ?? "";
    try {
      await fetch("https://93.127.185.85:5000/update_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Telegram-Init-Data": initData
        },
        body: JSON.stringify({
          UserId: userID,
          totalgot: newPoints, // lifetime points
          claimedtotal: newClaimedTotal // taps used today
        })
      });
    } catch (err) {
      console.error("Tap sync failed:", err);
    }
  };

  /* ────────────────────────── tap handler ────────────────────────── */

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (trd >= 1000) {
      toast.error("Daily tap limit reached!");
      return;
    }

    /* tilt effect -------------------------------------------------- */
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - centerX) / centerX) * 20;
    const rotateX = ((centerY - y) / centerY) * 20;

    setTapStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 100ms ease"
    });
    setTimeout(
      () =>
        setTapStyle({
          transform: "rotateX(0deg) rotateY(0deg)",
          transition: "transform 150ms ease"
        }),
      100
    );

    /* local state -------------------------------------------------- */
    const newPoints = points + 1;
    const newClaimedTotal = trd + 1;
    setPoints(newPoints);
    setTrd(newClaimedTotal);

    /* backend write‑through --------------------------------------- */
    sendTapToBackend(newPoints, newClaimedTotal);

    /* floating "+1" ----------------------------------------------- */
    const id = nextId;
    setNextId(id + 1);
    setTapEffects((prev) => [...prev, { id, x, y }]);
    setTimeout(
      () => setTapEffects((prev) => prev.filter((eff) => eff.id !== id)),
      1000
    );
  };

  /* ────────────────────────── render ────────────────────────── */

  const tapsRemaining = 1000 - trd;
  const barPct = (tapsRemaining / 1000) * 100;

  return (
    <div className="flex flex-col gap-5 justify-between py-5 items-center w-full h-full">
      <div className="flex items-center justify-center relative gap-2">
        <div className="h-[41px] w-[41px] rounded-full flex items-center justify-center bg-gradient-to-br to-[#E2C08D] via-[#2C1B10] from-[#E2C08D] overflow-hidden">
          <img
            src={owlLogo}
            alt="HYENA Token"
            className="h-[38px] w-[38px] object-cover rounded-full"
          />
        </div>
        <div className="flex items-center text-white   text-[30px] font-bold rounded-full  shadow-lg">
          {points.toLocaleString()}
          <span className="text-[30px] text-white ml-1 font-bold">HYENA</span>
        </div>
      </div>

      {/* logo + tap‑area */}
      <div
        className="relative w-full max-w-xs mt-6 rounded-full perspective-[800px]"
        onClick={handleTap}
      >
        <img
          src={owlLogo}
          alt="Tap"
          style={tapStyle}
          className="w-full h-auto rounded-full border border-[#E2C08D] cursor-pointer select-none"
        />
        {tapEffects.map((eff) => (
          <span
            key={eff.id}
            className="absolute text-white font-bold text-[40px] animate-float"
            style={{ left: eff.x, top: eff.y }}
          >
            +1
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2 items-center w-full px-3">
        {/* Progress Bar - Mobile Optimized */}
        <div className="flex items-center gap-2 w-full max-w-[400px] px-3 py-2 bg-[#3E2617]/80 rounded-full border border-[#E2C08D]/30 shadow-md">
          <div className="flex-1 h-3 bg-[#1A1A1C] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#E2C08D] to-[#3E2617] transition-all duration-300"
              style={{ width: `${barPct}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#E2C08D]/20 to-transparent" />
            </div>
          </div>
          <span className="text-sm font-semibold text-[#E2C08D] min-w-[70px] text-center">
            {tapsRemaining}/1000
          </span>
        </div>

        {/* Daily Reward Button - Mobile Friendly */}
        <div className="w-full max-w-[400px] relative active:scale-95 transition-transform">
          <button
            onClick={toggleDailyLogin}
            className="w-full py-3 px-4 text-[#3E2617] font-bold flex items-center justify-center bg-gradient-to-br from-[#E2C08D] to-[#3E2617] rounded-xl border-2 border-[#E2C08D]/50 shadow-lg shadow-[#3E2617]/30"
          >
            <div className="flex items-center  gap-2">
              <img
                src={dailyReward}
                className="w-8 h-8 "
                alt="Daily Reward"
              />
              <span className="font-bold text-base">Daily Reward</span>
              {/* Notification Badge */}
              <div className="flex items-center">
                <span className="relative flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E53935] opacity-75" />
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-[#E53935] text-sm items-center justify-center font-bold"></span>
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
