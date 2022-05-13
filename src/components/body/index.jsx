import React, { useEffect, useState } from "react";
import "./index.css";

import { useDispatch } from "react-redux";

import Main from "../main";
import MobileWarning from "../mobile-warning";
import { ACTIONS } from "../../store/actions";

const Body = () => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch()

  const handleWindowSizeChange = () => {
    dispatch({
      type: ACTIONS.IS_MOBILE,
      payload: {
        data: window.innerWidth <= 768,
      },
    });
    setIsMobile(window.innerWidth <= 768);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return <div className="body">{isMobile ? <MobileWarning /> : <Main />}</div>;
};

export default Body;
