import React, { useEffect, useState, useRef } from "react";
import "./index.css";

import toast from "react-hot-toast";

import useMetamaskLogin from "./useMetamaskLogin";
import MetamaskLogo from "../../assets/metamask.png";
import { logout } from "../../services";
import disconnect from "../utils/disconnect";
import ReCAPTCHA from "react-google-recaptcha";

const ConnectWallet = () => {
  const { setIsConnecting, isConnecting, signAndVerifyMessage, walletAddress } =
    useMetamaskLogin();
  const recaptchaRef = useRef(null);

  const [wallet, setWallet] = useState("");

  const truncateEthAddress = (address) => {
    const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
    const match = String(address).match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  const onClick = async (e) => {
    try {
      setIsConnecting(true)
      const captchaToken = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      await signAndVerifyMessage(captchaToken);
    } catch (e) {
      setIsConnecting(false)
      toast.error(e.message);
    }
  };
  useEffect(() => {
    if (walletAddress) {
      setWallet(truncateEthAddress(walletAddress));
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
      onClick={onClick}
    >
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
        size="invisible"
      />
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
