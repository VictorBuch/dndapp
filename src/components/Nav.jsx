import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

export default function Nav() {
  const [searchedSpell, setSearchedSpell] = useState("");

  function handleSearch(e) {
    setSearchedSpell(e.target.value);
  }
  async function handleClick(e) {
    e.preventDefault();
    setSearchedSpell("");
    // Search the api here
    const propperText = searchedSpell.split(" ").join("-");
    console.log(propperText);
    try {
      const spell = await axios.get(
        `https://www.dnd5eapi.co/api/spells/${propperText}`
      );
      console.log(spell.data); // gets the spell and use for later use
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <StyledNav>
      <Logo>
        <h1>Spellbooker Helper online</h1>
      </Logo>
      <form action="">
        <input
          value={searchedSpell}
          onChange={handleSearch}
          type="text"
          placeholder="Search for spells"
        />
        <button onClick={handleClick}>Search</button>
      </form>
    </StyledNav>
  );
}

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;
  overflow-wrap: break-word;
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    font-weight: bold;
  }
  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #696969;
    color: white;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  h1 {
    font-family: "Courgette", cursive;
    font-size: 2rem;
    cursor: pointer;
  }
`;
