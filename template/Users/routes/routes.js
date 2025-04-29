const express = require("express");
const router = express.Router();
const limiter = require("../../Config/rate-limiter");
const UserController = require("../controller/UserController");
const Auth = require("../../Middleware/Auth");
const groupRoutes = require("../../utils/group_routes");
const upload = require("../../utils/file_system");

router.get("/", (req, res) => {
  res.json({ msg: "Welcome to the API System" });
});

// auth login and register
router.post("/login", UserController.login);
router.post("/register", UserController.register);

// html to pdf generate
router.get("/pdfgenerate", UserController.pdfgenerate);
router.post("/file-upload", upload("/").single, UserController.file_upload);

// middleware before after piority matters
groupRoutes(router, Auth, (admin) => {
  admin.get("/dashboard", UserController.dashboard);
  admin.get("/post", UserController.post);
  // admin.post("/user", UserController.user_store);
  // admin.get("/user", limiter, UserController.user_get);
  // admin.delete("/user/:id", UserController.user_delete);
});

module.exports = router;
