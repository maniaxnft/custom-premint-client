import React, { useEffect, useRef } from "react";
import "./index.css";

import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";

import useMetamaskLogin from "./useMetamaskLogin";
import MetamaskLogo from "../../assets/metamask.png";
import { logout } from "../../services";
import disconnect from "../../utils/disconnect";
import setLoading from "../../utils/loading";

const ConnectWallet = () => {
  const { setIsConnecting, isConnecting, signAndVerifyMessage, walletAddress } =
    useMetamaskLogin();
  const recaptchaRef = useRef(null);
  const isMobile = useSelector((state) => state.isMobile);

  const truncateEthAddress = (address) => {
    const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
    const match = String(address).match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  const onClick = async (e) => {
    if (!walletAddress && !isMobile) {
      try {
        setIsConnecting(true);
        setLoading(true);
        const captchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        await signAndVerifyMessage(captchaToken);
        setLoading(false);
      } catch (e) {
        setIsConnecting(false);
        setLoading(false);
        toast.error(e.message);
      }
    }
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
      onClick={onClick}
    >
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
        size="invisible"
      />
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
