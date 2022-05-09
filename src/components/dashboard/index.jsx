import React from "react";
import "./index.css";

import { useSelector } from "react-redux";

const Dashboard = () => {
  const isFollowingTwitter = useSelector((state) => state.isFollowingTwitter);
  const isDiscordMember = useSelector((state) => state.isDiscordMember);
  const ownedNFTCount = useSelector((state) => state.ownedNFTCount);
  const hasRare = useSelector((state) => state.hasRare);

  return (
    <div className="dashboard">
      <div className="dashboard__header">Your stats</div>
      <div className="dashboard__body">
        <div className="dashboard__body__item">
          {isFollowingTwitter ? (
            <div>
              <i class="fa-solid fa-check success_color"></i> You are following
              us on Twitter!
            </div>
          ) : (
            <div>
              <i class="fa-solid fa-xmark fail_color"></i>{" "}
              <a href={process.env.REACT_APP_TWITTER_URL}>
                You need to follow our Twiiter
              </a>
            </div>
          )}
        </div>
        <div className="dashboard__body__item">
          {isDiscordMember ? (
            <div>
              <i class="fa-solid fa-check success_color"></i> You are in our
              Discord Server!
            </div>
          ) : (
            <div>
              <i class="fa-solid fa-xmark"></i>{" "}
              <a href={process.env.REACT_APP_DISCORD_URL}>
                You need to join our Discord Server
              </a>
            </div>
          )}
        </div>
        {ownedNFTCount !== undefined && (
          <div className="dashboard__body__item">
            {ownedNFTCount === 0 && (
              <div>
                <i class="fa-solid fa-xmark fail_color"></i> You have{" "}
                {ownedNFTCount} {process.env.REACT_APP_PROJECT_NAME}
              </div>
            )}
            {ownedNFTCount > 0 && (
              <div>
                <i class="fa-solid fa-check success_color"></i> You have{" "}
                {ownedNFTCount} {process.env.REACT_APP_PROJECT_NAME}
              </div>
            )}
            <div className="dashboard__body__item__sublist">
              {ownedNFTCount === 0 && (
                <div>
                  <i class="fa-solid fa-xmark fail_color"></i> You need at least
                  1 Maniac to have <b>Maniac Role</b> in Discord Server!
                </div>
              )}
              {ownedNFTCount < 5 && (
                <div>
                  <i class="fa-solid fa-xmark fail_color"></i> If you have 5
                  NFTs, you will get <b>ManiaX Role</b> in Discord Server!
                </div>
              )}
              {ownedNFTCount > 0 && (
                <div>
                  <i class="fa-solid fa-check success_color"></i> You have{" "}
                  <b>Maniac Role</b> in our Discord Server!
                </div>
              )}
              {ownedNFTCount === 5 && (
                <div>
                  <i class="fa-solid fa-check success_color"></i> You have{" "}
                  <b>Maniax Role</b> in our Discord Server!
                </div>
              )}
              {!hasRare && (
                <div>
                  <i class="fa-solid fa-xmark fail_color"></i> If you have at
                  last one Rare NFT, you will get <b>RareX Role</b> in Discord
                  Server!
                </div>
              )}
              {hasRare && (
                <div>
                  <i class="fa-solid fa-check success_color"></i> You have{" "}
                  <b>RareX Role</b> in our Discord Server!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
