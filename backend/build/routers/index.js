import { Router } from "express";
//users routers
import authentication_router from "./authentication.js";
import add_router from "./add.js";
import delete_router from "./delete.js";
import update_router from "./update.js";
import get_router from "./get.js";
const router = Router();
//user path
router.use("/authentication", authentication_router);
router.use("/get", get_router);
router.use("/add", add_router);
router.use("/delete", delete_router);
router.use("/update", update_router);
export default router;
//# sourceMappingURL=index.js.map