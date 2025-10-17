import React from "react";
import { useSelector } from "react-redux";

export const TeamOverview = ({ team, players }) => {
  const user = useSelector((state) => state.user);
  return (
    <div
      className="team-overview d-flex justify-content-between align-items-center mb-2"
      style={
        { boxShadow: "0px 0px .25rem #d9b24e" }
      }
    >
      <div className="color-box" style={{ backgroundColor: team.color }}></div>
      <p>
        <b>{team.name}</b>
      </p>
      <p>
        Alive:{" "}
        <b className="ms-1">
          {players.filter((member) => member.isAlive).length}
        </b>
      </p>
      <p>
        Dead:{" "}
        <b className="ms-1">
          {players.filter((member) => !member.isAlive).length}
        </b>
      </p>
      <p>
        Coins: <b className="ms-1">{team.coins}</b>
      </p>
    </div>
  );
};
