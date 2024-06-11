const router = require("express").Router();
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");

// api/posts
router.use("/posts", postRoutes);
// api/users
router.use("/users", userRoutes);

module.exports = router;
