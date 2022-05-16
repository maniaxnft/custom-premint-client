import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import initUser from "./utils/initUser";
import Header from "./header";
import Body from "./body";
import Events from "./events";
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
        <Router>
          <Routes>
            <Route exact path="/" element={<Body />}></Route>
            <Route exact path="/events" element={<Events/>}/>
          </Routes>
        </Router>
        <Footer />
      </div>
    </div>
  );
};

export default App;
