const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jswtoken;
        if (!token) {
            return res.sendStatus(403);
        }
        try {
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

            const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

            if (!rootUser) { throw new Error('User not found') }

            req.token = token;
            req.rootUser = rootUser;
            req.userID = rootUser._id;

            next();
        } catch { res.sendStatus(403) };
    } catch (error) {
        res.status(401).send('Unauthorized:No token provided');
        console.log(error);

    }

}
module.exports = Authenticate;