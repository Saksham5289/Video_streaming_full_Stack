import { Save, Share, Support, ThumbDown, ThumbDownOffAltOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import Icon from "../img/icon.png";
import styled from 'styled-components'
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';
// import {Recommendation} from '../components/Recommendation.js'

const Container = styled.div`
  display: flex;
  gap:24px;
`
const Content = styled.div`
  flex: 5;
  padding: 0px 70px;
`

const Hr = styled.hr`
border: 0.5px solid ${({theme})=>theme.soft};
margin: 15px 0px;
`

const VideoWrapper = styled.div`

`
const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 10px;
margin-bottom: 4px;
color: ${({theme})=>theme.text};
`

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Info = styled.span`
  color: ${({theme})=>theme.textSoft};
`
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({theme})=>theme.text};
`
const Button = styled.div`
  cursor: pointer;
`
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  `
  const ChannelInfo = styled.div`
    display: flex;
    gap: 20px;
  `
  const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius:3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  `
  const Image = styled.img`
  width: 50px;
  height:50px;
  border-radius: 50%;
  object-fit: contain;
  `
    
  const ChannelDetail = styled.div`
  display:flex;
  flex-direction: column;
  color: ${({theme})=>theme.text};
  `
  const ChannelName = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 4px;`

  const ChannelCounter = styled.span`
  margin-top:5px;
  margin-bottom: 20px;
  color: ${({theme})=>theme.textSoft};
  font-size: 12px;
  `
  const Description = styled.p`
  font-size:15px;`
  
  const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const {currentUser} = useSelector((state)=> state.user);
  const {currentVideo} = useSelector((state)=> state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2]

  // const [video,setVideo] = useState({}) // ye seekhna hai ki ye kyun nhi use kar rahe ..
  const [channel,setChannel]= useState({})

  useEffect(()=>{
  
    const fetchData = async()=>{
      try{
        console.log(path)
    const videoRes =  await axios.get(`/videos/find/${path}`)
    console.log(videoRes)
    const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)
      // setVideo(videoRes.data)
      setChannel(channelRes.data)
      dispatch(fetchSuccess(videoRes.data));}
      catch(err){}
    };
    fetchData();
  }
  ,[path,dispatch])
  
  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
    // dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
    // dispatch(dislike(currentUser._id));
  };

  const handleSub = async()=>{
    currentUser.subscribedUsers.includes(channel._id) ?
    await axios.put(`/users/subscribe/${channel._id}`):
    await axios.put(`/users/unsubscribe/${channel._id}`);
        dispatch(subscription(channel._id));
        // dispatch(subscribe(currentUser._id));
  }
  return (
    <Container>
      <Content>
    <VideoWrapper>
      <VideoFrame src={currentVideo.videoUrl} controls >

      </VideoFrame>
    </VideoWrapper>
    <Title>
      {currentVideo?.title}
    </Title>
    <Details>
      <Info>{currentVideo?.views} views * {format(currentVideo?.createdAt)}</Info>
      <Buttons>
      <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser?._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOutlined />
              )}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOffAltOutlined />
              )}
              Dislike
            </Button>
        <Button><Share/></Button>
        <Button><Save/></Button>
      </Buttons>
    </Details>
    <Hr/>
    <Channel>
      <ChannelInfo>
              <Image src={channel.img}/>
              <ChannelDetail>
                <ChannelName>{channel.name}</ChannelName>
                                <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
                                <Description>{currentVideo?.desc}</Description>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe onClick={handleSub} >
              {currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED":"SUBSCRIBE"}
            </Subscribe>
    </Channel>
    <Comments videoId={currentVideo._id} />
      </Content>
<Recommendation tags={currentVideo.tags}/>

     
    </Container>
  )
}

export default Video
