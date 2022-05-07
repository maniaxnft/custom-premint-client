import React, { useEffect } from "react";
import "./App.css";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Toaster } from "react-hot-toast";

import Header from "./header/Header";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import initUser from "./utils/initUser";

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
