const { Schema } = require(`mongoose`);
const { model } = require(`mongoose`)
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        indexedDB: true,
        uniquie: true,
        validate: {
            validator: function (str) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str)
            },
            message: props => `${props.value} is not a valid email...`
        }
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true })

const user = model('user', userSchema)

module.exports = user;