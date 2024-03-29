import UserService from "../User/user.service";
import UserAuthCtrl from "../UserAuthentication/userAuth.controller";
import logger from "../../../config/logger.config";
import EmailService  from "../commonServices/email.service";

const UserController = {};

UserController.getAllUser = async (req, res) => {
  try {
    let search = req.query.searchkey;
    const users = await UserService.getAllUser(search);
    res.status(200).send({
      code: 200,
      status: "success",
      message: "Sucessfully retrieved profile records",
      data: users
    });
  } catch (error) {
    console.log(error);
    logger.error("Error in getting User record :" + error);
    res.status(400).send({
      code: 400,
      status: "error",
      message: "Error in getting user record",
      data: []
    });
  }
};

UserController.emailUser = async (req, res) => {
  try {
    await EmailService.SendEmail(req.params.emailId, req.body.subject, req.body.body)
    res.send({
      code: 200,
      status: "success",
      message: "Sucessfully send mail"
    });
  } catch (error) {
    logger.error("Error in sending mail" + error);
    res.send({
      code: 400,
      status: "error",
      message: "Error in sending mail"
    });
  }
};

UserController.addUser = async(req, res) =>{
  try {
    let payload = req.body;
    let user ={
      "user_name": payload.userName,
      "email": payload.email,
      "password": payload.password,
      "is_admin": false,
    }
    let data = await UserService.addUser(user);
    console.log(data)
    res.send({
      code: 200,
      status: "success",
      message: "Sucessfully added user"
    });
  } catch (error) {
    logger.error("Error in adding user" + error);
    res.send({
      code: 400,
      status: "error",
      message: "Error in adding user"
    });
  }
}
export default UserController;
