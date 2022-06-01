const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema;

const testSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true,
        maxlength: 100
    },
    description : {
        type: String,
        required: true,
        maxlength: 2000
    },
    startTime: {
        type: String,
        require: true
    },
    endTime: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    questions: [
        { 
            no: {
                type: Number,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            a: {
                type: String,
                required: true
            },
            b: {
                type: String,
                required: true
            },
            c: {
                type: String,
                required: true
            },
            d: {
                type: String,
                required: true
            }
        }
    ],
    answers: [
        String
    ]


},{timestamps: true}
);

module.exports = mongoose.model("Test", testSchema)