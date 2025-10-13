import { Router } from "express";
//users routers
import authentication_router from "./authentication.js";
import add_router from "./add.js";
import delete_router from "./delete.js";
import update_router from "./update.js";


const router: Router = Router();

//user path
router.use("/authentication",authentication_router);
router.use("/add",add_router);
router.use("/delete",delete_router);
router.use("/update",update_router);

export default router;
