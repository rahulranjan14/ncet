const express = require('express')
const router = express.Router()

const { 
    submitResponse,
    getAllTestSubmissions,
    getTestSubmissionsByTest,
    checkSubmissionExists
 } = require("../controllers/testSubmission")

 const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
 const { getUserById } = require("../controllers/user")

 router.param("userId", getUserById)

router.post("/test/submit", submitResponse)

router.get("/")

router.get("/testSubmissions/:userId", isSignedIn, isAuthenticated, isAdmin, getAllTestSubmissions)

router.post("/test/testSubmissions/:userId", isSignedIn, isAuthenticated, isAdmin, getTestSubmissionsByTest)

router.get("/submissions/exists/:aadhar",checkSubmissionExists)



module.exports = router
