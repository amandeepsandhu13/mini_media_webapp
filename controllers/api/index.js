const router = require("express").Router();
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");
const forgotPasswordRoutes = require("./forgotPasswordRoutes"); 

// api/posts
router.use("/posts", postRoutes);
// api/users
router.use("/users", userRoutes);

router.use("/forgot-password", forgotPasswordRoutes); 


module.exports = router;
