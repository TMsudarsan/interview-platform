import express from "express";
import { getStreamToken } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const route = express.Router()

route.get("/token", protectRoute,getStreamToken)

export default route;