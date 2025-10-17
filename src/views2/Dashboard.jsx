import React, { useEffect, useState } from "react";
import { TeamOverview } from "../components/TeamOverview";
import { Player } from "../components/Player";
import { getTeams, subscribeToTeams } from "../routes/teams";
import { getPlayers, subscribeToUsers } from "../routes/users";
import { useSelector } from "react-redux";
import { distributeVictims } from "../routes/users";

export const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToUsers(setPlayers);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToTeams(setTeams);
    return () => unsubscribe();
  }, []);

  const handleDistribute = async () => {
    await distributeVictims();
    alert("Victims distributed!");
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="my-5">
        <div className="title" style={{ fontSize: "1.2rem" }}>
          Teams:
        </div>
        {teams.map((team, index) => (
          <TeamOverview key={index} team={team} players={players.filter(player => player.team.id === team.id)} />
        ))}
      </div>
      <div className="title" style={{ fontSize: "1.2rem" }}>
        Players:
      </div>
      <div className="d-flex flex-wrap mt-4 gap-3">
        {players.map((player, index) => (
          <Player key={index} player={player} />
        ))}
      </div>
      {user.name.toLowerCase() === "iryna" && (
        <button onClick={handleDistribute}>Ready!</button>
      )}
    </div>
  );
};
