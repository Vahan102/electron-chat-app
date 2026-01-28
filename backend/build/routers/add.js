import { Router } from "express";
import { verificationToken } from "../middleware/verification.js";
import { addChatController, addUserIngroupController, createServerController, joinGroupController } from "../controllers/add.js";
import { validation } from "../middleware/validation.js";
const add_router = Router();
add_router.post("/createserver", verificationToken, validation("name", "body"), createServerController);
add_router.post("/joingroup", verificationToken, validation("link", "body"), joinGroupController);
// add_router.post("/addfriend",verificationToken,validation("tagname","body"),addFriendController);
add_router.post("/addchat", verificationToken, validation("email", "body"), addChatController);
add_router.post("/adduseringroup", verificationToken, validation("emailandlink", "body"), addUserIngroupController);
export default add_router;
//# sourceMappingURL=add.js.map