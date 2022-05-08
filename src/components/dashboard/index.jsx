import React from "react";
import "./index.css";

import { useSelector } from "react-redux";

const Dashboard = () => {
  const isFollowingTwitter = useSelector((state) => state.isFollowingTwitter);
  const isDiscordMember = useSelector((state) => state.isDiscordMember);
  const ownedNFTCount = useSelector((state) => state.ownedNFTCount);

  return (
    <div className="dashboard">
      <div className="dashboard__header">Your stats</div>
      <ul className="dashboard__body">
        <li className="dashboard__body__item">
          {isFollowingTwitter ? (
            "You are following us on Twitter!"
          ) : (
            <a href={process.env.REACT_APP_TWITTER_URL}>
              You need to follow our Twiiter
            </a>
          )}
        </li>
        <li className="dashboard__body__item">
          {isDiscordMember ? (
            "You are in our Discord Server!"
          ) : (
            <a href={process.env.REACT_APP_DISCORD_URL}>
              You need to join our Discord Server
            </a>
          )}
        </li>
        {ownedNFTCount !== undefined && (
          <li className="dashboard__body__item">
            You have {ownedNFTCount} {process.env.REACT_APP_PROJECT_NAME}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
