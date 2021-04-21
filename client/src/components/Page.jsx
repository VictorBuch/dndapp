import { useState } from "react";
import styled from "styled-components";

export default function Page() {
  return (
    <StyledPaper className="paper">
      <div className="text" contentEditable spellCheck="false">
        Notes
      </div>
    </StyledPaper>
  );
}

const StyledPaper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap");
  body {
    margin: 0;
    padding: 0;
    background: red;
  }
  .paper {
    position: absolute;
    height: 550px;
    width: 450px;
    background: rgba(255, 255, 255, 0.9);
    margin: -275px -225px;
    left: 50%;
    top: 50%;
    box-shadow: 5px 5px 5px 0px #888;
  }
  .paper::before {
    content: "";
    position: absolute;
    left: 45px;
    height: 100%;
    width: 2px;
    background: rgba(255, 0, 0, 0.4);
  }
  .text {
    position: absolute;
    top: 65px;
    left: 55px;
    bottom: 10px;
    right: 10px;
    line-height: 25px;
    font-family: "Architects Daughter", cursive;
    overflow: hidden;
    outline: none;
    font-size: 2rem;
    line-height: 1.5em;
  }
`;
