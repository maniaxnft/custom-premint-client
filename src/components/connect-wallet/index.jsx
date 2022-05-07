import React, { useEffect } from "react";
import "./index.css";

import toast from "react-hot-toast";

import useMetamaskLogin from "./useMetamaskLogin";
import MetamaskLogo from "../../assets/metamask.png";
import { logout } from "../../services";
import disconnect from "../utils/disconnect";

const ConnectWallet = () => {
  const { isConnecting, signAndVerifyMessage, walletAddress } =
    useMetamaskLogin();

  const truncateEthAddress = (address) => {
    const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
    const match = String(address).match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

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
      {walletAddress ? <span className="connectedDot"></span> : <></>}
      <div className="metamask-button-text unselectable">
        {!walletAddress && !isConnecting && "Connect Metamask"}
        {walletAddress && `Connected to ${truncateEthAddress(walletAddress)}`}
        {!walletAddress && isConnecting && "Connecting..."}
      </div>
    </div>
  );
};
export default ConnectWallet;
