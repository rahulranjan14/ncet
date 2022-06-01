var express = require('express')
var router = express.Router()

const {check, validationResult } = require('express-validator');

const {signup, adminSignup, signin, signout, isSignedIn} = require("../controllers/auth")



router.post("/signup",[
    check("email","email must be valid").isEmail(),
    check("password","passsword should be min 6 characters").isLength({min: 6})
], signup)


router.post("/adminSignup",[
    check("email","email must be valid").isEmail(),
    check("password","passsword should be min 6 characters").isLength({min: 6})
], adminSignup)


router.post("/signin",[
    check("email","email must be valid").isEmail(),
    check("password","password is required").isLength({min: 1})
], signin)


router.get("/signout", signout)


//just to test
router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.auth);
})


module.exports = router