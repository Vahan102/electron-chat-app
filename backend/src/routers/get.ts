import { Router } from "express";
import { validation } from "../middleware/validation.js";
import { getAdminServersController, getUserFriendController, getGroupMemebersController, getServerByLinkController, getUserByNameController, getUserServersController, getServerMessegesCotroller } from "../controllers/get.js";
import { verificationToken } from "../middleware/verification.js";


const get_router:Router = Router();
 
get_router.get("/getuserservers",verificationToken,getUserServersController);
get_router.get("/getadminservers",verificationToken,getAdminServersController);

get_router.get("/getuserbyname",validation("name","query"),getUserByNameController);
get_router.get("/getserverbylink",validation("link","query"),getServerByLinkController);

get_router.get("/getgroupusers",validation("link","query"),getGroupMemebersController);
get_router.get("/getuserfriends",verificationToken,getUserFriendController);

get_router.get("/getservermesseges",validation("link","query"),getServerMessegesCotroller)

export default get_router; 