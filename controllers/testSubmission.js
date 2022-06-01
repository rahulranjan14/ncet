const TestSubmission = require("../models/testSubmission")

const Test = require("../models/test");


exports.submitResponse = (req, res) => {

    const testSubmission = new TestSubmission(req.body)
    
    var correctAnswers = [];
    var userAnswers = req.body.answers


   console.log("received",req.body)

    Test.find({_id: req.body.testId }, (err, test) => {
        // if(err){
        //     console.log(err)
        // }
        if (err) return next(err)
        // else{

            for(i=0;i<test[0].answers.length;i++){
                correctAnswers.push(test[0].answers[i])
            }

            
            // console.log("user answer", userAnswers)
            // console.log("correct answer", correctAnswers)

        // }
    })
    .then(
        function(){
            testSubmission.score = 0;
            {/* console.log("before evaluation", testSubmission.score) */}

            ///
            // console.log("user then answer", userAnswers)
            // console.log("correct then answer", correctAnswers)

            testSubmission.score = calculateResult(correctAnswers, userAnswers)
           
           
           console.log("after eval", testSubmission.score) 
        //    console.log("test submissin values", testSubmission) 


            testSubmission.save((err, testsubmission) => {
                if(err){
                    // console.log(err)
                    res.status(400).json({
                        
                        error: "test submission failed"
                    })
                }
                // console.log("test submitted", testsubmission)
                res.json(testsubmission)
            })

        }
    )
    .catch(err => console.log(err))

    

    const calculateResult = (correctAnswers, userAnswers) => {
        marks = 0
        // console.log("evaluating result user",userAnswers)
        // console.log("evaluating result correct",correctAnswers)
        for (let i = 0; i < correctAnswers.length; i++) {
            
            if(userAnswers[i] === correctAnswers[i]){
                marks = marks+1
                // console.log("correct",marks)
                // console.log("correct user ans",userAnswers[i])
                // console.log("correct real ans",correctAnswers[i])
            }
            else if(userAnswers[i] !== correctAnswers[i]){
                marks = marks
                // console.log("wrong ans",userAnswers[i])
                // console.log("wrong ans",correctAnswers[i])
            }
        }
        console.log("returning marks =",marks)
        return marks
    }
   

    

}






exports.getAllTestSubmissions = (req, res) => {

    TestSubmission.find().populate("testId").sort([["updatedAt", "desc" ]]).exec((err, testSubmissions) => {
        if(err || !testSubmissions){
            return res.status(400).json({
                error: "No test submissions found"
            })
        }

    
        res.json(testSubmissions)
    })

}



exports.getTestSubmissionsByTest = (req, res) => {

    // console.log("gettestsubmissionsbytest trigerred")

    // console.log(req.body.testId)

    var id = req.body.testId

    TestSubmission.find({testId: id}).sort([["updatedAt", "desc" ]]).exec((err, testSubmissions) => {
        if(err || !testSubmissions){
            return res.status(400).json({
                error: "No test submissions found"
            })
        }

    
        res.json(testSubmissions)
    })

}

