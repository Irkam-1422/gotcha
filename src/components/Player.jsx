import React from "react";
import { useSelector } from "react-redux";

export const Player = ({ player }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="player-card">
      <div
        className="player-avatar"
        style={player.isAlive ? {} : { opacity: 0.5 }}
      ></div>
      {!player.isAlive && <div className="cross-over"></div>}
      {!user.isAlive && <div className="player-name"><b>{player.name}</b></div>}
      <div className="player-name">
        Victims: <b className="ms-1">{player.killed.length}</b>
      </div>
    </div>
  );
};
