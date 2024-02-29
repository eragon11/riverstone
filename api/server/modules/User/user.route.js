import express from "express";
import Users from './user.controller';
import UserAuthController from "./../UserAuthentication/userAuth.controller";

const router = express.Router();

//Get all users data
router.get('/users', UserAuthController.verify, Users.getAllUser);
//Add a new email
router.post('/users/email/:emailId', UserAuthController.verify, Users.emailUser);

router.post('/users/roleBased',UserAuthController.verify, UserAuthController.hasRole, Users.addUser);

export default router;