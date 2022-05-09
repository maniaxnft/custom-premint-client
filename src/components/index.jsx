import React, { useEffect } from "react";

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
    <div>
      <Toaster />
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    </div>
  );
};

export default App;
