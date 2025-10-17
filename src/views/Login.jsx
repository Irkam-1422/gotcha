import React, { useState } from 'react'

export const Login = () => {
  const [name, setName] = useState("");
  return (
    <div className="container">
      Enter your phone number:
      <input
        type="phone"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Phone Number"
        className="form-control mt-2 mb-2 name"
      />
      <button onClick={() => handleReturn(name)}>Get your victim!</button>
    </div>
  );
};