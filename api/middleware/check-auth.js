// Default middleware to protect routes
const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {

    try {
    // Get token from header
    //Accessing segment 2
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    // Decode Token for validation
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.userData = decoded
    next()

    } catch (err) {

        return res.status(401).json({
            message: "Auth Failed"
        })
    }
    
    // Successful authentication

}