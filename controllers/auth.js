const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

const User = require('../models/user');

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }


    const user = new User(req.body)

    user.save((err, user) => {
        if(err){
            console.log(err)
            return res.status(400).json({
                err: "unable to signup please try again"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })


}





exports.adminSignup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }


    const user = new User(req.body)
    user.role = 1;
    user.save((err, user) => {
        if(err){
            console.log(err)
            return res.status(400).json({
                err: "unable to signup please try again"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })


}




exports.signin = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User does not exist"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "email and password does not match"
            })
        }

        const token = jwt.sign({_id: user._id}, "xyz") //token will be created on the basis of id and the string provided
        res.cookie("token", token, {expire: new Date() + 7}) //storing login token in cookie

        const {_id, name, email, role} = user; // sending response to frontend
        return res.json({token, user: {_id, name, email, role}})
    })

}


exports.signout =  (req, res) => {
    res.clearCookie("token");
    res.json({
        message:"user signout successfull"
    })
}


// protected routes
exports.isSignedIn = expressJwt({
    secret: "xyz",
    userProperty: "auth",
    algorithms: ['HS256']
})



// custom middleware
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "Access denied"
        })
    }
    next();
}


exports.isAdmin = (req, res, next) => {
    if(req.profile.role == 0){
        return res.status(403).json({
            error: "You are not an admin, access denied"
        })
    }
    next();
}