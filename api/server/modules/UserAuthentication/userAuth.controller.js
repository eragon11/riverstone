import UserService from "../User/user.service";
import UserAuthService from "../UserAuthentication/userAuth.service";
import logger from "../../../config/logger.config";
import sha256 from "sha256";

const UserAuthController = {
  login: async (req, res) => {
    try {
      let email_id = req.body.email_id;
      let password = req.body.password;
      let loggedInUser = await UserService.getUserByEmailId(email_id);

      if (loggedInUser) {
        console.log(loggedInUser);
        if (loggedInUser.password === sha256(password)) {
          if (loggedInUser.status === "active") {
            let payload = {
              user_id: loggedInUser._id,
              user_name: loggedInUser.user_name,
              email: loggedInUser.email,
              is_admin: loggedInUser.is_admin
            };
            res.send({
              code: 200,
              status: "success",
              message: "Sucessfull Login",
              data: await UserAuthService.getJwtToken(payload)
            });
          } else {
            res.status(401).send({
              code: 401,
              status: "error",
              data: [],
              message: "Kindly activate your account to login."
            });
          }
        } else {
          res.status(401).send({
            code: 401,
            status: "error",
            data: [],
            message: "Invalid Password"
          });
        }
      } else {
        res.status(401).send({
          code: 401,
          status: "error",
          data: [],
          message: "Invalid Username"
        });
      }
    } catch (error) {
      console.log(error)
      res.status(401).send({
        code: 401,
        status: "error",
        message: "Invalid Username/Password",
        data: []
      });
    }
  },

  verify: async (req, res, next) => {
    let tokenSignature = req.headers["xauthtoken"];
    console.log(req.headers);
    console.log(tokenSignature);
    if (tokenSignature != undefined) {
      let token = await UserAuthService.verifyAndDecode(tokenSignature);
      console.log(token);
      req.userToken = token;

      if (token.valid) {
        return next();
      } else {
        res.status(401).send({
          status: "error",
          code: 401,
          message: "Token Invalid",
          data: {}
        });
      }
    } else {
      res.status(401).send({
        status: "error",
        code: 401,
        message: "Authentication Failure",
        data: {}
      });
    }
  },

  register: async (req, res) => {
    try {
      let User = {};
      User.user_name = req.body.user_name;
      User.email = req.body.email;
      User.password = req.body.password;
      User.status = 'active';
      User.is_admin = 'false';
      let userEmailExists = await UserService.getUserByEmailId(req.body.email);
      console.log(userEmailExists);
      if (userEmailExists) {
        return res.status(400).send({
          code: 400,
          status: "error",
          message: "User/Email id already exists",
          data: []
        });
      }

      let savedUser = await UserService.addUser(User);
      User.user_id = savedUser._id;
      let logInData = await UserAuthService.getJwtToken(User);

      delete logInData.password;
      res.setHeader("xauthtoken", logInData.token);

      res.status(200).send({
        code: 200,
        status: "success",
        message: "Sucessfully Signed Up",
        data: logInData
      });
    } catch (error) {
      logger.error("Error in sign up" + error);
      res.status(400).send({
        code: 400,
        status: "error",
        message: "Error in sign Up:" + error.message,
        data: []
      });
    }
  }
};


export default UserAuthController;
