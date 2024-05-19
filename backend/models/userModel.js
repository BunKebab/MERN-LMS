const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ["Admin", "Member"],
        default: "Member",
        required: true
    },
}, {
    timestamps: true
})

userModel.pre("save", async function(next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash (this.password, salt)
        next()
    } else {
        next()
    }
})

userModel.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", userModel)