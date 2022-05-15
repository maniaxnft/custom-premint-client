import React, { useEffect } from "react";
import "./index.css";

import { useSelector, useDispatch } from "react-redux";
import detectEthereumProvider from "@metamask/detect-provider";
import toast from "react-hot-toast";

import { ACTIONS } from "../../store/actions";
import ConnectDiscord from "../connect-discord";
import ConnectTwitter from "../connect-twitter";
import Dashboard from "../dashboard";
import Loading from "../loading";

const Main = () => {
  const dispatch = useDispatch();
  const isMetamaskPresent = useSelector((state) => state.isMetamaskPresent);
  const walletAddress = useSelector((state) => state.walletAddress);
  const twitterName = useSelector((state) => state.twitterName);
  const discordName = useSelector((state) => state.discordName);
  const loading = useSelector((state) => state.loading);
  const connectionSuccess = useSelector((state) => state.connectionSuccess);

  const checkIfMetamaskPresent = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      dispatch({
        type: ACTIONS.IS_METAMASK_PRESENT,
        payload: {
          data: true,
        },
      });
      startApp(provider);
    } else {
      dispatch({
        type: ACTIONS.IS_METAMASK_PRESENT,
        payload: {
          data: false,
        },
      });
    }
    function startApp(provider) {
      if (provider !== window.ethereum) {
        toast.error("Do you have multiple wallets installed?");
      }
    }
  };

  const onSuccess = () => {
    const canvas = document.getElementById("confetti");
    const confetti = window.confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });
    confetti({
      particleCount: 1000,
      spread: 2880,
    });
    setTimeout(() => {
      window.confetti.reset();
      dispatch({
        type: ACTIONS.CONNECTION_SUCCESS,
        payload: {
          data: false,
        },
      });
    }, 1500);
  };

  useEffect(() => {
    if (connectionSuccess) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionSuccess]);

  useEffect(() => {
    checkIfMetamaskPresent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
      {loading && <Loading />}
      {connectionSuccess && (
        <canvas
          id="confetti"
          width={`${window.innerWidth}px`}
          height={`${window.innerHeight}px`}
        ></canvas>
      )}
      <div className="main__content">
        <div className="main__content__title">
          {!isMetamaskPresent && <>You need to install Metamask to get </>}
          {isMetamaskPresent && (
            <>Connect your Metamask, Discord and Twitter to get </>
          )}
          <span className="main__content__title__highlight">
            Special Roles in {process.env.REACT_APP_PROJECT_NAME} Discord!
          </span>
        </div>
        <div className="main__content__connect">
          {walletAddress && <ConnectDiscord />}
          {walletAddress && <ConnectTwitter />}
          {twitterName && discordName && <Dashboard />}
        </div>
      </div>
    </div>
  );
};

export default Main;
