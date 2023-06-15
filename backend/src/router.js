const express = require("express");

const router = express.Router();

const multer = require("multer");
const userControllers = require("./controllers/userControllers");
const projectControllers = require("./controllers/projectControllers");

const { verifyPassword, verifyToken } = require("./services/auth");
const imageHelpers = require("./services/imageHelpers");

router.post("/login", userControllers.getUserByLoginToNext, verifyPassword);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", verifyToken, userControllers.edit);
router.post("/users", verifyToken, userControllers.add);
router.delete("/users/:id", verifyToken, userControllers.destroy);

router.get("/projects", projectControllers.browse);
router.get("/projects/:id", projectControllers.read);
router.put("/projects/:id", verifyToken, projectControllers.edit);
router.post("/projects", verifyToken, projectControllers.add);
router.delete("/projects/:id", verifyToken, projectControllers.destroy);

const upload = multer({ dest: "../public/uploads/" });

router.post(
  "/image",
  verifyToken,
  upload.single("image"),
  imageHelpers.renameImageAndSendFilename
);

module.exports = router;
