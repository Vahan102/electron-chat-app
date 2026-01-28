import { Router } from "express";
import { loginController, registrationController } from "../controllers/authentication.js";
import { validation } from "../middleware/validation.js";
const authentication_router = Router();
authentication_router.post("/registration", validation("reg", "body"), registrationController);
authentication_router.post("/login", validation("login", "body"), loginController);
export default authentication_router;
//# sourceMappingURL=authentication.js.map