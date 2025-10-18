import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const update = async (id, data, colName) => {
  try {
    const userDoc = doc(db, colName, id);
    await updateDoc(userDoc, data);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

const getRandom = async (colName) => {
  const collectionRef = collection(db, colName);
  const snapshot = await getDocs(collectionRef);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const filtered = data.filter((item) => !item.inUse);
  const randomIndex = Math.floor(Math.random() * filtered.length);
  const item = filtered[randomIndex];
  await update(item.id, { inUse: true }, colName);
  return item;
};

const getWeapons = async () => {
  return await getRandom("weapons");
};

const getLocation = async () => {
  return await getRandom("places");
};

const getAction = async () => {
  return await getRandom("actions");
};

const weapons = [
  { name: "A spoon with toothpaste on it", inUse: false },
  { name: "A red sock", inUse: false },
  { name: "A mug with someone else’s name written on it", inUse: false },
  { name: "A roll of toilet paper that’s almost empty", inUse: false },
  { name: "A flashlight with dying batteries", inUse: false },
  { name: "A shoelace tied around a pencil", inUse: false },
  { name: "A sleeping bag that’s halfway unrolled", inUse: false },
  { name: "A deck of cards", inUse: false },
  { name: "A water bottle that’s only half full", inUse: false },
  { name: "A plate with crumbs still on it", inUse: false },
  { name: "A Stella hoodie", inUse: false },
  { name: "A first aid bandage roll", inUse: false },
  { name: "A lighter", inUse: false },
  { name: "A piece of rope tied into a knot", inUse: false },
  { name: "A notebook with a leaf pressed inside", inUse: false },
  { name: "A pillowcase that isn’t white", inUse: false },
  { name: "A metal spoon wrapped in toilet paper", inUse: false },
  { name: "A towel that smells like soap", inUse: false },
  { name: "A hat with a pin or badge attached", inUse: false },
  { name: "A pair of gloves", inUse: false },
  { name: "A banana", inUse: false },
  { name: "A pink pencil", inUse: false },
  { name: "Somebody else’s phone", inUse: false },
  { name: "A matje", inUse: false },
  { name: "A green jacket", inUse: false },
  { name: "Something purple", inUse: false },
];

const places = [
  { name: "In the toilet", inUse: false },
  { name: "During breakfast", inUse: false },
  { name: "During lunch", inUse: false },
  { name: "During dinner", inUse: false },
  { name: "While making lupas", inUse: false },
  { name: "By the kitchen sink", inUse: false },
  { name: "In the shower room", inUse: false },
  { name: "In the staff room", inUse: false },
  { name: "On someone matje", inUse: false },
  { name: "at the dinner table", inUse: false },
  { name: "during corvee", inUse: false },
  { name: "Next to the fridge", inUse: false },
  { name: "Next to the fire extinguisher", inUse: false },
  { name: "Near the campfire pit", inUse: false },
  { name: "By the woodpile", inUse: false },
  { name: "At the flagpole", inUse: false },
  { name: "On the path leading into the forest", inUse: false },
  { name: "On a bench", inUse: false },
  { name: "in the forest", inUse: false },
  { name: "At the Soest train station", inUse: false },
  { name: "At a cafe", inUse: false },
  { name: "In Albet Heijn", inUse: false },
  { name: "Behind the car", inUse: false },
  { name: "Next to the coffee pot", inUse: false },
  { name: "Girls toilet", inUse: false },
];

const actions = [
  { name: "Singing Shine Bright Like a Diamond song", inUse: false },
  { name: "Picking their nose", inUse: false },
  { name: "Wearing their hoodie inside out", inUse: false },
  { name: "Tying their left shoelace", inUse: false },
  { name: "Brushing teeth with their left hand", inUse: false },
  { name: "Reading a book upside down", inUse: false },
  { name: "Eating a cookie with eyes closed", inUse: false },
  { name: "Taking a selfie while sticking out their tongue", inUse: false },
  { name: "Whistling the Happy Birthday song", inUse: false },
  { name: "Balancing on their left leg", inUse: false },
  { name: "Whispering “I am a king of tomatoes”", inUse: false },
  { name: "Humming Twinkle Twinkle Little Star song", inUse: false },
  { name: "Cleaning their shoes with a sock on their hand", inUse: false },
  { name: "Counting out loud to ten in a funny voice", inUse: false },
  { name: "Stirring sugar in a tea", inUse: false },
  { name: "Wearing sunglasses on their head, not their eyes", inUse: false },
  { name: "Eating a banana", inUse: false },
  { name: "Standing completely still", inUse: false },
  { name: "Tucking in their shirt", inUse: false },
  { name: "Snapping fingers", inUse: false },
  { name: "Holding a fork", inUse: false },
  { name: "Wearing something pink", inUse: false },
  { name: "Having their eyes closed", inUse: false },
  { name: "Sticking their tongue out", inUse: false },
];

const createUtils = async () => {
  const weaponsCollection = collection(db, "weapons");
  for (const weapon of weapons) {
    await addDoc(weaponsCollection, weapon);
  }

  const placesCollection = collection(db, "places");
  for (const place of places) {
    await addDoc(placesCollection, place);
  }

  const actionsCollection = collection(db, "actions");
  for (const action of actions) {
    await addDoc(actionsCollection, action);
  }
};

const cleanUtils = async () => {
  const weaponsCollection = collection(db, "weapons");
  for (const weapon of weapons) {
    await updateDoc(doc(weaponsCollection, weapon.id), { inUse: false });
  }

  const placesCollection = collection(db, "places");
  for (const place of places) {
    await updateDoc(doc(placesCollection, place.id), { inUse: false });
  }

  const actionsCollection = collection(db, "actions");
  for (const action of actions) {
    await updateDoc(doc(actionsCollection, action.id), { inUse: false });
  }
}

export { update, getWeapons, getLocation, getAction, createUtils, cleanUtils };
