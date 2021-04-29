import { StateManagerContext } from "./StateManager";

import styled from "styled-components";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import SpellCard from "./SpellCard";
import { nanoid } from "nanoid";

export default function MySpellsPage() {
  // global state
  const { globalUser, globalIsLoggedIn } = useContext(StateManagerContext);
  const [user, setUser] = globalUser;
  const [isLoggedIn, setIsLoggedIn] = globalIsLoggedIn;

  // local state
  const [fetchedUserSpells, setFetchUserSpells] = useState([
    {
      area_of_effect: { type: "sphere", size: 20 },
      casting_time: "1 action",
      classes: [
        { index: "sorcerer", name: "Sorcerer", url: "/api/classes/sorcerer" },
        { index: "wizard", name: "Wizard", url: "/api/classes/wizard" },
      ],
      components: ["V", "S", "M"],
      concentration: false,
      damage: {
        damage_type: {
          index: "fire",
          name: "Fire",
          url: "/api/damage-types/fire",
        },
      },
      dc: {
        dc_type: { index: "dex", name: "DEX", url: "/api/ability-scores/dex" },
        dc_success: "half",
      },
      desc: [
        "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.",
        "The fire spreads around corners. It ignites flammable objects in the area that arent being worn or carried.",
      ],
      duration: "Instantaneous",
      higher_level: [
        "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.",
      ],

      index: "fireball",
      level: 3,
      material: "A tiny ball of bat guano and sulfur.",
      name: "Fireball",
      range: "150 feet",
      ritual: false,
      school: {
        index: "evocation",
        name: "Evocation",
        url: "/api/magic-schools/evocation",
      },
      url: "/api/spells/fireball",
    },
  ]);

  useEffect(() => {
    // fetch the users spells
  }, []);

  return (
    <StyledMySpellsPage>
      {isLoggedIn ? (
        <>
          <h1 className="sectionHeader">My Spells: </h1>
          <StyledCardGridView>
            {fetchedUserSpells.map((element) => {
              return <SpellCard key={nanoid()} {...element} />;
            })}
          </StyledCardGridView>
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;
