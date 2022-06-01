const express = require('express')
const router = express.Router()

const { 
    getTestById,
    createTest,
    getTest,
    getTestForAdmin,
    updateTest,
    deleteTest,
    getAllTests,
    getTestsList
 } = require("../controllers/test")

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

router.param("userId", getUserById)
router.param("testId", getTestById)


router.post("/test/create/:userId", isSignedIn, isAuthenticated, isAdmin, createTest)


router.get("/test/:testId", getTest)

router.get("/admin/test/:testId/:userId", isSignedIn, isAuthenticated, isAdmin, getTestForAdmin)


router.delete("/test/delete/:testId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteTest)

router.put("/test/update/:testId/:userId", isSignedIn, isAuthenticated, isAdmin, updateTest)

router.get("/tests/:userId", isSignedIn, isAuthenticated, isAdmin, getAllTests)


router.get("/testslist", getTestsList)



module.exports = router