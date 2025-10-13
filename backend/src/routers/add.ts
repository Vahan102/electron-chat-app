import { Router } from "express";
import { verifivationToken } from "../middleware/verification.js";
import { createChannelController } from "../controllers/add.js";
import { validation } from "../middleware/validation.js";

const add_router:Router = Router();
 
add_router.post("/createserver",verifivationToken,validation("createServer","body"),createChannelController);


export default add_router; 