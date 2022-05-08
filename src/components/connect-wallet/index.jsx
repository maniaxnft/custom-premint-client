import React, { useEffect, useState } from "react";
import "./index.css";

import toast from "react-hot-toast";
import { ethers } from "ethers";

import useMetamaskLogin from "./useMetamaskLogin";
import MetamaskLogo from "../../assets/metamask.png";
import { logout } from "../../services";
import disconnect from "../utils/disconnect";

const ConnectWallet = () => {
  const { isConnecting, signAndVerifyMessage, walletAddress } =
    useMetamaskLogin();

  const [wallet, setWallet] = useState("");

  const truncateEthAddress = (address) => {
    const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
    const match = String(address).match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };
  useEffect(() => {
    const checkIfHasEns = async () => {
      try {
        const provider = await ethers.getDefaultProvider();
        const name = await provider.lookupAddress(walletAddress);
        name ? setWallet(name) : setWallet(truncateEthAddress(walletAddress));
      } catch (e) {
        setWallet(truncateEthAddress(walletAddress));
        console.log(e);
      }
    };
    if (walletAddress) {
      checkIfHasEns();
    }
  }, [walletAddress]);

  useEffect(() => {
    window.ethereum.on("accountsChanged", async (accounts) => {
      if (accounts?.length === 0) {
        try {
          await logout();
          disconnect();
        } catch (e) {
          toast.error(e.message);
        }
      }
    });
  }, []);

  return (
    <div
      className={`metamask-button ${isConnecting ? "disabledbutton" : ""}`}
      onClick={signAndVerifyMessage}
    >
      <img className="metamask-button-img" src={MetamaskLogo} alt="metamask" />
      {wallet ? <span className="connectedDot"></span> : <></>}
      <div className="metamask-button-text unselectable">
        {!wallet && !isConnecting && "Connect Metamask"}
        {wallet && `Connected to ${wallet}`}
        {!wallet && isConnecting && "Connecting..."}
      </div>
    </div>
  );
};
export default ConnectWallet;
