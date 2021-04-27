import SpellCard from "./SpellCard";

import styled from "styled-components";
import { motion } from "framer-motion";

export default function AllSpellsPage({ loadedAllSpells }) {
  const cards = loadedAllSpells.map((element) => {
    return <SpellCard key={element} {...element} />;
  });

  return (
    <StyledAllSpellsPage>
      <h1 className="sectionHeader">All Spells</h1>
      <StyledCardGridView>{cards}</StyledCardGridView>
    </StyledAllSpellsPage>
  );
}

const StyledAllSpellsPage = styled(motion.section)`
  .sectionHeader {
    font-size: 3rem;
  }
`;

const StyledCardGridView = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;
