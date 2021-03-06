import React, { useEffect } from "react";
import "./index.css";

import { useSelector, useDispatch } from "react-redux";
import detectEthereumProvider from "@metamask/detect-provider";
import toast from "react-hot-toast";

import { ACTIONS } from "../../store/actions";
import ConnectDiscord from "../connect-discord";
import ConnectTwitter from "../connect-twitter";
import Dashboard from "../dashboard";

const Main = () => {
  const dispatch = useDispatch();
  const isMetamaskPresent = useSelector((state) => state.isMetamaskPresent);
  const walletAddress = useSelector((state) => state.walletAddress);
  const twitterName = useSelector((state) => state.twitterName);
  const discordName = useSelector((state) => state.discordName);

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

  useEffect(() => {
    checkIfMetamaskPresent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
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
