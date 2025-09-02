import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  bronzeLeague,
  diamondLeague,
  eliteLeague,
  goldLeague,
  grandmasterLeague,
  legendaryLeague,
  masterLeague,
  mythicLeague,
  platinumLeague,
  silverLeague,
  woodLeague
} from "../images";

// League data
const leagues = [
  {
    name: "Wood League",
    description: "Your number of shares determines the league you enter.",
    requirement: "from 0",
    image: woodLeague
  },
  {
    name: "Bronze League",
    description: "Your number of shares determines the league you enter.",
    requirement: "40 / 5 000",
    image: bronzeLeague
  },
  {
    name: "Silver League",
    description: "Your number of shares determines the league you enter.",
    requirement: "From 5 000",
    image: silverLeague
  },
  {
    name: "Gold League",
    description: "Your number of shares determines the league you enter.",
    requirement: "From 50 000",
    image: goldLeague
  },
  {
    name: "Platinum League",
    description: "Your number of shares determines the league you enter.",
    requirement: "From 250 000",
    image: platinumLeague
  },
  {
    name: "Diamond League",
    description: "Your number of shares determines the league you enter.",
    requirement: "From 500 000",
    image: diamondLeague
  },
  {
    name: "Master League",
    description: "Your number of shares determines the league you enter.",
    requirement: "From 1 000 000",
    image: masterLeague
  },
  {
    name: "Elite League",
    description: "Your number of shares determines the league you enter.",
    requirement: "From 5 000 000",
    image: eliteLeague
  },
  {
    name: "Grandmaster League",
    description: "Your number of shares determines the league you enter.",
    requirement: "From 2 500 000",
    image: grandmasterLeague
  },
  {
    name: "Legendary League",
    description: "Your number of shares determines the league you enter.",
    requirement: "From 10 000 000",
    image: legendaryLeague
  },
  {
    name: "Mythic League",
    description: "Your number of shares determines the league you enter.",
    requirement: "From 50 000 000",
    image: mythicLeague
  }
];

export default function LeagueSlider() {
  const [mounted, setMounted] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen px-4 flex items-center justify-center bg-gradient-to-b from-[#1E1E2F] to-[#1E1E2F]">
      <div className="w-full max-w-md">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="league-slider"
        >
          {leagues.map((league, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {league.name}
                </h2>
                <p className="text-sm text-gray-300 mb-6">
                  {league.description}
                </p>
                <div className="relative w-48 h-48 mb-6">
                  <img
                    src={league.image || "/placeholder.svg"}
                    alt={league.name}
                    className="object-contain"
                    // priority={index === 0}
                  />
                </div>
                <p className="text-xl font-semibold text-white">
                  {league.requirement}
                </p>
              </div>
            </SwiperSlide>
          ))}
          <div
            className={`swiper-button-prev custom-swiper-button  !text-white !opacity-70 hover:!opacity-100 !left-0 ${
              isBeginning ? "hidden" : ""
            }`}
          ></div>
          <div
            className={`swiper-button-next !text-white !opacity-70 hover:!opacity-100 !right-0 ${
              isEnd ? "hidden" : ""
            }`}
          ></div>
        </Swiper>
      </div>
    </div>
  );
}
