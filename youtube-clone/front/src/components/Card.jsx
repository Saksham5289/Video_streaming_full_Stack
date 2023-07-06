import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import Icon from "../img/icon.png";
import { Link } from 'react-router-dom';
import {format} from "timeago.js"
import axios from 'axios';

const Container  = styled.div`
width: 360px;
margin-bottom: ${(props)=>props.type ==="sm"?"10px" : "30px" };
padding:${(props)=>props.type ==="sm"&& "0px 10px"  } ;
cursor: pointer;
display: ${(props)=>props.type ==="sm" && "flex"};
`
const Image = styled.img`
  width:${(props)=>props.type ==="sm" ? "100%" : "100%"};
  height:${(props)=>props.type ==="sm" ? "120px" : "202px"};
  background-color: #333;
`
const Details = styled.div`
 display: flex;
 margin-top: 16px;
 gap:12px;
`
const SmallImg = styled.img`
  
  height: 30px;
  width: 30px;
  object-fit: contain;
  
`
const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const VideoTitle = styled.h1`
  font-weight: bold;
  font-size: 1rem;

  left: 40px ;
`
const CreatorName = styled.h2`
    font-size: 0.8rem;
    color: grey;
    
    bottom: 20px;
    left: 40px;

`
const VideoStats = styled.div`
  font-size: 0.6rem;
  
  bottom: 5px;
  left: 40px;
`

const Card = ({type,video}) => {
  
  const [channel,setChannel] = useState({});
  useEffect(()=>{
    const fetchChannel = async()=>{
      const res = await axios.get(`/users/find/${video.userId}`)

      
      
      setChannel(res.data);
     
    };
    fetchChannel();
  },[video.userId]);

  return (
      <Link to={`/video/${video._id}`} style={{textDecoration:"none",color:"black"}} >
    <Container type={type} >
      <Image type={type} src={video.imgUrl}/>
      <Details type={type}>
        {channel && <SmallImg type={type} src={channel.img} />}
        <Texts>
        <VideoTitle>
    {video.title}
        </VideoTitle>
        <CreatorName>
  {channel &&  <span>{channel.name}</span>}
        </CreatorName>
        <VideoStats>
    <span>{video.views} views  {format(video.createdAt)}</span>
        </VideoStats>
        </Texts>
      </Details>
    </Container>
      </Link>
  )
}


export default Card
