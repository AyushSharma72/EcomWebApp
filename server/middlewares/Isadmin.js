//protected route

const usermodel = require("../modles/usermodel");

async function IsAdmin(req, resp, next) {
  try {
    const user = await usermodel.findById(req.user._id);
    if (user.Role !== 1) {
      resp.status(404).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
   
    }
  } catch (error) {
    resp.status(404).send({
      success: false,
      message: "error in middleware",
    });
    console.log("error");
  }
}

module.exports = IsAdmin;
