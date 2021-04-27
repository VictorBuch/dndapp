import { useContext, useEffect, useState } from "react";
import { StateManagerContext } from "./StateManager";
import SpellCard from "./SpellCard";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function SearchedSpellsPage() {
  // global states
  const { globallySearchedSpell } = useContext(StateManagerContext);
  const [globalSearchedSpell, setGlobalSearchedSpell] = globallySearchedSpell;
  const [localSearchedSpell, setLoaclSearchedSpell] = useState([]);

  useEffect(() => {
    setLoaclSearchedSpell(globallySearchedSpell);
  }, [globallySearchedSpell]);

  return (
    <StyledSearchSpellsPage>
      <h1 className="sectionHeader">Searched Spells</h1>
      <StyledCardGridView></StyledCardGridView>
    </StyledSearchSpellsPage>
  );
}

const StyledSearchSpellsPage = styled(motion.section)`
  .sectionHeader {
    font-size: 3rem;
  }
`;

const StyledCardGridView = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;
