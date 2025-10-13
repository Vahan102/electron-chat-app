import { Router } from "express";
import { verifivationToken } from "../middleware/verification.js";
import { validation } from "../middleware/validation.js";
import { deleteServerController } from "../controllers/delete.js";

const delete_router:Router = Router();

delete_router.post("/deleteserver",verifivationToken,validation("deleteServer","body"),deleteServerController);

export default delete_router;