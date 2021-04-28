import styled from "styled-components";
import { motion } from "framer-motion";

export default function MySpellsPage() {
  return (
    <StyledCardGridView>
      <h1 className="sectionHeader">My Spells: </h1>
    </StyledCardGridView>
  );
}

const StyledCardGridView = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  .sectionHeader {
    font-size: 3rem;
    margin: 0 1.5rem;
  }
`;
