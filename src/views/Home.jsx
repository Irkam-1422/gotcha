import React, { useState } from "react";
import "./Home.css";
import {
  addDocument,
  deleteAllDocuments,
  fetchNames,
  fetchPlaces,
  fetchWeapons,
  updateDocument,
} from "../routes";
import { NameInput } from "./NameInput";
import { Modal } from "./Modal";

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
  const [name, setName] = useState();
  const [place, setPlace] = useState();
  const [weapon, setWeapon] = useState();
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentName, setCurrentName] = useState("");

  const addData = async () => {
    await deleteAllDocuments("names");
    await deleteAllDocuments("places");
    await deleteAllDocuments("weapons");
    names.forEach((name) => {
      addDocument("name", name);
    });
    places.forEach((place) => {
      addDocument("place", place);
    });
    weapons.forEach((weapon) => {
      addDocument("weapon", weapon);
    });
  };

  const randomize = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const handleSelect = async (currentName) => {
    const names = await fetchNames(currentName);
    const places = await fetchPlaces();
    const weapons = await fetchWeapons();
    const name = randomize(names);
    const place = randomize(places);
    const weapon = randomize(weapons);
    setName(name);
    setPlace(place);
    setWeapon(weapon);
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
    setSelected(true);
  };

  return (
    <>
      {ready ? (
        <div className="">
          <div className="name">
            Let the <br /> game begin!
          </div>
          <div style={{ fontSize: ".9rem" }}>
            You can now leave the page. <br /> And may the luck be with you.
          </div>
        </div>
      ) : selected ? (
        <div>
          <div className="">You have to kill</div>
          <div className="my-2 py-2 name">{name.name}</div>
          <div className="">{place.place}</div>
          <div className="">
            with <b className="weapon">{weapon.weapon}</b>
          </div>
          <button
            style={{ marginTop: "1rem" }}
            onClick={async () => {
              await updateDocument(name.id, "names", currentName);
              await updateDocument(place.id, "places", currentName);
              await updateDocument(weapon.id, "weapons", currentName);
              setReady(true);
            }}
          >
            I'm ready!
          </button>
        </div>
      ) : (
        <NameInput
          handleReturn={(name) => {
            handleSelect(name);
            setCurrentName(name);
          }}
        />
      )}
      <Modal
        showModal={showModal}
        setShowModal={async () => {
          setShowModal(false);
        }}
      />
    </>
  );
};
