const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyJWT.js");
const {
  criarPost,
  mostrarPost,
  atualizarPost,
  deletarPost,
  curtirPost,
  comentarPost,
  allPosts,
} = require("../Controller/PostController");

router.post("/", verifyToken, criarPost);
router.get("/:id", mostrarPost);
router.put("/:id", verifyToken, atualizarPost);
router.delete("/:id", verifyToken, deletarPost);
router.put("/:id/like", verifyToken, curtirPost);
router.post("/:id/comment", verifyToken, comentarPost);
router.get("/", allPosts);

module.exports = router;
