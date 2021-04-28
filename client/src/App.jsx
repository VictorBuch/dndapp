import { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";

//components
import Nav from "./components/Nav";
import { StateManagerContext } from "./components/StateManager";
import AllSpellsPage from "./components/AllSpellsPage";
import MySpellsPage from "./components/MySpellsPage";
import SearchedSpellsPage from "./components/SearchedSpellsPage";

// for testing
import SpellCard from "./components/SpellCard";

// styles
import styled from "styled-components";
import { GlobalStyle } from "./styles";

function App() {
  // global states
  const { globallySearchedSpell } = useContext(StateManagerContext);
  const [globalSearchedSpell, setGlobalSearchedSpell] = globallySearchedSpell;

  // loacl state
  const [isSpellbookPage, setIsSpellbookPage] = useState(true);
  const [loadedAllSpells, setLoadedAllSpells] = useState([]);
  const [allSpellsAreFetched, setAllSpellsAreFetched] = useState(false);

  const allSpellsObject = [];
  const baseURL = "https://www.dnd5eapi.co";

  useEffect(() => {
    async function fetchAllSpells() {
      try {
        const spell = await axios.get(`https://www.dnd5eapi.co/api/spells/`);
        // gets the spell and use for later use
        allSpellsObject.push(spell.data);
        console.log("All Spells Object results");
        console.log(allSpellsObject[0].results);

        const forLoop = async (_) => {
          console.log("Start");

          // Use this for loop to fetch all the spells. We might want to fetch a few first and then the rest when the site has loaded
          // because if we fetch all at once the user has to wait 1 minute to see any spells. Not nice
          // for (
          //   let index = 0;
          //   index < allSpellsObject[0].results.length;
          //   index++
          // ) {
          for (let index = 0; index < 10; index++) {
            const element = await axios.get(
              baseURL + allSpellsObject[0].results[index * 20].url
            );
            // console.log("element");
            // console.log(element.data);
            const copy = loadedAllSpells;
            copy.push(element.data);
            setLoadedAllSpells(copy);
          }
          console.log("End");
          setAllSpellsAreFetched(true);
        };
        forLoop();
      } catch (error) {
        console.log(error);
        window.alert(
          error + ". Make sure the spell is from the players handbook"
        );
      }
    }
    fetchAllSpells();
    console.log("Fetching all spells");
  }, []);

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
    <Fragment>
      <GlobalStyle />
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
    </Fragment>
  );
}
const StyledApp = styled.section`
  height: 100vh;
  background-color: #fff;
`;

export default App;
