import React, { useEffect, useState } from "react";
import "./index.css";

import Main from "../main";
import MobileWarning from "../mobile-warning";

const Body = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="body">{isMobile ? <MobileWarning /> : <Main />}</div>;
};

export default Body;
