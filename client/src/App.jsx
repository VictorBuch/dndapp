import { Fragment } from "react";

//components
import Notebook from "./components/Notebook";
import Nav from "./components/Nav";

// styles
import styled from "styled-components";
import { GlobalStyle } from "./styles";

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <StyledApp className="App">
        <Nav />
        {/* <Notebook /> */}
      </StyledApp>
    </Fragment>
  );
}
const StyledApp = styled.section`
  height: 100vh;
  background-color: #fff;
`;

export default App;
