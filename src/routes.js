import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const fetchNames = async (currentName) => {
  const namesCollection = collection(db, "names");
  const snapshot = await getDocs(namesCollection);
  const names = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return names.filter((name) => name.name.toLowerCase() !== currentName.toLowerCase() && !name.inUse);
};

const fetchPlaces = async () => {
  const placesCollection = collection(db, "places");
  const snapshot = await getDocs(placesCollection);
  const places = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return places;
};

const fetchWeapons = async () => {
  const weaponsCollection = collection(db, "weapons");
  const snapshot = await getDocs(weaponsCollection);
  const weapons = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return weapons;
};

const addDocument = async (key, value) => {
  try {
    const coll = key + "s";
    const docRef = await addDoc(collection(db, coll), {
      [key]: value,
      inUse: false,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const updateDocument = async (id, collection, killer) => {
  try {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, { inUse: true, killer: killer });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

const deleteAllDocuments = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));

  const deletePromises = snapshot.docs.map((document) =>
    deleteDoc(doc(db, collectionName, document.id))
  );

  await Promise.all(deletePromises);
  console.log("All documents deleted from", collectionName);
};

export {
  fetchNames,
  fetchPlaces,
  fetchWeapons,
  addDocument,
  updateDocument,
  deleteAllDocuments,
};
