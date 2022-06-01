var mongoose = require("mongoose");
const crypto = require("crypto")
const {v4: uuidv4} = require('uuid')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
        unique: true
    },
    encrypted_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    }
},{timestamps: true})


userSchema.virtual("password")
.set(function(password){
    this._password = password
    this.salt = uuidv4();
    this.encrypted_password = this.securePassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = {
    
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encrypted_password
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto
            .createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex')
        } catch (err) {
            return ""
        }
    }
}



module.exports = mongoose.model("User", userSchema)