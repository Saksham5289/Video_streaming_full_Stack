import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";


const Container = styled.div`
  display: flex;
  
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({theme}) =>{ return theme.bgLighter}};
`;
const Wrapper = styled.div`

`;

function App() {

  const [darkMode,setdarkMode] = useState(true);

  return (
    <Router>
    <ThemeProvider theme={darkMode? lightTheme : darkTheme}> 
    {/* //this theme provider has encovered the entire application */}
    <Container>
      <Menu themeToggle={setdarkMode} originalTheme={darkMode} />
      <Main>
        <Navbar />
        <Wrapper>
         <Routes>
          <Route path="/" element={<Home type="random" />}/>
          <Route path="/trends" element={<Home type="trend"/>}/>
          <Route path="/subscriptions" element={<Home type="sub"/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/video/:id" element={<Video/>}/>
         </Routes>
        </Wrapper>
      </Main>
    </Container>
    </ThemeProvider>
    </Router>
  );
}

export default App;
