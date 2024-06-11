const router = require("express").Router();
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");

// /api/post
router.use("/posts", postRoutes);
router.use("/users", userRoutes);

module.exports = router;
