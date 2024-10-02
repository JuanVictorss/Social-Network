const express = require("express");
const router = express.Router();
const { getUserById, updateUser } = require("../Controller/UserController");
const verifyToken = require("../middleware/verifyJWT.js");

router.get("/:id", getUserById);
router.put("/:id", verifyToken, updateUser);

module.exports = router;
