import React from "react";
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
}) {
  // We make two new animations and cycles
  // Within the useCycle() we define the animation.
  // We can then call the given cycle to animate between the two states descirbed within the useCycle({state1}, {state2})
  const [animate1, cycle1] = useCycle({ rotateY: 0 }, { rotateY: 180 });
  const [animate2, cycle2] = useCycle({ rotateY: 180 }, { rotateY: 0 });
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
              <p>Casting Time:</p>
              <p>{casting_time}</p>
            </div>

            <div className="rangeBack">
              <p>Range:</p>
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
              <p>Components:</p>
              <p>{material}</p>
              <div className="components">
                {components.map((element) => (
                  <p>{element} </p>
                ))}
              </div>
            </div>
            <div className="duration">
              <p>Duration:</p>
              {concentration && <p>Concentration</p>}
              <p>{duration}</p>
            </div>
          </div>
          <div className="spellDesc">{desc[0]}</div>
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
          <figure className="spellImg">
            <img src="https://picsum.photos/250/250" alt="" />
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
              {area_of_effect && <p>{area_of_effect.size} ft.</p>}
            </div>
            <div className="components">
              {components.map((element) => (
                <p>{element} </p>
              ))}
            </div>
            <p>
              {concentration && "C. "}
              {duration}
            </p>
          </div>
        </motion.div>
      </StyledCardFront>
    </motion.div>
  );
}

// CSS styling for the front of the spell card
const StyledCardFront = styled(motion.div)`
  .topInfo {
    display: flex;
    width: 330px;
    padding: 10px 15px;
    justify-content: space-between;
  }

  .otherInfo {
    display: flex;
    width: 330px;
    padding: 5px 15px 0px 15px;
    justify-content: space-between;
    align-items: center;
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
  .spellInfo {
    height: 53px;
    width: 100%;
  }

  .moreInfoTop {
    padding: 0px 20px;
    display: flex;
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    height: 71px;
    width: 100%;
    background-color: #fefefc;
    color: black;
    .rangeBack {
      display: flex;
      flex-direction: column;
    }
  }

  .moreInfoBottom {
    padding: 0px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: start;
    height: 71px;
    width: 100%;
    background-color: #fefefc;
    color: black;

    .componentsBack {
      display: flex;
      flex-direction: column;

      .components {
        display: flex;
      }
    }
  }

  .spellDesc {
    background-color: #ececec;
    color: black;
    padding: 15px;
    width: 100%;
    height: 175px;
    text-align: justify;
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
