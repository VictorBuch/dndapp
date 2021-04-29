import { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";

// Components
import Nav from "../components/Nav";
import { StateManagerContext } from "../components/StateManager";
import AllSpellsPage from "../components/AllSpellsPage";
import MySpellsPage from "../components/MySpellsPage";
import SearchedSpellsPage from "../components/SearchedSpellsPage";

// styles
import styled from "styled-components";

function SpellBook({ allSpellsAreFetched, loadedAllSpells }) {
  // global states
  const { globallySearchedSpell } = useContext(StateManagerContext);
  const [globalSearchedSpell, setGlobalSearchedSpell] = globallySearchedSpell;

  // loacl state
  const [isSpellbookPage, setIsSpellbookPage] = useState(true);

  var allSpellsPage;
  if (allSpellsAreFetched) {
    allSpellsPage = <AllSpellsPage loadedAllSpells={loadedAllSpells} />;
  } else {
    allSpellsPage = (
      <h1 style={{ fontSize: "3rem", margin: "2rem 1.5rem" }}>
        The 🧙 is fetching spells, please wait
      </h1>
    );
  }

  return (
    <StyledApp className="App">
      <Nav
        setIsSpellbookPage={setIsSpellbookPage}
        isSpellbookPage={isSpellbookPage}
      />
      {/* Searched spells */}
      {globalSearchedSpell && (
        <SearchedSpellsPage globalSearchedSpell={globalSearchedSpell} />
      )}

      {isSpellbookPage ? allSpellsPage : <MySpellsPage />}
    </StyledApp>
  );
}
const StyledApp = styled.section`
  height: 100vh;
  background-color: #fff;
`;

export default SpellBook;
