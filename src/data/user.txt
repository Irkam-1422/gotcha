const user = {
  id: "12345",
  name: "Mika",
  phone: "+1234567890",
  isAlive: true,
  inUse: false,
  team: { name: "Team C", color: "#d752da", coins: 5, id: "teamC" },
  killed: ["67890"],
  awaitingDeathConfirmation: false,
  deathRevenged: false,
  killer: { name: "Lima", id: "67890" },
};

const team = {
  id: "teamC",
  name: "Team C",
  color: "#d752da",
  coins: 5,
  members: [
    { id: "12345", name: "Mika", isAlive: true },
    { id: "67890", name: "Lima", isAlive: false },
  ],
};

const weapon = { name: "Knife with peanut butter on it", id: "34567" };
const location = { name: "Bathroom", id: "67890" };
const action = { name: "Singing a Song", id: "91011" };
