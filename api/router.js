import userRouter from './server/modules/User/user.route';
import userAuthRouter from "./server/modules/UserAuthentication/userAuth.route";

let router = [];

router.push(userRouter);
router.push(userAuthRouter);
export default router;