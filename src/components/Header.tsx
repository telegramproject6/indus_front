import React from "react";
import {   walletImage, woodLeague } from "../images";

import { FaAngleRight } from "react-icons/fa6";
import { useTonConnectUI } from "@tonconnect/ui-react";

interface HeaderProps {
  address: string;
  onShowDailyLogin: () => void;
  setActivePage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  address,
  setActivePage
}) => {
  const [tonConnectUI] = useTonConnectUI();

  return (
    <header className="relative w-full px-3 mt-4   ">
      <div className="flex flex-row items-center justify-between w-full ">
        <div className="p-1 rounded-lg bg-[#342B48] border border-[#433754]">
          <button
            onClick={() => setActivePage("league")}
            className="self-start p-1.5 rounded-full text-xs text-white flex gap-2 justify-center items-center"
          >
            <img src={woodLeague} className="w-[24px] h-[24px]" alt="" />
            Wood <FaAngleRight />
          </button>
        </div>

        <div className="p-1 rounded-lg bg-[#342B48] border border-[#433754]">
          <button
            onClick={() => {
              if (address) {
                tonConnectUI.disconnect();
              } else {
                tonConnectUI.connectWallet();
              }
            }}
            // className="flex items-center justify-center"
            className="flex items-center justify-center p-1.5   rounded-full shadow-md transition-all"
          >
            {address ? (
              <span className="text-white text-xs font-bold px-2">
                Disconnect
              </span>
            ) : (
              <>
                <img src={walletImage} className="w-[24px] h-[24px]" alt="" />
                <span className="text-white flex items-center gap-1 text-xs font-bold px-2">
                  Connect Wallet
                  <FaAngleRight />
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
