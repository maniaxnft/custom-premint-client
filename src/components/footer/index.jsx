import React, { useState } from "react";
import "./index.css";

import Twitter from "../../assets/twitter.svg";
import Telegram from "../../assets/telegram.svg";
import Discord from "../../assets/discord.svg";

import TwitterActive from "../../assets/twitter_active.svg";
import TelegramActive from "../../assets/telegram_active.svg";
import DiscordActive from "../../assets/discord_active.svg";

const Footer = () => {
  const [twitterHovered, setTwitterHovered] = useState(false);
  const [telegramHovered, setTelegramHovered] = useState(false);
  const [discordHovered, setDiscordHovered] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a
            className="footer-social-link"
            href={process.env.REACT_APP_TWITTER_URL}
            onMouseEnter={() => setTwitterHovered(true)}
            onMouseLeave={() => setTwitterHovered(false)}
          >
            TWITTER
            <img
              src={twitterHovered ? TwitterActive : Twitter}
              alt="twitter"
              className="footer-social-link-img"
            />
          </a>
          <a
            className="footer-social-link"
            href={process.env.REACT_APP_TELEGRAM_URL}
            onMouseEnter={() => setTelegramHovered(true)}
            onMouseLeave={() => setTelegramHovered(false)}
          >
            TELEGRAM
            <img
              src={telegramHovered ? TelegramActive : Telegram}
              alt="telegram"
              className="footer-social-link-img"
            />
          </a>
          <a
            className="footer-social-link"
            href={process.env.REACT_APP_DISCORD_URL}
            onMouseEnter={() => setDiscordHovered(true)}
            onMouseLeave={() => setDiscordHovered(false)}
          >
            DISCORD
            <img
              src={discordHovered ? DiscordActive : Discord}
              alt="discord"
              className="footer-social-link-img"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
