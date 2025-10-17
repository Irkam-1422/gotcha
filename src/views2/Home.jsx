import React, { useEffect } from "react";
import { Header } from "../components/Header";
import "./Home.scss";
import { useSelector } from "react-redux";
import { Victim } from "./Victim";
import { Dashboard } from "./Dashboard";
import { DeathModal } from "../modals/DeathModal";
import { GhostModal } from "../modals/GhostModal";
import { createUtils } from "../routes/utils";
import { createTeams } from "../routes/teams";
import { subscribeToUser } from "../routes/users";
import { useDispatch } from "react-redux";
import { setShowDeathModal, setShowMurderFail, setShowMurderSuccess, setUser } from "../actionCreators";
import { MurderSuccess } from "../modals/MurderSuccess";
import { MurderFail } from "../modals/MurderFail";

export const Home = () => {
  const view = useSelector((state) => state.view);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   createUtils();
  // },[])

  useEffect(() => {
    if (!user.id) return;
    const unsubscribe = subscribeToUser(user.id, (subUser) => {
      dispatch(setUser(subUser));
      if (subUser.awaitingDeathConfirmation) {
        dispatch(setShowDeathModal(true, subUser.killer));
      }
      // if (subUser.currentVictim && !subUser.currentVictim?.isAlive && !subUser.currentVictim?.awaitingDeathConfirmation) {
      //   dispatch(setShowMurderSuccess(true));
      // }
      // if (subUser.currentVictim?.deathRejected) {
      //   dispatch(setShowMurderFail(true));
      // }
      localStorage.setItem("user", JSON.stringify(subUser));
    });
    return () => unsubscribe();
  }, [user.id]);

  return (
    <div className="container h-100">
      <Header />
      {view === "victim" && <Victim />}
      {view === "dashboard" && <Dashboard />}
      <DeathModal />
      <GhostModal />
      <MurderSuccess />
      <MurderFail />
    </div>
  );
};
