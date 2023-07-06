import { Person, SearchOff, SearchRounded, VideoCall } from '@mui/icons-material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Upload from './Upload';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({theme})=> theme.bgLighter};
  height: 56px;
  padding: 0px;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  position: relative;
 
`
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;

`
const Input = styled.input`
 width: 90%;
 border:none;
background-color: transparent;
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
   
    cursor: pointer;
   
`
const User = styled.div`
display: flex;
align-items: center;
gap:10px;
font-weight: 500;
color: ${({theme})=>theme.text};
margin-right: 10px;
`
const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
`

const Navbar = () => {
  const navigate = useNavigate()
  const[open,setOpen] = useState(false)
  const[q,setQ] = useState("false")
  const {currentUser} = useSelector(state=>state.user)
  return (
    <>    <Container>
      <Wrapper>
        <Search>
          <Input placeholder='Search..' onChange={e=>setQ(e.target.value)}/>
          <SearchRounded style={{color:"grey"}}  onClick={()=>navigate(`/search?q=${q}`)}/>
        </Search>

       {currentUser ? <User>
          <VideoCall onClick={()=>setOpen(true)} />
          <Avatar src={currentUser.img} />
          {currentUser.name}
          </User>
         : <Link to="/signin">
     <Button>
          <span><Person/></span>
         <span> Sign-in </span>
        </Button>
        </Link>}
        </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen} />}
    </>

  )
}

export default Navbar
