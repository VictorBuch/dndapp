import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Frame, useCycle } from "framer-motion";

const rotat = 180;
var isFlipped = true;

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
  const [animate1, cycle1] = useCycle(
    { scale: 1, rotateY: 0 },
    { scale: 1, rotateY: rotat }
  );
  const [animate2, cycle2] = useCycle(
    { scale: 1, rotateY: rotat },
    { scale: 1, rotateY: 0 }
  );
  return (
    <motion.div
      style={{
        margin: 0,
        background: null,
        borderRadius: 25,
        height: 400,
        width: 330,
        position: "absolute",
        // WebkitBackfaceVisibility: "hidden",
      }}
      //initial={{ rotateY: rotat }}
      //animate={animate1}
      onTap={() => (isFlipped && cycle2()) || (!isFlipped && cycle1())}
      onClick={() => (isFlipped = !isFlipped)}
    >
      <StyledCard>
        <StyledBackCard>
          <motion.div
            style={{
              margin: -170,
              background: "#2d2d2d",
              color: "#fffff",
              borderRadius: 25,
              height: 400,
              width: 330,
              position: "absolute",
              WebkitBackfaceVisibility: "hidden",
            }}
            initial={{ rotateY: rotat }}
            animate={animate2}
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
        </StyledBackCard>

        <StyledCardFront>
          <motion.div
            style={{
              margin: 0,
              background: "#2d2d2d",
              color: "#fffff",
              borderRadius: 25,
              height: 400,
              width: 330,
              position: "absolute",
              WebkitBackfaceVisibility: "hidden",
            }}
            initial={{ rotateY: 0 }}
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
      </StyledCard>
    </motion.div>
  );
}

// CSS styling for the general card shape
const StyledCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  background-color: white;
  color: white;
  border-radius: 5%;
  height: 400px;
  width: 330px;
`;

// CSS styling for the front of the spell card
const StyledCardFront = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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
const StyledBackCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .spellInfo {
    height: 53px;
    width: 100%;
  }
  .moreInfoTop {
    padding: 0px 20px;
    display: flex;
    flex-direction: row;
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
