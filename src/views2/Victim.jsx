import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { handleKill, teamReveal } from "../routes/users";

export const Victim = () => {
  const user = useSelector((state) => state.user);
  const [awaitingDeathConfirmation, setAwaitingDeathConfirmation] =
    React.useState(user.currentVictim?.awaitingDeathConfirmation);
  const [deathRevenged, setDeathRevenged] = React.useState(false);
  const [teamRevealed, setTeamRevealed] = React.useState(
    user.currentVictim?.teamRevealed || false
  );
  const [victim, setVictim] = React.useState(user.currentVictim?.victim);
  const [killer, setKiller] = React.useState(user.killer);
  const [weapon, setWeapon] = React.useState(user.currentVictim?.weapon);
  const [location, setLocation] = React.useState(user.currentVictim?.location);
  const [action, setAction] = React.useState(user.currentVictim?.action);

  const inputRef = React.useRef();

  useEffect(() => {
      setAwaitingDeathConfirmation(user.currentVictim?.awaitingDeathConfirmation);
    setTeamRevealed(user.currentVictim?.teamRevealed || false);
    setVictim(user.currentVictim?.victim);
    setKiller(user.killer);
    setWeapon(user.currentVictim?.weapon);
    setLocation(user.currentVictim?.location);
    setAction(user.currentVictim?.action);
  }, [user.currentVictim]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Here you can dispatch an action to upload the photo
        console.log("Photo uploaded:", reader.result);
      };
      reader.readAsDataURL(file);
      // setDeathRevenged(true);
    }
  };

  const handleTeamReveal = async () => {
    await teamReveal(user);
    setTeamRevealed(true);
  };

  return (
    <div
      className="w-100 d-flex flex-column align-items-center mt-5"
      style={{ height: "100vh" }}
    >
      {awaitingDeathConfirmation ? (
        <div className="">
          <div className="title">Well done!</div>
          <div className="">Waiting for victim confirmation...</div>
        </div>
      ) : user.isAlive ? (
        !victim ? (
          <div className="">
            <div className="">Waiting for victims to be distributed...</div>
          </div>
        ) : (
          <>
            <div className="title mb-4">You have to kill:</div>
            <p
              className=""
              style={{ fontSize: "1rem", textAlign: "center", width: "300px" }}
            >
              <b style={{ fontSize: "1rem" }}>{victim.name}</b> with{" "}
              <b style={{ fontSize: "1rem" }}>{weapon.name}</b> in the{" "}
              <b style={{ fontSize: "1rem" }}>{location.name}</b> while (he/she)
              is <b style={{ fontSize: "1rem" }}>{action.name}</b>
            </p>
            {teamRevealed ? (
              <div className="mt-2">
                <p>_________________________</p>
                <b>
                  {victim.name} is from team{" "}
                  <span
                    style={{ color: victim.team.color, fontWeight: "bold" }}
                  >
                    {victim.team.name}
                  </span>
                </b>
              </div>
            ) : (
              <>
                <button className={"mt-3"} onClick={handleTeamReveal}>
                  Know the team
                </button>
                <b className="small mt-3 note">
                  This action will cost your team 1 coin.
                </b>
              </>
            )}
            <p>_________________________</p>
            <button onClick={() => handleKill(user)}>
              Done
            </button>
            <p className="small mt-3">
              Only press this button after the victim is actually killed. <br />
              They have to confirm their death as well.
            </p>
          </>
        )
      ) : deathRevenged ? (
        <div className="title note">
          Your death is revenged. Your team get's a coin. You are just a happy
          ghost now :)
        </div>
      ) : killer.isAlive ? (
        <>
          <div className="title mb-4">You have to revenge:</div>
          <p
            className=""
            style={{ fontSize: "1rem", textAlign: "center", width: "300px" }}
          >
            take a photo of <b style={{ fontSize: "1rem" }}>{killer.name}</b> in
            the <b style={{ fontSize: "1rem" }}>{location.name}</b> while
            (he/she) is <b style={{ fontSize: "1rem" }}>{action.name}</b>
          </p>
          <button onClick={() => inputRef.current.click()}>
            Upload a photo
          </button>
          <input
            type="file"
            className="d-none"
            ref={inputRef}
            onChange={handleChange}
          />
        </>
      ) : (
        <div className="title note">
          Your killer is dead. You are just a sad ghost now :(
        </div>
      )}
    </div>
  );
};
