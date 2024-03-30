const { hashPassword, comparePassword } = require('../helpers/authHelper');
const user = require(`../models/userModel`)
const jwt = require(`jsonwebtoken`);


const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, isAdmin } = req.body
        // validations
        if (!name) {
            return res.json({ error: 'Name is Required' })
        }
        if (!email) {
            return res.json({ error: 'Emailis Required' })
        }
        if (!password) {
            return res.json({ error: 'Password is Required' })
        }
        if (!address) {
            return res.json({ error: 'Address is Required' })
        }
        if (!phone) {
            return res.json({ error: 'Phone is Required' })
        }
        // check user
        const User = await user.findOne({ email })
        // existing user
        if (User) {
            return res.status(200).json({
                success: true,
                message: 'Already Register Please Login'
            })
        }
        // register user
        const hashedPassword = await hashPassword(password);
        const newUser = await new user({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            isAdmin
        }).save()

        res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            user: newUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        // validations

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: 'Invalid email or password'
            })
        }
        // check user
        const User = await user.find({email});
        if(!User){
            return res.status(404).json({
                success : false,
                message : 'Email not registered'
            })
        }
        const match = comparePassword(password,User[0].password);
        if(!match){
            return res.status(200).json({
                status : false,
                message : 'Invaid Password'
            })
        }
        const token = jwt.sign({_id : User._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        if(match && email === User[0].email){
            return res.status(200).json({
                status : true,
                message : 'Successful login', 
                token 
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in login',
            error
        })
    }
}

module.exports = { registerController, loginController };