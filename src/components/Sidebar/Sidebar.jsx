import React from "react";
import "./Sidebar.css";
import assets from "../../assets/assets";
import { useState } from "react";

function Sidebar() {
  const [extended, setExtended] = useState(true);
  return (
    <div className="sidebar">
      <div className="top">
        <img className="menu-btn" onClick={() => setExtended(!extended)} src={assets.menu_icon} alt="" />
        <br />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>What is React ...</p>
            </div>
          </div>
        ) : ''}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : ''}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>History</p> : ''}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : ''}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
