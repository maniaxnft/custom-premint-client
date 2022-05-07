import React, { useEffect } from "react";
import "./App.css";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Toaster } from "react-hot-toast";

import initUser from "./utils/initUser";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";

const App = () => {
  useEffect(() => {
    initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_PUBLIC_RECAPTCHA_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <Toaster />
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default App;
