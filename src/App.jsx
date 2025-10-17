import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Home } from "./views2/Home";
import { Login } from "./views2/Login";
import { useEffect } from "react";
import { setUser } from "./actionCreators";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

  return !user ? <Login /> : <Home />;
}

export default App;
