import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  onSnapshot
} from "firebase/firestore";

const getTeams = async () => {
  const teamsCollection = collection(db, "teams");
  const snapshot = await getDocs(teamsCollection);
  const teams = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return teams;
};

const updateTeam = async (id, data) => {
  try {
    const teamDoc = doc(db, "teams", id);
    await updateDoc(teamDoc, data);
  } catch (error) {
    console.error("Error updating team:", error);
  }
};

const setToTeam = async (user) => {
  const teams = await getTeams();
  const players = teams.map((t) => t.members.length);
  const minPlayers = Math.min(...players);
  const team = teams.find((t) => t.members.length === minPlayers);
  console.log("Assigning user to team:", team);
  if (team) {
    await updateTeam(team.id, { members: [...team.members, user] });
  }
  return team;
};

const createTeams = async () => {
  try {
    const teamsCollection = collection(db, "teams");
    await addDoc(teamsCollection, {
      id: "teamA",
      name: "Team A",
      color: "#72f698",
      coins: 5,
      members: [],
    });
    await addDoc(teamsCollection, {
      id: "teamB",
      name: "Team B",
      color: "#5fe2fa",
      coins: 5,
      members: [],
    });
    await addDoc(teamsCollection, {
      id: "teamC",
      name: "Team C",
      color: "#d752da",
      coins: 5,
      members: [],
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const subscribeToTeams = (callback) => {
  const teamsCollection = collection(db, "teams");
  return onSnapshot(teamsCollection, (snapshot) => {
    const teams = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(teams);
  });
};

const subscribeToTeam = (teamId, callback) => {
  const teamDoc = doc(db, "teams", teamId);
  return onSnapshot(teamDoc, (snapshot) => {
    callback({ id: snapshot.id, ...snapshot.data() });
  });
};

export { getTeams, updateTeam, setToTeam, createTeams, subscribeToTeams, subscribeToTeam };
