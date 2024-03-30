const router = require(`express`).Router();
const user = require('../models/userModel');
const { registerController, loginController } = require('../controllers/authController')



// Register route // method post

router.post('/register', registerController);

// Login Route || Method Post

router.post('/login', loginController)

module.exports = router;