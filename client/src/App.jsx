import { Fragment, useEffect, useState } from "react";
import axios from "axios";

// Router
import { Switch, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import SpellBook from "./pages/SpellBook";

// styles
import { GlobalStyle } from "./styles";

export default function App() {
  // loacl state
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
        // console.log("All Spells Object results");
        // console.log(allSpellsObject[0].results);

        const forLoop = async (_) => {
          // console.log("Start");

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
            const copy = loadedAllSpells;
            copy.push(element.data);
            setLoadedAllSpells(copy);
          }
          // console.log("End");
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

  return (
    <Fragment>
      <GlobalStyle />
      <Switch>
        {/* Routes are used to render pages with mathing URL */}
        <Route path="/" exact>
          <SpellBook
            allSpellsAreFetched={allSpellsAreFetched}
            loadedAllSpells={loadedAllSpells}
          />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Fragment>
  );
}
