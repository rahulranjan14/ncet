const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema;

const testSubmissionSchema = new mongoose.Schema({

    testId : {
        type: ObjectId,
        ref: 'Test',
        required: true
    },
    studentName : {
        type: String,
        required: true,
        maxlength: 100
    },
    contactNumber : {
        type: String,
        required: true,
        maxlength: 2000
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
    },
    score:{
        type: Number
    },
    answers : [
        String
    ]


},{timestamps: true}
);

module.exports = mongoose.model("TestSubmission", testSubmissionSchema)