import express from "express";
import UserAuthController from "./userAuth.controller"
const router = express.Router();

//Authenticate user and provide token for login
router.post('/users/login', (req, res) => {
    return UserAuthController.login(req, res);
});

// Admin can signup with API
router.post('/users/register', (req, res) => {
    return UserAuthController.register(req, res);
});
export default router;