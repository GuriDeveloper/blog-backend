const jwt = require(`jsonwebtoken`);

// Protected routes token based
const requireSignIn = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        next();
    } catch (error) {
        console.log(error);
    }
}