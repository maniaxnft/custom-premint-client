import React, { useState, useEffect } from "react";
import "./index.css";

import { useSelector } from "react-redux";

const Dashboard = () => {
  const isFollowingTwitter = useSelector((state) => state.isFollowingTwitter);
  const isDiscordMember = useSelector((state) => state.isDiscordMember);
  const ownedNFTCount = useSelector((state) => state.ownedNFTCount);
  const hasRare = useSelector((state) => state.hasRare);

  const [isPassedMintDate, setIsPassedMintDate] = useState(false);

  const checkMintDate = () => {
    const mintDate = new Date(process.env.REACT_APP_MINT_DATE);
    const today = new Date();
    setIsPassedMintDate(mintDate < today);
  };

  useEffect(() => {
    checkMintDate();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__header">Your stats</div>
      <div className="dashboard__body">
        <div className="dashboard__body__item">
          {isFollowingTwitter ? (
            <div>
              <i className="fa-solid fa-check success_color"></i> You are
              following us on Twitter!
            </div>
          ) : (
            <div>
              <i className="fa-solid fa-xmark fail_color"></i>{" "}
              <a href={process.env.REACT_APP_TWITTER_URL}>
                You need to follow our Twiter
              </a>
            </div>
          )}
        </div>
        <div className="dashboard__body__item">
          {isDiscordMember ? (
            <div>
              <i className="fa-solid fa-check success_color"></i> You are in our
              Discord Server!
            </div>
          ) : (
            <div>
              <i className="fa-solid fa-xmark fail_color"></i>{" "}
              <a href={process.env.REACT_APP_DISCORD_URL}>
                You need to join our Discord Server and get a Verified Role
              </a>
            </div>
          )}
        </div>

        {ownedNFTCount === 0 && isPassedMintDate && (
          <div className="dashboard__body__item">
            <i className="fa-solid fa-xmark fail_color"></i> You should have at
            least 1 {process.env.REACT_APP_PROJECT_NAME} that is{" "}
            <b>not listed for sale</b>
          </div>
        )}
        {ownedNFTCount === 0 && isPassedMintDate && (
          <div className="dashboard__body__item">
            <i className="fa-solid fa-xmark fail_color"></i> You need at least 1
            Maniax NFT to have <b>Maniac Role</b> in Discord Server
          </div>
        )}
        {ownedNFTCount < 5 && isPassedMintDate && (
          <div className="dashboard__body__item">
            <i className="fa-solid fa-xmark fail_color"></i> You need at least 5
            Maniax NFTs to have <b>ManiaX Role</b> in Discord Server
          </div>
        )}
        {ownedNFTCount > 0 && isPassedMintDate && (
          <div className="dashboard__body__item">
            <i className="fa-solid fa-check success_color"></i> You have{" "}
            <b>Maniac Role</b> in our Discord Server!
          </div>
        )}
        {ownedNFTCount >= 5 && isPassedMintDate && (
          <div className="dashboard__body__item">
            <i className="fa-solid fa-check success_color"></i> You have{" "}
            <b>Maniax Role</b> in our Discord Server!
          </div>
        )}
        {!hasRare && ownedNFTCount >= 0 && isPassedMintDate && (
          <div className="dashboard__body__item">
            <i className="fa-solid fa-xmark fail_color"></i> You need at least 1
            Rare Maniax NFT to get <b>RareX Role</b> in Discord Server
          </div>
        )}
        {hasRare && ownedNFTCount > 0 && isPassedMintDate && (
          <div>
            <i className="fa-solid fa-check success_color"></i> You have{" "}
            <b>RareX Role</b> in our Discord Server!
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
