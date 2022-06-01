const Test = require("../models/test")


exports.getTestById = (req, res, next, id) => {
    Test.findById(id)
    .exec((err, test) => {
        if(err){
            return res.status(400).json({
                error:"test not available"
            })
        }

        req.test = test;
        next();
    })
}



exports.createTest = (req, res) => {

    const test = new Test(req.body)

    test.save((err, test) => {
        if(err){
            res.status(400).json({
                error: "test creation failed"
            })
        }
        res.json(test)
    })

}



exports.getTest = (req, res) => {
    req.test.answers = undefined;
    // TODO: for later
    // var startDate = new Date(String(req.test.startTime)).getTime();
    // var currentDate = new Date().getTime();
    // console.log("strat time", startDate)
    // console.log("current time", currentDate)
    // if(currentDate >= startDate){
    //     console.log("returnong test")
    //     return res.json(req.test)
    // }
    return res.json(req.test)
}


exports.getTestForAdmin = (req, res) => {
    return res.json(req.test)
}


exports.deleteTest = (req, res) => {
    let test = req.test;

    test.remove((err, deletedTest) => {
        if(err){
            return res.status(400).json({
                error: "failed to delete test"
            })
        }
        res.json({
            message: "deletion sucessful",
            deletedTest
        })
    })
}

exports.updateTest = (req, res) => {
    Test.findByIdAndUpdate(
        {_id : req.test._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, test) => {
            if(err){
                return res.status(400).json({
                    error: "you are not authorized to update this test"
                })
            }
            res.json(test)
        }
    )
}


exports.getAllTests = (req, res) => {
    Test.find().exec((err, tests) => {
        if(err || !tests){
            return res.status(400).json({
                error: "No tests found"
            })
        }

      {/*  var userdetails = []
        for (let i = 0; i < users.length; i++) {
            var temp = {
                name:"",
                email:""
            };
            temp.name = users[i].name;
            temp.email = users[i].email;
            userdetails.push(temp)
            
        } */}
        res.json(tests)
    })
}



exports.getTestsList = (req, res) => {
    Test.find().sort([["updatedAt", "desc" ]]).exec((err, tests) => {
        if(err || !tests){
            return res.status(400).json({
                error: "No tests found"
            })
        }

       var testsdetails = []
        for (let i = 0; i < tests.length; i++) {
            var temp = {
                name:"",
                description:"",
                startTime:"",
                endTime:"",
                id: "",
                duration:""
            };
            temp.name = tests[i].name;
            temp.description = tests[i].description;
            temp.startTime = tests[i].startTime;
            temp.endTime = tests[i].endTime;
            temp.id = tests[i]._id;
            temp.duration = tests[i].duration;
            testsdetails.push(temp)
            
        } 
        res.json(testsdetails)
    })
}
