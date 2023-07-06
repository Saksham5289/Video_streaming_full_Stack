import express from "express"
import { verifyToken } from "../verifyToken.js";
import { Search, addVideo, deleteVideo, getByTag, getVideo, random, sub, trend, updateVideo, viewVideo } from "../controllers/video.js";

const router = express.Router();

//create a video
router.post("/",verifyToken,addVideo)
router.get("/trend",trend)
router.get("/random",random)
router.get("/sub",verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search/", Search)
router.get("/:id",verifyToken,deleteVideo)
router.get("/:id",verifyToken,updateVideo)
router.get("/find/:id",getVideo)
router.get("/view/:id",viewVideo)


export default router