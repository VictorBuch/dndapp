import { useContext, useState } from "react";
import { StateManagerContext } from "./StateManager";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";

import { Link } from "react-router-dom";

export default function Nav({ setIsSpellbookPage, isSpellbookPage }) {
  const [searchedSpell, setSearchedSpell] = useState("");
  const { globallySearchedSpell, globalIsLoggedIn } = useContext(
    StateManagerContext
  );
  const [globalSearchedSpell, setGlobalSearchedSpell] = globallySearchedSpell;
  const [isLoggedIn, setIsLoggedIn] = globalIsLoggedIn;

  function handleSearch(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopImmediatePropagation();
      handleClick(e);
    } else {
      setSearchedSpell(e.target.value);
    }
  }

  async function handleClick(e) {
    e.preventDefault();
    setSearchedSpell("");
    // Search the api here
    const propperText = searchedSpell.split(" ").join("-").toLocaleLowerCase();
    console.log(propperText);
    try {
      const spell = await axios.get(
        `https://www.dnd5eapi.co/api/spells/${propperText}`
      );
      // gets the spell and use for later use
      setGlobalSearchedSpell(spell.data);
      console.log(spell.data);
    } catch (error) {
      console.log(error);
      window.alert(
        error + ". Make sure the spell is from the players handbook"
      );
    }
  }

  function pageBtnClick(e) {
    let btn = document.querySelector("#" + e.target.id);
    // if the button clicked is the spellbook btn make the css give it an outline by toggeling the class. And toggle the othe btn to not have it.
    // then based on the button change the state.
    if (e.target.id === "spellbookPageBtn") {
      if (!isSpellbookPage) {
        document.querySelector("#mySpellsPageBtn").classList.toggle("selected");
        setIsSpellbookPage(true);
        btn.classList.toggle("selected");
      }
    } else {
      if (isSpellbookPage) {
        document
          .querySelector("#spellbookPageBtn")
          .classList.toggle("selected");
        setIsSpellbookPage(false);
        btn.classList.toggle("selected");
      }
    }
  }

  function clearSearchedSpells() {
    setGlobalSearchedSpell();
  }

  return (
    <StyledNav>
      <Logo>
        <h1 onClick={clearSearchedSpells}>Spellbooker Helper online</h1>
      </Logo>
      <div className="row">
        <div className="pagebtns">
          <button
            id="spellbookPageBtn"
            className="selected"
            onClick={pageBtnClick}
          >
            Spellbook
          </button>

          <div
            style={{
              borderLeft: "2px solid grey",
              height: "60%",
              margin: "auto 0.5rem",
            }}
          ></div>
          <button id="mySpellsPageBtn" onClick={pageBtnClick}>
            My Spells
          </button>
        </div>
        <StyledSearch>
          <form action="">
            <input
              value={searchedSpell}
              onChange={handleSearch}
              type="text"
              placeholder="Search for spells"
            />
            <button onClick={handleClick}>Search</button>
          </form>
        </StyledSearch>
        <div className="login">
          {isLoggedIn ? (
            <>
              <h3 id="username">Username</h3>
              <button id="logout" onClick={() => setIsLoggedIn(false)}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/register">
                <button id="register">Register</button>
              </Link>
              <Link to="/login">
                <button>login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </StyledNav>
  );
}

const StyledNav = styled(motion.nav)`
  display: flex;
  flex-direction: column;
  .row {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    margin-top: 1rem;
  }
  .pagebtns {
    display: flex;
    margin: 0 0 0 1.5rem;
    button {
      display: hidden;
      font-size: 1.5rem;
      border: none;
      border-radius: 12px;
      padding: 0.5rem 2rem;
      cursor: pointer;
      color: black;
      background: #fff;
    }
    button:hover {
      background: #9e9e9e;
    }

    .selected {
      background: #696969;
    }
  }
  .login {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-right: 1.5rem;
    button {
      display: hidden;
      font-size: 1rem;
      border: none;
      border-radius: 12px;
      padding: 0.8rem 1.5rem;
      margin: 0 0.5rem;
      cursor: pointer;
      background: #696969;
      color: white;
      width: 125px;
      text-align: center;
    }
    #register {
      background: white;
      border: 2px solid #696969;
      color: #696969;
    }
    #logout {
      background: white;
      border: 2px solid #696969;
      color: #696969;
    }
    #username {
      margin: 0 1rem;
    }
  }
`;

const StyledSearch = styled(motion.div)`
  text-align: center;
  overflow-wrap: break-word;
  align-items: center;
  justify-content: center;

  input {
    width: 50%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;

    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    font-weight: bold;
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
