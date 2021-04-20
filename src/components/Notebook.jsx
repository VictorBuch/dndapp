import { useEffect, useRef } from "react";

import styled from "styled-components";
import Page from "./Page";

export default function Notebook() {
  return (
    <section>
      <Page />
    </section>
  );
}

const StyledPage = styled.textarea`
  resize: none;
  border: 1px solid brown;
  width: 100%;
  height: 100%;
`;
