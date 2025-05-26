import React, { useState } from "react";

export const NameInput = ({handleReturn}) => {
  const [name, setName] = useState("");
  return (
    <div className="container">
      Enter your name, so we can exclude you from the victims list:
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="form-control mt-2 mb-2 name"
      />
      <button onClick={() => handleReturn(name)}>Get your victim!</button>
    </div>
  );
};
