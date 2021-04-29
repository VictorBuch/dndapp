import SpellCard from "./SpellCard";

import { nanoid } from "nanoid";

import styled from "styled-components";
import { motion } from "framer-motion";

export default function AllSpellsPage({ loadedAllSpells }) {
  const cards = loadedAllSpells.map((element) => {
    return <SpellCard key={nanoid()} {...element} />;
  });

  return (
    <StyledAllSpellsPage>
      <h1 className="sectionHeader">All Spells:</h1>
      <StyledCardGridView>{cards}</StyledCardGridView>
    </StyledAllSpellsPage>
  );
}

const StyledAllSpellsPage = styled(motion.section)`
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
