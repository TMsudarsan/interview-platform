import express from "express";
import { getStreamToken } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const chatRoute = express.Router()

chatRoute.get("/token", protectRoute,getStreamToken)

export default chatRoute;