import { StateManagerContext } from "./StateManager";
import { useContext, useEffect, useState } from "react";

import axios from "axios";

import SpellCard from "./SpellCard";

import styled from "styled-components";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";

export default function MySpellsPage() {
  // global state
  const { globalUser, globalIsLoggedIn } = useContext(StateManagerContext);
  const [user, setUser] = globalUser;
  const [isLoggedIn, setIsLoggedIn] = globalIsLoggedIn;

  // local state
  const [fetchedUserSpells, setFetchUserSpells] = useState([]);

  const array = [];
  const baseURL = "https://www.dnd5eapi.co";

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    console.log("User Exists, get their spells");
    const getUserSpells = async () => {
      try {
        const gottenSpells = await axios.post(
          "http://localhost:4000/api/getspells",
          {
            userName: user.userName,
          }
        );

        for (let spellURL of gottenSpells.data[0].addedSpells) {
          const spell = await axios.get(baseURL + spellURL);
          array.push(spell.data);
        }
        setFetchUserSpells(array);
      } catch (error) {
        window.alert(error + ". \nUser not found");
        console.log(error);
      }
    };
    getUserSpells();
  }, [user, fetchedUserSpells]);

  let cards = fetchedUserSpells.map((element) => {
    return <SpellCard key={nanoid()} {...element} />;
  });

  return (
    <StyledMySpellsPage>
      {isLoggedIn ? (
        <>
          <h1 className="sectionHeader">My Spells: </h1>
          <StyledCardGridView>{cards}</StyledCardGridView>
        </>
      ) : (
        <h1 className="sectionHeader">
          Please log in to see your saved spells
        </h1>
      )}
    </StyledMySpellsPage>
  );
}
const StyledMySpellsPage = styled(motion.section)`
  margin: 2rem 0;
  .sectionHeader {
    font-size: 3rem;
    margin: 0 1.5rem;
  }
`;

const StyledCardGridView = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 360px));
  grid-auto-rows: auto;
  grid-gap: 1.5rem;
`;
