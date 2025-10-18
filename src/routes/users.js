import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAction, getLocation, getWeapons } from "./utils";
import { setToTeam, updateTeam } from "./teams";

const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const snapshot = await getDocs(usersCollection);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};

const updateUser = async (id, data) => {
  try {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, data);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

const getUser = async (phone) => {
  const users = await getUsers(phone);
  return users.filter((user) => user.phone === phone);
};

const createUser = async (name, phone) => {
  try {
    const usersCollection = collection(db, "users");
    const userExists = await getUser(phone);
    if (userExists.length > 0) {
      return userExists[0];
    }
    const team = await setToTeam({ name, isAlive: true });
    const user = {
      name,
      phone,
      isAlive: true,
      inUse: false,
      team,
      killed: [],
      awaitingDeathConfirmation: false,
      deathRevenged: false,
      killer: null,
      currentVictim: null,
    };
    await addDoc(usersCollection, user);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const getPlayers = async (userName) => {
  const users = await getUsers();
  console.log(users);
  return users.filter(
    (user) => user.name?.toLowerCase() !== userName.toLowerCase()
  );
};

const getVictim = async (currentUser) => {
  const users = await getUsers();
  const filtered = users.filter(
    (user) =>
      user.name?.toLowerCase() !== currentUser.name?.toLowerCase() &&
      !user.inUse
  );
  const randomIndex = Math.floor(Math.random() * filtered.length);
  const victim = filtered[randomIndex];
  const weapon = await getWeapons();
  const location = await getLocation();
  const action = await getAction();
  await updateUser(victim.id, {
    inUse: true,
    killer: { name: currentUser.name },
  });
  await updateUser(currentUser.id, {
    currentVictim: {
      victim,
      weapon,
      location,
      action,
      teamRevealed: false,
      deathRejected: false,
      awaitingDeathConfirmation: false,
    },
  });
  return victim;
};

const distributeVictims = async () => {
  const users = await getUsers();
  await Promise.all(
    users.map(async (user) => {
      await getVictim(user);
    })
  );
};

const teamReveal = async (user) => {
  await updateUser(user.id, {
    currentVictim: {
      ...user.currentVictim,
      teamRevealed: true,
    },
  });
  await updateTeam(user.team.id, { coins: user.team.coins - 1 });
};

const handleKill = async (user) => {
  await updateUser(user.currentVictim.victim.id, {
    awaitingDeathConfirmation: true,
    killer: user,
  });
  await updateUser(user.id, {
    currentVictim: { ...user.currentVictim, awaitingDeathConfirmation: true },
  });
};

const confirmDeath = async (user) => {
  await updateUser(user.id, {
    isAlive: false,
    awaitingDeathConfirmation: false,
  });
  await updateUser(user.killer.id, {
    currentVictim: {
      ...user.currentVictim,
      teamRevealed: false,
      deathRejected: false,
      awaitingDeathConfirmation: false,
    },
  });
  console.log(user.killer.team);
  await updateTeam(user.killer.team.id, { coins: user.killer.team.coins + 1 });
};

const rejectDeath = async (user) => {
  await updateUser(user.id, { awaitingDeathConfirmation: false });
  await updateUser(user.killer.id, {
    currentVictim: {
      ...user.killer.currentVictim,
      awaitingDeathConfirmation: false,
    },
    killed: [...user.killer.killed, user.id],
  });
};

const subscribeToUsers = (callback) => {
  const usersCollection = collection(db, "users");
  return onSnapshot(usersCollection, (snapshot) => {
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(users);
  });
};

const subscribeToUser = (userId, callback) => {
  const userDoc = doc(db, "users", userId);
  return onSnapshot(userDoc, (snapshot) => {
    callback({ id: snapshot.id, ...snapshot.data() });
  });
};

const victimTransfer = async (user) => {
  const newVictim = user.currentVictim?.victim.currentVictim;
  console.log("Transferring victim:", user.currentVictim);
  if (!newVictim) {
    console.log("No more victims available.");
    return;
  }
  await updateUser(user.id, {
    currentVictim: newVictim,
    killed: [...user.killed, user.currentVictim?.victim],
  });
  await updateTeam(user.team.id, { coins: user.team.coins + 1 });
};

const getAllDocs = async (collectionName) => {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const removeCurrentVictims = async () => {
  const users = await getUsers();
  const teams = await getAllDocs("teams");
  // const weapons = await getAllDocs("weapons");
  // const locations = await getAllDocs("places");
  // const actions = await getAllDocs("actions");
  // console.log(weapons)
  // console.log(locations)
  // console.log(actions)
  const lastIndex = users.length - 1;
  await Promise.all(
    users.map(async (user, i) => {
      // const { currentVictim: _, ...victim } =
      //   users[i + 1 > lastIndex ? 0 : i + 1];
      // const { name, ...rest } = users[i - 1 < 0 ? lastIndex : i - 1];
      // const weapon = weapons[i];
      // const location = locations[i];
      // const action = actions[i];
      // const {members, ...team} = await setToTeam({ name:user.name, isAlive: true });
      await updateTeam(teams[i % 3].id, { members: [...teams[i % 3].members, user.id] });
      await updateUser(user.id, {
        team: teams[i % 3],
        // currentVictim: null,
        // killer: null
        // currentVictim: {
        //   victim,
        //   weapon,
        //   location,
        //   action,
        //   teamRevealed: false,
        //   deathRejected: false,
        //   awaitingDeathConfirmation: false,
        // },
        // killer: { name },
      });
      // console.log(user.name, " -- ", victim.name, weapon.name, location.name, action.name, " -- ", name);
    })
  );
};

export {
  removeCurrentVictims,
  victimTransfer,
  rejectDeath,
  confirmDeath,
  handleKill,
  subscribeToUsers,
  subscribeToUser,
  getUsers,
  getUser,
  createUser,
  updateUser,
  getPlayers,
  getVictim,
  distributeVictims,
  teamReveal,
};
