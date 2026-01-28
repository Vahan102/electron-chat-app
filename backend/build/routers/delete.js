import { Router } from "express";
import { verificationToken } from "../middleware/verification.js";
import { validation } from "../middleware/validation.js";
import { deleteChatController, deleteServerController, deleteUserFromGroupController, leaveGroupController } from "../controllers/delete.js";
const delete_router = Router();
delete_router.delete("/deleteserver", verificationToken, validation("link", "body"), deleteServerController);
delete_router.delete("/leavegroup", verificationToken, validation("link", "body"), leaveGroupController);
// delete_router.delete("/deletefromfriends",verificationToken,validation("name","body"),deleteFriendController);
delete_router.delete("/deletechat", verificationToken, validation("link", "body"), deleteChatController);
delete_router.delete("/deleteuserfromgroup", verificationToken, validation("emailandlink", "body"), deleteUserFromGroupController);
export default delete_router;
//# sourceMappingURL=delete.js.map