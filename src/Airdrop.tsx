import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import "./App.css";
import { owlLogo } from "./images";
import { RxCross2 } from "react-icons/rx";
import Modal from "./Modal";
import hyena1 from "./images/hyena1.png";

import { IoMdWallet,  } from "react-icons/io";
import {
  FaChevronRight,
  FaCopy,
  //FaExchangeAlt,
  FaExternalLinkAlt,
  FaInfoCircle
} from "react-icons/fa";

interface AirdropProps {}

const Airdrop: React.FC<AirdropProps> = () => {
  const { userID, points, setTrd } = useUser();
  const [showSetWalletModal, setShowSetWalletModal] = useState(false);
  const [showWhatIsTDR, setShowWhatIsTDR] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [newWalletAddress, setNewWalletAddress] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userID) return;
      setIsLoading(true);
      try {
        const initData = window.Telegram.WebApp.initData || "";
        const response = await fetch(
          `https://93.127.185.85:5000/get_user?UserId=${userID}`,
          {
            headers: {
              "X-Telegram-Init-Data": initData
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            if (data.data.walletid) {
              setWalletAddress(data.data.walletid);
            }
            if (data.data.totalcollectabledaily !== undefined) {
              setTrd(parseInt(data.data.totalcollectabledaily) || 0);
            }
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userID, setTrd]);

  // Handle saving wallet address
  const handleSaveWalletAddress = async () => {
    if (!newWalletAddress.trim()) {
      setModalMessage("Please enter a valid wallet address");
      return;
    }

    try {
      const initData = window.Telegram.WebApp.initData || "";
      const response = await fetch(
        "https://93.127.185.85:5000/update_user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Telegram-Init-Data": initData
          },
          body: JSON.stringify({
            UserId: userID,
            walletid: newWalletAddress.trim()
          })
        }
      );

      if (response.ok) {
        setWalletAddress(newWalletAddress.trim());
        setNewWalletAddress("");
        setShowSetWalletModal(false);
        setModalMessage("Wallet address saved successfully!");
      } else {
        throw new Error("Failed to save wallet address");
      }
    } catch (error) {
      console.error("Error saving wallet address:", error);
      setModalMessage("Failed to save wallet address. Please try again.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setModalMessage("Wallet address copied to clipboard!");
  };

  const closeModal = () => setModalMessage(null);

  return (
    <div className="relative min-h-screen bg-[#1A1A1C] text-[#E2C08D] z-10">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#3E2617]/40 to-transparent z-0"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-[#E2C08D]/20 to-transparent z-0"></div>

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col min-h-screen px-5 py-8">
        {/* Header */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <img 
            src={hyena1} 
            alt="Hyena Wallet Banner" 
            style={{ 
              width: '100%', 
              maxWidth: '700px', 
              height: 'auto', 
              borderRadius: '18px', 
              objectFit: 'cover', 
              boxShadow: '0 4px 24px rgba(62,38,23,0.12)',
            }}
          />
        </div>
        <div className="mb-8 relative">
          <div className="relative flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-1">
              <IoMdWallet className="w-5 h-5 text-[#E53935]" />
              <h1 className="text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E2C08D] to-[#3E2617]  font-[Poppins] animate-gradient-x">
                Wallet & Rewards
              </h1>
            </div>
            <div className="flex items-center justify-center mt-1 space-x-1 bg-[#3E2617]/60 px-3 py-1 rounded-full backdrop-blur-sm">
              <FaInfoCircle className="w-4 h-4 text-[#E2C08D]" />
              <p className="text-sm text-[#F5E3B3]">
                Manage your mining rewards
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Balance Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
            <IoMdWallet className="w-5 h-5 mr-2 text-[#E53935]" />
            Wallet Balance
          </h2>

          {isLoading ? (
            <div className="space-y-2">
              <div className="bg-[#3E2617]/70 backdrop-blur-sm rounded-xl p-4 animate-pulse">
                <div className="h-6 bg-[#2C1B10]/70 rounded w-1/3 mb-4"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#2C1B10]"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-[#2C1B10]/70 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-[#2C1B10]/70 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              <div className="bg-[#3E2617]/70 backdrop-blur-sm rounded-xl p-4 animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#2C1B10]"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-[#2C1B10]/70 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-[#2C1B10]/70 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* HYENA Balance Card */}
              <div className="relative group">
                <div className="absolute -inset-[0.1px] bg-gradient-to-r from-[#7B5E3B]/20 to-[#2C1B10]/20 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-[#2C1B10]/80 backdrop-blur-md rounded-xl border border-[#7B5E3B]/50 p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-[#E2C08D]">HYENA Balance</div>
                    <div className="text-xs text-[#E2C08D] bg-[#7B5E3B]/70 px-2 py-1 rounded-full">
                      Reward Token
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br to-[#E2C08D] via-[#2C1B10] from-[#E2C08D] overflow-hidden">
                          <img
                            src={owlLogo || "/placeholder.svg"}
                            alt="HYENA Token"
                            className="h-11 w-11 object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {points.toLocaleString()}
                        </div>
                        <div className="text-xs text-[#E2C08D] mt-1">
                          Convertible to real value
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Receiving Wallet Section */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
            <IoMdWallet className="w-5 h-5 mr-2 text-[#E53935]" />
            Receiving Wallet
          </h2>

          <div className="relative group">
            <div className="absolute -inset-[0.1px] bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-800/50 p-5 shadow-xl">
              {walletAddress ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Solana Wallet Address
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(walletAddress)}
                        className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <FaCopy className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => setShowSetWalletModal(true)}
                        className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <FaExternalLinkAlt className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-800/70 p-3 rounded-lg border border-gray-700/50 break-all">
                    <p className="text-sm text-gray-300 font-mono">
                      {walletAddress}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowSetWalletModal(true)}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                  >
                    Update Address
                    <FaChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gray-800/70 flex items-center justify-center">
                    <IoMdWallet className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-400 text-center">
                    No wallet address set
                  </p>
                  <button
                    onClick={() => setShowSetWalletModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-medium text-sm flex items-center space-x-1 transition-all duration-300 shadow-lg shadow-purple-900/20"
                  >
                    <IoMdWallet className="w-4 h-4 mr-1" />
                    Set Wallet Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* What is HYENA Modal */}
      {showWhatIsTDR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60">
          <div className="relative w-[90%] max-w-md">
            <div className="absolute -inset-[0.1px] bg-gradient-to-r from-[#7B5E3B]/20 to-[#2C1B10]/20 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-[#2C1B10] rounded-xl border border-[#7B5E3B]/50 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-[#7B5E3B]">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#7B5E3B]/20 flex items-center justify-center">
                    <FaInfoCircle className="w-4 h-4 text-[#E2C08D]" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    What is HYENA?
                  </h2>
                </div>
                <button
                  onClick={() => setShowWhatIsTDR(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#7B5E3B] text-[#E2C08D] hover:bg-[#2C1B10] transition-colors"
                >
                  <RxCross2 size={20} />
                </button>
              </div>

              <div className="p-5">
                <div className="bg-[#7B5E3B]/50 rounded-lg p-4 border border-[#2C1B10]/50">
                  <p className="text-[#E2C08D] leading-relaxed">
                    <span className="text-red-600 text-lg">💎</span> HYENA is
                    the core token of the Mining HYENA mining platform,
                    representing the digital asset value of the platform. It's
                    not only the rewards you earn in the game but also can be
                    used to upgrade mining machines and improve mining
                    efficiency. By continuously earning HYENA, you can convert it
                    to HYENA for additional rewards!
                  </p>
                </div>

                <div className="mt-4 bg-[#2C1B10]/20 rounded-lg p-3 border border-[#7B5E3B]/30">
                  <div className="flex items-center space-x-2 text-[#E2C08D] mb-1">
                    <FaInfoCircle className="w-4 h-4" />
                    <p className="text-sm font-medium">Conversion Rate</p>
                  </div>
                  <p className="text-sm text-[#E2C08D]">1000 HYENA = 1 HYENA</p>
                </div>

                <button
                  onClick={() => setShowWhatIsTDR(false)}
                  className="w-full mt-5 py-3 bg-gradient-to-r from-[#7B5E3B] to-[#2C1B10] hover:from-[#A67C52] hover:to-[#3E2617] rounded-lg text-white font-medium transition-all duration-300 shadow-lg shadow-[#7B5E3B]/20"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Set/Update Wallet Modal */}
      {showSetWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60">
          <div className="relative w-[90%] max-w-md">
            <div className="absolute -inset-[0.1px] bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-gray-900 rounded-xl border border-gray-800/50 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <IoMdWallet className="w-4 h-4 text-[#E53935]" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    {walletAddress
                      ? "Update Wallet Address"
                      : "Set Wallet Address"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowSetWalletModal(false);
                    setNewWalletAddress("");
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
                >
                  <RxCross2 size={20} />
                </button>
              </div>

              <div className="p-5">
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">
                    Solana Wallet Address
                  </label>
                  <textarea
                    value={newWalletAddress}
                    onChange={(e) => setNewWalletAddress(e.target.value)}
                    placeholder="Enter your Solana wallet address"
                    className="w-full min-h-[100px] text-white bg-gray-800 px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E53935] placeholder-gray-500"
                  ></textarea>
                </div>

                <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-800/30 mb-5">
                  <div className="flex items-center space-x-2 text-[#E53935] mb-1">
                    <FaInfoCircle className="w-4 h-4" />
                    <p className="text-sm font-medium">Important</p>
                  </div>
                  <p className="text-sm text-gray-300">
                    Make sure to enter a valid Solana wallet address. Your
                    rewards will be sent to this address.
                  </p>
                </div>

                <button
                  onClick={handleSaveWalletAddress}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-medium transition-all duration-300 shadow-lg shadow-purple-900/20"
                >
                  Save Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Modal */}
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default Airdrop;
