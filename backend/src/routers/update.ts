import { Router } from "express";
import { verifivationToken } from "../middleware/verification.js";
import { validation } from "../middleware/validation.js";

const update_router:Router = Router();

update_router.post("updateserver",verifivationToken);

export default update_router;