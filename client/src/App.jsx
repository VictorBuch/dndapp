import { Fragment, useContext, useState } from "react";

//components
import Nav from "./components/Nav";
import { StateManagerContext } from "./components/StateManager";

// for testing
import SpellCard from "./components/SpellCard";

// styles
import styled from "styled-components";
import { GlobalStyle } from "./styles";

function App() {
  // global states
  const { globallySearchedSpell } = useContext(StateManagerContext);
  const [globalSearchedSpell, setGlobalSearchedSpell] = globallySearchedSpell;

  const [isSpellbookPage, setIsSpellbookPage] = useState(true);

  return (
    <Fragment>
      <GlobalStyle />
      <StyledApp className="App">
        <Nav />
        {/* Searched spells */}
        {globalSearchedSpell && <SpellCard {...globalSearchedSpell} />}
        {isSpellbookPage ? "all spells" : "Personal Spells"}
      </StyledApp>
    </Fragment>
  );
}
const StyledApp = styled.section`
  height: 100vh;
  background-color: #fff;
`;

export default App;
