import { Router } from "express";
import ClientRouter from "./client.routes";
import SellerRouter from "./sellers.routes";

const router: Router = Router()
const clientRouter = new ClientRouter(Router())
const sellerRouter = new SellerRouter(Router())

router.use("/", clientRouter.routes)
router.use("/seller", sellerRouter.routes)

export default router