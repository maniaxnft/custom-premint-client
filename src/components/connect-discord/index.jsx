import React, { useEffect, useRef } from "react";
import "./index.css";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

import Logo from "../../assets/discord.svg";
import { authenticateDiscord } from "../../services";
import setLoading from "../../utils/loading";
import initUser from "../../utils/initUser";
import clearUrlParams from "../../utils/clearUrlParams";
import { ACTIONS } from "../../store/actions";

const ConnectDiscord = () => {
  const discordName = useSelector((state) => state.discordName);
  const dispatch = useDispatch();
  const recaptchaRef = useRef(null);

  const onClick = () => {
    window.location.replace(process.env.REACT_APP_DISCORD_AUTH_URL);
  };

  const showSuccess = () => {
    setLoading(false);
    clearUrlParams();
    toast.success(`Discord successfully connected, ${discordName}`);
    dispatch({
      type: ACTIONS.CONNECTION_SUCCESS,
      payload: {
        data: true,
      },
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const authenticate = async () => {
      if (code) {
        try {
          setLoading(true)
          const captchaToken = await recaptchaRef.current.executeAsync();
          recaptchaRef.current.reset();
          await authenticateDiscord({ code, captchaToken });
          await initUser();
          showSuccess();
        } catch (e) {
          toast.error(e.message);
        } finally {
          setLoading(false);
          clearUrlParams();
        }
      }
    };
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <div className="connect_discord">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
        size="invisible"
      />
      <div className="connect_discord__button" onClick={onClick}>
        <img
          src={Logo}
          alt="discord"
          className="connect_discord__button__logo"
        />
        <div className="connect_discord__button__text">
          {discordName ? "Connect Again" : "Connect Discord"}
        </div>
      </div>
      {discordName && (
        <div className="connect_discord__success">
          {`- You are successfully connected `} <b>{discordName}!</b>
        </div>
      )}
    </div>
  );
};

export default ConnectDiscord;
