import React, { useEffect, useRef, useState } from "react";
import "./index.css";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import classNames from "classnames";
import ReCAPTCHA from "react-google-recaptcha";

import Logo from "../../assets/twitter.svg";
import { requestTwitterToken, checkTwitterResult } from "../../services";
import initUser from "../utils/initUser";
import setLoading from "../utils/loading";
import clearUrlParams from "../utils/clearUrlParams";

const ConnectTwitter = () => {
  const twitterName = useSelector((state) => state.twitterName);
  const recaptchaRef = useRef(null);

  const [success, setSuccess] = useState(false);

  const showSuccess = () => {
    clearUrlParams();
    setSuccess(true);
    toast.success(`Twitter successfully connected`);
    const canvas = document.getElementById("confetti_twitter");
    const myConfetti = window.confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });
    myConfetti({
      particleCount: 300,
      spread: 400,
    });
    setTimeout(() => {
      window.confetti.reset();
      setSuccess(false);
    }, 1500);
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const twitterCallback = urlParams.get("twitter_callback");
    const authenticate = async () => {
      if (twitterCallback) {
        try {
          setLoading(true);
          await checkTwitterResult();
          await initUser();
          setLoading(false);
          showSuccess();
        } catch (e) {
          setLoading(false);
          toast.error(e.message);
        } finally {
          clearUrlParams();
        }
      }
  
    };
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = async () => {
    if (!twitterName) {
      try {
        setLoading(true);
        const captchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        const oauth_token = await requestTwitterToken(captchaToken);
        if (oauth_token) {
          window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
        } else {
          setLoading(false);
          toast.error("Unexpected error occured");
        }
      } catch (e) {
        setLoading(false);
        toast.error(e.message);
      }
    }
  };

  return (
    <div className="connect_twitter">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
        size="invisible"
      />
      <div
        className={classNames({
          connect_twitter__button: true,
          connect_twitter__button__disabled: twitterName,
        })}
        onClick={onClick}
      >
        <img
          src={Logo}
          alt="twitter"
          className="connect_twitter__button__logo"
        />
        <div className="connect_twitter__button__text">Connect Twitter</div>
      </div>

      {twitterName && (
        <div className="connect_twitter__success">{`- You are successfully connected, ${twitterName}!`}</div>
      )}
      {success && <canvas id="confetti_twitter"></canvas>}
    </div>
  );
};

export default ConnectTwitter;
