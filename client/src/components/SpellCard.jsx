import React, { useContext } from "react";
import { StateManagerContext } from "../components/StateManager";

import axios from "axios";

import styled from "styled-components";
import { motion } from "framer-motion";
import { Frame, useCycle } from "framer-motion";
import { nanoid } from "nanoid";

var isFlipped = false;

// this massive import is what the API returns
// so what happens here is we destructure the API spell object
export default function SpellCardFront({
  name,
  level,
  school,
  area_of_effect,
  casting_time,
  range,
  components,
  duration,
  ritual,
  concentration,
  material,
  desc,
  classes,
  url,
}) {
  // global state
  const { globalUser, globalIsLoggedIn } = useContext(StateManagerContext);
  const [isLoggedIn, setIsLoggedIn] = globalIsLoggedIn;
  const [user, setUser] = globalUser;

  // We make two new animations and cycles
  // Within the useCycle() we define the animation.
  // We can then call the given cycle to animate between the two states descirbed within the useCycle({state1}, {state2})
  const [animate1, cycle1] = useCycle({ rotateY: 0 }, { rotateY: 180 });
  const [animate2, cycle2] = useCycle({ rotateY: 180 }, { rotateY: 0 });

  let spellImage;
  switch (school.name) {
    case "Transmutation":
      spellImage = "./images/Transmut.png";
      break;
    case "Evocation":
      spellImage = "./images/Evoc.png";
      break;
    case "Necromancy":
      spellImage = "./images/Necro.png";
      break;
    case "Abjuration":
      spellImage = "./images/Abjur.png";
      break;
    case "Conjuration":
      spellImage = "./images/Conjur.png";
      break;
    case "Divination":
      spellImage = "./images/Divin.png";
      break;
    case "Illusion":
      spellImage = "./images/Illu.png";
      break;
    case "Enchantment":
      spellImage = "./images/Encha.png";
      break;
    default:
      spellImage = "https://picsum.photos/250/250";
      break;
  }

  async function addSpellToUser() {
    if (!isLoggedIn) {
      window.alert("You must be logged in to save spells");
      return;
    }
    console.log(user.addedSpells);
    if (user.addedSpells.includes(url)) {
      window.alert("You already have this spell!");
      return;
    }
    try {
      const spellToAdd = await axios.post(
        "http://localhost:4000/api/addspell",
        {
          userName: user.userName,
          spellUrl: url,
        }
      );
      console.log(spellToAdd);
    } catch (error) {
      window.alert(error + ". \nUser not found");
      console.log(error);
    }
  }

  return (
    <motion.div
      // Styling the cards' shape and positions.
      style={{
        margin: 20,
        display: "flex",
        flexDirection: "column",
        color: "white",
        borderRadius: 25,
        height: 400,
        width: 330,
        import:
          "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap",
      }}
      // When tapping within the borders of the cards' background we cue
      // animation 'cycle1' or 'cycle2' depending on which side of the card is facing upwards.
      onTap={() => (isFlipped && cycle2()) || (!isFlipped && cycle1())}
      // When clicked within the border we change the boolean to keep track of which side is facing upwards.
      onClick={() => (isFlipped = !isFlipped)}
    >
      <StyledCardBack>
        <motion.div
          // Styling the back-side of the card (shape, colour & position)
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            background: "#2d2d2d",
            borderRadius: 25,
            height: 400,
            width: 330,
            position: "absolute",
            WebkitBackfaceVisibility: "hidden", // Makes the backside hidden, so when we rotate the card 180 it disappears O:
          }}
          // Make the card start rotated 180 degrees around the y. Is hidden initially.
          initial={{ rotateY: 180 }}
          // Decidess the duration of the animation.
          transition={{ duration: 1 }}
          // This is the animation. Described in the top.
          animate={animate2}
          // cycle() allows us to cycle between two states using animation.
          // Convenient when you want to flip a card back and forth.
          onTap={() => cycle1()}
        >
          <div className="spellInfo">
            <h1>{name}</h1>
            <h4>
              Level {level} {school.name}
            </h4>
          </div>
          <div className="moreInfoTop">
            <div className="castingTime">
              <h1>Casting Time:</h1>
              <p>{casting_time}</p>
            </div>

            <div className="rangeBack">
              <h1>Range:</h1>
              <p>{range}</p>
              {area_of_effect && <p>{area_of_effect.size} ft.</p>}
            </div>
          </div>
          <hr
            style={{
              backgroundColor: "black",
              height: 1,
              width: "310px",
              padding: "0px 10px",
              border: "none",
            }}
          />
          <div className="moreInfoBottom">
            <div className="componentsBack">
              <h1>Components:</h1>
              <p>{material}</p>
              <div className="components">
                {components.map((element) => (
                  <p>{element} </p>
                ))}
              </div>
            </div>
            <div className="duration">
              <h1>Duration:</h1>
              {concentration && <p>Concentration</p>}
              <p>{duration}</p>
            </div>
          </div>
          <div className="spellDesc">
            <p>{desc[0]}</p>
          </div>
          <div className="class">
            {classes.map((element, index) => {
              if (index === classes.length - 1) {
                return <p>{element.name}</p>;
              } else {
                return <p>{element.name}/ </p>;
              }
            })}
          </div>
        </motion.div>
      </StyledCardBack>

      <StyledCardFront>
        <motion.div
          // Same as above...
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            background: "#2d2d2d",
            borderRadius: 25,
            height: 400,
            width: 330,
            position: "absolute",
            WebkitBackfaceVisibility: "hidden",
          }}
          // Animation setup happens here again.
          initial={{ rotateY: 0 }}
          transition={{ duration: 1 }}
          animate={animate1}
          onTap={() => cycle2()}
        >
          <span className="addSpell" onClick={addSpellToUser}>
            &#43;
          </span>
          <figure className="spellImg">
            <img src={spellImage} alt="" />
          </figure>
          <div className="topInfo">
            <h1>{name}</h1>
            <div className="topInfoRight">
              <p>Level: {level}</p>
              <p>{school.name}</p>
            </div>
          </div>
          <hr
            style={{
              backgroundColor: "white",
              height: 3,
              width: "310px",
              padding: "0px 10px",
              border: "none",
            }}
          />
          <div className="otherInfo">
            <p>
              {casting_time}
              {ritual && " (R)"}
            </p>
            <div className="range">
              <p>{range}</p>

              {/* Check if it has an aoe, if yes, show the stat */}
              {area_of_effect && <p>{area_of_effect.size} feet</p>}
            </div>
            <div className="components">
              {components.map((element) => (
                <p>{element} </p>
              ))}
            </div>
            <div className="frontDuration">
              <p>
                {concentration && "C. "}
                {duration != "Instantaneous" && duration}
                {duration == "Instantaneous" && "Instant"}
              </p>
            </div>
          </div>
        </motion.div>
      </StyledCardFront>
    </motion.div>
  );
}

