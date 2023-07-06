import express from "express"
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update a user 
router.put("/:id",verifyToken,update)
//delete a user
router.delete("/:id",verifyToken,deleteUser)
// get a user
router.get("/find/:id",getUser)
// subscribe a user
router.put("/subscribe/:id",verifyToken,subscribe)//this id is the id of the channnel
//unsubscribe a user
router.put("/unsubscribe/:id",verifyToken,unsubscribe)//this id is the id of the channnel
//like a video 
router.put("/like/:videoId",verifyToken, like)
//dislike a video
router.put("/dislike/:videoId",verifyToken, dislike)

export default router