import React, { useEffect, useRef } from "react";
import "./index.css";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

import Logo from "../../assets/twitter.svg";
import { requestTwitterToken, checkTwitterResult } from "../../services";
import setLoading from "../../utils/loading";
import clearUrlParams from "../../utils/clearUrlParams";
import { ACTIONS } from "../../store/actions";

const ConnectTwitter = () => {
  const twitterName = useSelector((state) => state.twitterName);
  const dispatch = useDispatch();
  const recaptchaRef = useRef(null);

  const showSuccess = () => {
    clearUrlParams();
    toast.success(`Twitter successfully connected`);
    dispatch({
      type: ACTIONS.CONNECTION_SUCCESS,
      payload: {
        data: true,
      },
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const twitterCallback = urlParams.get("twitter_callback");
    const authenticate = async () => {
      if (twitterCallback) {
        try {
          setLoading(true);
          await checkTwitterResult();
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
  };

  return (
    <div className="connect_twitter">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
        size="invisible"
      />
      <div
        className="connect_twitter__button"
        onClick={onClick}
      >
        <img
          src={Logo}
          alt="twitter"
          className="connect_twitter__button__logo"
        />
        <div className="connect_twitter__button__text">
        {twitterName ? "Connect Again" : " Connect Twitter"}</div>
      </div>
      {twitterName && (
        <div className="connect_twitter__success">{`- You are successfully connected, ${twitterName}!`}</div>
      )}
    </div>
  );
};

export default ConnectTwitter;
