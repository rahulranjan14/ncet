const  User = require("../models/user")


exports.getUserById = (req, res, next, id) => {

    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user found"
            })
        }
        req.profile = user;
        next();
    } )

}


exports.getUser = (req, res) => {
    // console.log("get user running")
    req.profile.salt = undefined;
    req.profile.encrypted_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "you are not authorized to update this user"
                })
            }
            user.salt = undefined;
            user.encrypted_password = undefined;
            res.json(user)
        }
    )
}


exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if(err || !users){
            return res.status(400).json({
                error: "No users found"
            })
        }

        var userdetails = []
        for (let i = 0; i < users.length; i++) {
            var temp = {
                name:"",
                email:""
            };
            temp.name = users[i].name;
            temp.email = users[i].email;
            userdetails.push(temp)
            
        }
        res.json(userdetails)
    })
}

