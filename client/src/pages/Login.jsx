import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username);
    console.log(password);
    // TODO:
    // Login checking with the DB and set global user login state
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
