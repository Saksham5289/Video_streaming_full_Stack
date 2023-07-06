import User from "../models/User.js";
import Video from "../models/Video.js"

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
      const savedVideo = await newVideo.save();
      res.status(200).json(savedVideo);
    } catch (err) {
      next(err);
    }
  };
export const updateVideo = async(req,res)=>{
    try{
        const video = await Video.findById(req.params.id);
        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
                        res.status(200).json(updatedVideo)
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}
export const deleteVideo = async(req,res)=>{
    try{
        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id);
            
                        res.status(200).json("Video deleted successfully")
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}
export const getVideo = async(req,res)=>{
    try{
const video = await Video.findById(req.params.id);
res.status(200).json(video)
    }
    catch(err){
        res.status(400).json(err)
    }
}

export const viewVideo = async(req,res)=>{
try{
    const video = await Video.findById(req.params.id);
    video.views++;
    res.status(200).json("view has been increased")
}
catch(err){
    res.status(400).json(err)
}

}
export const random = async(req,res)=>{
    try{
    const videos = await Video.aggregate([{ $sample:{size:40}}]);
    res.status(200).json(videos)
    }
    catch(err){
        res.status(400).json(err)
    }
}

export const trend = async(req,res)=>{
    try{
        const videos = await Video.find().sort({views:-1}) // -1 means most viewed where 1 wud have meant least viewed videos
        res.status(200).json(videos)
    }
    catch(err){
        res.status(400).json(err)
    }
};
export const sub = async(req,res)=>{
    
    try{
        
const user = await User.findById(req.user.id);
const subscribedChannels = user.subscribedUsers;

const list = await Promise.all(
    subscribedChannels.map(async(channelId)=>{
        return await Video.find({userId:channelId})
    })//isme na yahan pr nested arrays aayenge coz lets say hmne sandeep aur technical ko subscribe kiyah ia to ab hme ek super array milega aur uske andar 2 chotte arrays honge , jinme ek array hoga sandeep ki videos ka aur doosra array hoga technical ki video ka , to hme ye nhi chahiye ,hme ek single array hi banana hai
   
)
res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt)); 
    }
    catch(err){
        console.log("hello")
        res.status(400).json(err)
    }
}

export const getByTag = async(req,res)=>{
    const tags = req.query.tags.split(",");
    console.log(tags)
    try{
        const videos = await Video.find({tags:{$in:tags}}).limit(20) 
        res.status(200).json(videos)
    }
    catch(err){
        res.status(400).json(err)
    }
};

export const Search = async(req,res)=>{
    const query = req.query.q
    try{
        const videos = await Video.find({title:{$regex:query,$options:"i"}}).limit(40) // -1 means most viewed where 1 wud have meant least viewed videos
        res.status(200).json(videos)
    }
    catch(err){
        res.status(400).json(err)
    }
};