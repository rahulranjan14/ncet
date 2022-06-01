var express = require('express')
var router = express.Router()

const { getUserById, getUser, getAllUsers, updateUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");


router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)

router.get("/users", getAllUsers)
// router.get("/users", isSignedIn,  getAllUsers)


module.exports = router;