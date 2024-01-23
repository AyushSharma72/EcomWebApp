const express = require("express");
const {
  loginController,
  registerController,
  ForgotPassword,
  UpdateProfileController,
  GetAllOrderController,
  GetAllAdminOrderController,
  UpdateOrderStatus,
  CancelOrder,
  GetUsersList,
  DeleteUser,
  UserCountController,
} = require("../controllers/Authcontroller");
const requireSignIn = require("../middlewares/authMiddleware");
const IsAdmin = require("../middlewares/Isadmin");

//roter object
const router = express.Router();

//routing

//register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//user protected route
router.get("/userAuth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//admin protected route
router.get("/AdminAuth", requireSignIn, IsAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.post("/forgetPassword", ForgotPassword);

router.put("/Profile", requireSignIn, UpdateProfileController);

router.get("/orders", requireSignIn, GetAllOrderController);

router.get("/Adminorders", requireSignIn, IsAdmin, GetAllAdminOrderController);

router.put("/OrderStatusUpdate/:id", requireSignIn, IsAdmin, UpdateOrderStatus);

router.get("/UsersList/:page", requireSignIn, IsAdmin, GetUsersList);

router.delete("/UserDelete/:id", requireSignIn, IsAdmin, DeleteUser);

router.delete("/OrderDelete/:id", requireSignIn, CancelOrder);
router.get("/UserCount", UserCountController);
module.exports = router;
