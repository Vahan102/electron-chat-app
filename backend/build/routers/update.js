import { Router } from "express";
import { verificationToken } from "../middleware/verification.js";
import { updateProfileController, updateServerController } from "../controllers/update.js";
import { updateOffer } from "../middleware/middlewarefunctions.js";
const update_router = Router();
update_router.put("/updateserver", updateOffer, verificationToken, updateServerController);
update_router.put("/updateprofile", updateOffer, verificationToken, updateProfileController);
export default update_router;
//# sourceMappingURL=update.js.map