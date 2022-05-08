import React from "react";
import "./index.css";

import { useSelector } from "react-redux";

import Jumbotron from "../jumbotron";
import Loading from "../loading";

const Body = () => {
  const loading = useSelector((state) => state.loading);
  return (
    <div className="body">
      {loading && <Loading />}
      {!loading && <Jumbotron /> }
    </div>
  );
};

export default Body;
