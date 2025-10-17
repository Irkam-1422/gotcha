import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../actionCreators";
import { subscribeToTeam } from "../routes/teams";

export const Header = () => {
  const user = useSelector((state) => state.user);
  const view = useSelector((state) => state.view);
  const [teamCoins, setTeamCoins] = React.useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.team?.id) return;
    const unsubscribe = subscribeToTeam(user.team.id, (team) => {
      setTeamCoins(team.coins);
    });
    return () => unsubscribe();
  }, [user.team.id]);

  return (
    <div className="header w-100 d-flex justify-content-between align-items-center mb-4">
      <div className="d-flex align-items-center">
        <div
          className="user-avatar"
          style={{ "--user-team-color": user.team?.color || "rgba(114, 246, 151, 0.39)" }}
        ></div>
        <div className="">{user.name}</div>
        <div className="border-start ms-3 ps-3 d-flex align-items-center ">
            <div className="coins me-2"></div>
            <div className="">{teamCoins}</div>
        </div>
        <div className="border-start ms-3 ps-3 d-flex align-items-center ">
            <div className="victims me-2"></div>
            <div className="">{user.killed?.length || 0}</div>
        </div>
      </div>
      <div className="d-flex gap-2">
        {user.isAlive && <button
          className={view === "victim" ? "button-primary" : ""}
          onClick={() => dispatch(setView("victim"))}
        >
          {user.isAlive ? 'Victim' : 'Revenge'}
        </button>}
        <button
          className={view === "dashboard" ? "button-primary" : ""}
          onClick={() => dispatch(setView("dashboard"))}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};
