const { Router } = require("express");
const userRouter = Router();
const userController = require("../Controllers/usercontroller");
const { authenticate, isAdmin } = require("../Middlewear/usermiddleware");
const usercontroller = require("../Controllers/usercontroller");

userRouter.route("/login")
.post(userController.Login);
    userRouter.post("/signup", userController.Create);

userRouter.route("/")
.post(userController.Create)
.get(userController.getAll);
userRouter.route("/:id")
.get(userController.getById)
.put(userController.Update)
.delete(userController.Delete)

module.exports = userRouter