import User from "../User/user.model";
import sha256 from "sha256";

const UserService = {};

UserService.getAllUser = async (searchkey) => {
  try {

    if (searchkey) {
      var users = await User.find({ "name": { "$regex": searchkey, "$options": "i" }, "status": "active" }, { password: 0}).lean();
      return users;

    } else {
      var users = await User.find({"status": "active" },
        { password: 0}).lean();
      return users;

    }
  } catch (error) {
    throw error;
  }
};

UserService.addUser = async user => {
  try {
    user.password = await sha256(user.password);
    let userToAdd = new User(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

UserService.getUserByEmailId = async EmailId => {
  try {
    const user = await User.findOne({ email: new RegExp("^" + EmailId + "$", "i") });
    return user;
  } catch (error) {
    throw error;
  }
};

export default UserService;
