import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { StateManagerContext } from "../components/StateManager";

import { motion } from "framer-motion";
import styled from "styled-components";
import axios from "axios";

export default function Login() {
  //global state
  const { globalUser, globalIsLoggedIn } = useContext(StateManagerContext);
  const [user, setUser] = globalUser;
  const [isLoggedIn, setIsLoggedIn] = globalIsLoggedIn;

  // local state
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  if (isLoggedIn) {
    return <Redirect to="/" push={true} />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(username);
    // console.log(password);
    try {
      const user = await axios.post("http://localhost:4000/api/signin", {
        userName: username,
        password: password,
      });
      // console.log(user.data.token);
      // console.log(user.data.message);
      setUser(user.data.message);
      setIsLoggedIn(true);
    } catch (error) {
      window.alert(error + ". \nUser not found");
      console.log(error);
    }
  }

  return (
    <StyledLoginPage>
      <h1>Please Log In</h1>
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
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </StyledLoginPage>
  );
}

const StyledLoginPage = styled(motion.section)`
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
`;
