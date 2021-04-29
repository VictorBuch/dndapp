import { useContext, useEffect, useState } from "react";
import { StateManagerContext } from "./StateManager";
import SpellCard from "./SpellCard";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function SearchedSpellsPage({ globalSearchedSpell }) {
  return (
    <StyledSearchSpellsPage>
      <h1 className="sectionHeader">Searched Spell:</h1>
      <StyledCardGridView>
        <SpellCard {...globalSearchedSpell} />
      </StyledCardGridView>
    </StyledSearchSpellsPage>
  );
}

const StyledSearchSpellsPage = styled(motion.section)`
  margin: 2rem 0;
  .sectionHeader {
    font-size: 3rem;
    margin: 0 1.5rem;
  }
`;

const StyledCardGridView = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;
