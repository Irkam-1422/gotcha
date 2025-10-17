import React, { useState } from "react";
import "./Home.css";
import { VictimCard } from "./VictimCard";
import { ReadyCard } from "./ReadyCard";
import { Dashboard } from "./Dashboard";
import { Login } from "./Login";

const names = [
  "Charlie",
  "Evette",
  "Esther",
  "Gio",
  "Iryna",
  "Jannike",
  "Jelle",
  "Jonah",
  "Joris",
  "Julia",
  "Kaeal",
  "Lev",
  "Lima",
  "Luc",
  "Mika",
  "Niki",
  "Noah",
  "Olivia",
  "Pepijn",
  "Robert",
  "Roef",
  "Twan",
];
const places = [
  "behind the tent",
  "in the tent",
  "at the dinner table",
  "on the boat",
  "in the toilet",
  "by the camfire",
  "on a party boat",
  "on a not Stella boat",
  "at a party",
  "during the race",
  "on the Hunter",
  "on 46",
  "on 63",
  "on 64",
  "while brushing teeth",
  "while they're tying their shoes",
  "at the charging station",
  "on the muddiest part of the island",
  "while cooking the dinner",
  "during the corvee",
  "at breakfast",
  "while going up wind",
];
const weapons = [
  "a fork",
  "a spoon",
  "sleeping mattress",
  "sleeping bag",
  "jam sandwich",
  "a knife with nutella on it",
  "a trash bag",
  "a riem",
  "a wrik riem",
  "a toilet roll",
  "a toothbrush",
  "a dishsoap",
  "allesreiniger",
  "a pencil",
  "a Haribo candy",
  "a pair of mismatched socks",
  "a peeled banana",
  "a flip flop",
  "a flashlight",
  "a loose shoelace",
  "a someone else's hat",
  "life jacket",
];

export const Home = () => {
  const [view, setView] = useState("");

  return (
    <div>
      <div className="d-flex w-100">
        {["victim", "dashboard", "ready", "login"].map((v) => (
          <button key={v} onClick={() => setView(v)}>
            {v}
          </button>
        ))}
      </div>
      {view === "victim" ? (
        <VictimCard />
      ) : view === "dashboard" ? (
        <Dashboard />
      ) : view === "ready" ? (
        <ReadyCard />
      ) : (
        <Login />
      )}
      {/* {view === "victim" ? (
        <VictimCard />
      ) : view === "dashboard" ? (
        <Dashboard />
      ) : view === "ready" ? (
        <ReadyCard />
      ) : (
        <Login />
      )} */}
    </div>
  );
};
