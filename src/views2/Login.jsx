import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../actionCreators";
import "./Home.scss";
import { createUser, subscribeToUser } from "../routes/users";
import { createTeams } from "../routes/teams";

export const Login = () => {
  const [values, setValues] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // useEffect(() => {
  //   createTeams();
  // }, []);

  const handleLogin = async () => {
    if (!values.name || !values.phone) {
      setErrors({
        name: !values.name ? "Name is required" : "",
        phone: !values.phone ? "Phone is required" : "",
      });
      return;
    }
    const user = await createUser(values.name, values.phone);
    dispatch(setUser(user));
    localStorage.setItem("user", JSON.stringify(user));
    return () => unsubscribe();
  };

  return (
    <div className="container">
      <div className="title mb-5">Welcome!</div>
      <input
        className="mt-3"
        type="text"
        placeholder="Enter your name..."
        value={values.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        // invalid={!!errors.name}
      />
      <p className="small text-danger">{errors.name}</p>
      <input
        className="mb-3"
        type="text"
        placeholder="Enter your phone number..."
        value={values.phone}
        onChange={(e) => setValues({ ...values, phone: e.target.value })}
        // invalid={!!errors.phone}
      />
      <p className="small text-danger">{errors.phone}</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
