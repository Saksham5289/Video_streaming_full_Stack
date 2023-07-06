import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Icon from "../img/icon.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import RestoreIcon from '@mui/icons-material/Restore';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import HelpIcon from '@mui/icons-material/Help';
import LightModeIcon from '@mui/icons-material/LightMode';
import { History, MusicNote, Person } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  background-color: ${({theme}) =>{ return theme.bg}};//basically $ signifies we are going to write javascript , then it is an anonymous function, then {} to pass an object 
  /* background-color: ${({theme}) =>theme.bg};  */ //could have also been written like this 
  height: 100vh;
  color:  ${({theme}) =>{ return theme.text}};
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 30px;
`;
const Img = styled.img`
  height: 25px;
  width: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 30px;
  padding: 2px;
  cursor: pointer;
  &:hover{
    background-color: ${({theme}) =>{ return theme.soft}};
  }
`;
const Span = styled.span`
    font-size: 0.8rem;
`
const Button = styled.button`
     padding: 4px;
    border-color: #5fe6ff;
    border-radius: 5px;
    color: #30baff;
    background-color: rgb(32, 32, 32);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100px;
    margin: 20px 0px;
    cursor: pointer;
`



const Menu = ({themeToggle,originalTheme}) => {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{textDecoration:"none", color:"black"}}>
        <Logo>
          <Img src={Icon} />
          <h3>Youtube</h3>
        </Logo>
        </Link>
        <Link to="/"style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <HomeIcon />
          <Span>Home</Span>
        </Item>
        </Link>
       <Link to="/trends" style={{textDecoration:"none", color:"inherit"}}>
        <Item>
          <ExploreIcon />
          <Span>Trending</Span>
        </Item>
        </Link>
        <Link to="/subscriptions"style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <SubscriptionsIcon />
          <Span>Subscriptions</Span>
        </Item>
        </Link>
        <hr/>
        <Item>
          <LibraryMusicIcon />
          <Span>Library</Span>
        </Item>
        <Item>
          <History />
          <Span>History</Span>
        </Item>
        <hr/>
       {!currentUser && 
       <>
       <Link to="/signin">
        <Button>
          <span><Person/></span>
         <span> Sign-in </span>
        </Button>
        </Link>
        <hr/>
        </>}
        <Item>
          <MusicNote />
          <Span>Music</Span>
        </Item>
        <Item>
          <SportsBasketballIcon />
          <Span>Sports</Span>
        </Item>
        <Item>
          <SportsEsportsIcon />
          <Span>Gaming</Span>
        </Item>
        <Item>
          <MovieFilterIcon />
          <Span>Movies</Span>
        </Item>
        <Item>
          <NewspaperIcon />
          <Span>News</Span>
        </Item>
        <Item>
          <LiveTvIcon />
          <Span>Live</Span>
        </Item>
        <hr/>
        <Item>
          <SettingsIcon />
          <Span>Settings</Span>
        </Item>
        <Item>
          <FlagCircleIcon />
          <Span>Report</Span>
        </Item>
        <Item>
          <HelpIcon />
          <Span>Help</Span>
        </Item>
        <Item>
          <LightModeIcon />
          <Span onClick={()=>{themeToggle(!originalTheme)}} >{originalTheme ? "Dark": "Light"}</Span>
        </Item>
   
      </Wrapper>
    </Container>
  );
};

export default Menu;
