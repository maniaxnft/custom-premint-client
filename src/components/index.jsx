import React, { useEffect } from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../store/actions";

import initUser from "../utils/initUser";
import Header from "./header";
import Body from "./body";
import Events from "./events";
import Footer from "./footer";
import Loading from "./loading";

const App = () => {
  const dispatch = useDispatch();
  const connectionSuccess = useSelector((state) => state.connectionSuccess);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (connectionSuccess) {
      const canvas = document.getElementById("confetti");
      const confetti = window.confetti.create(canvas, {
        resize: true,
        useWorker: true,
      });
      confetti({
        particleCount: 1000,
        spread: 2880,
      });
      setTimeout(() => {
        window.confetti.reset();
        dispatch({
          type: ACTIONS.CONNECTION_SUCCESS,
          payload: {
            data: false,
          },
        });
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionSuccess]);

  return (
    <div className="components">
      <Toaster />
      {loading && <Loading />}
      {connectionSuccess && <canvas id="confetti" />}
      <div>
        <Header />
        <Router>
          <Routes>
            <Route exact path="/" element={<Body />}></Route>
            <Route exact path="/events" element={<Events />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </div>
  );
};

export default App;
