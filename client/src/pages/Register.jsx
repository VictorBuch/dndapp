import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { StateManagerContext } from "../components/StateManager";

import axios from "axios";

import styled from "styled-components";
import { motion } from "framer-motion";

export default function Register() {
  //global state
  const { globalUser, globalIsLoggedIn } = useContext(StateManagerContext);
  const [user, setUser] = globalUser;
  const [isLoggedIn, setIsLoggedIn] = globalIsLoggedIn;

  // local state
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  if (isLoggedIn) {
    return <Redirect to="/" push={true} />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // bunch of checking if the info is correctly formed
    if (username === "") {
      window.alert("Username can not be empty");
      return;
    }
    if (username.indexOf(" ") >= 0) {
      window.alert("Username can not contain spaces");
      return;
    }
    if (password === "") {
      window.alert("Password can not be empty");
      return;
    }
    if (passwordConf === "") {
      window.alert("Confirm your password");
      return;
    }
    if (password !== passwordConf) {
      window.alert("Passwords do not match, please re-enter password");
      return;
    }
    if (password.length < 8) {
      window.alert("password Must be at least 8 characters long!");
      return;
    }

    console.log("Register info ok, proceed");
    try {
      const user = await axios.post("http://localhost:4000/api/signup", {
        userName: username,
        password: password,
        password_confirmation: passwordConf,
      });
      // console.log(user.data.token);
      // console.log(user.data.message);
      setUser(user.data.message);
      setIsLoggedIn(true);
    } catch (error) {
      window.alert(error + ". \nUser already exists");
      console.log(error);
    }
  }
  return (
    <StyledRegisterPage>
      <h1>Please Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            type="text"
            placeholder="JohnDoe"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <p className="small">(Must be at least 8 characters)</p>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <p>Confirm Password</p>
          <input
            type="password"
            placeholder="********"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </StyledRegisterPage>
  );
}

const StyledRegisterPage = styled(motion.section)`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow-wrap: break-word;

  h1 {
    font-size: 2rem;
    margin: 1rem;
  }
  p {
    font-size: 1.2rem;
  }

  input {
    width: 100%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    margin: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    font-weight: lighter;
  }
  button {
    display: hidden;
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #696969;
    color: white;
  }
  .small {
    font-size: 0.8rem;
  }
`;