// CSS styling for the front of the spell card
const StyledCardFront = styled(motion.div)`
  cursor: pointer;
  font-family: "Open Sans", sans-serif;

  .addSpell {
    position: absolute;
    top: 0px;
    right: 20px;
    font-size: 3rem;
    :hover {
      color: red;
    }
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
  .topInfo {
    margin-top: 4rem;
    h1 {
      font-size: 1.5rem;
      align-self: flex-end;
    }
    display: flex;
    width: 330px;
    padding: 2px 10px;
    justify-content: space-between;
    text-align: start;
  }

  .topInfoRight {
    text-align: right;
  }

  .otherInfo {
    display: flex;
    width: 330px;
    padding: 5px 15px 0px 15px;
    justify-content: space-between;
    align-items: center;
  }

  .frontDuration {
    width: 70px;
    padding: 0px 0px 0px 0px;
    text-align: center;
    text-align-last: center;
  }

  .range {
  }

  .components {
    display: flex;
    justify-content: center;
  }
`;

// CSS styling for the back of the card
const StyledCardBack = styled(motion.div)`
  user-select: none;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  .spellInfo {
    height: 53px;
    width: 100%;
    h1 {
      font-size: 24px;
    }
  }

  .moreInfoTop {
    padding: 2px 35px 0px 20px;
    display: flex;
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    height: 65px;
    width: 100%;
    background-color: #fefefc;
    color: black;
    h1 {
      font-size: 16px;
    }

    p {
      font-size: 14px;
    }
    .rangeBack {
      display: flex;
      flex-direction: column;
    }
  }

  .moreInfoBottom {
    padding: 2px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: start;
    height: 65px;
    width: 100%;
    background-color: #fefefc;
    color: black;

    .componentsBack {
      display: flex;
      flex-direction: column;
      width: 9rem;
      margin-bottom: 5px;
      overflow: auto;

      h1 {
        font-size: 16px;
      }

      p {
        font-size: 14px;
      }

      .components {
        display: flex;
        p {
          font-size: 11px;
        }
      }
    }
    .duration {
      h1 {
        font-size: 16px;
      }
      p {
        font-size: 14px;
      }
    }
  }

  .spellDesc {
    background-color: #ececec;
    color: black;
    padding: 8px 10px 8px 10px;
    width: 100%;
    height: 175px;
    text-align: justify;
    overflow: auto;
    p {
      font-size: 13px;
    }
  }

  .class {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 27px;
    padding: 0px;
    font-size: 0.8rem;
  }
`;
