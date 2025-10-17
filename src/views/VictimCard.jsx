import React from 'react'

const name = {name: 'test'}
const place = {place: 'test'}
const weapon = {weapon: 'test'}

export const VictimCard = () => {
  return (
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
            //   await updateDocument(name.id, "names", currentName);
            //   await updateDocument(place.id, "places", currentName);
            //   await updateDocument(weapon.id, "weapons", currentName);
            //   setReady(true);
            }}
          >
            I'm ready!
          </button>
        </div>
  )
}
