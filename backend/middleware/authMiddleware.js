

// const jwt = require("jsonwebtoken");

// const protect = async (req, res, next) => {

//     let token;

//     // CHECK TOKEN EXISTS

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {

//         try {

//             // GET TOKEN

//             token = req.headers.authorization.split(" ")[1];

//             // VERIFY TOKEN

//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             req.user = decoded.id;

//             next();

//         } catch (error) {

//             return res.status(401).json({
//                 message: "Invalid Token"
//             });
//         }
//     }

//     // IF TOKEN NOT PRESENT

//     if (!token) {

//         return res.status(401).json({
//             message: "Access Denied. No Token Provided"
//         });
//     }
// };

// module.exports = protect;

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {

            // GET TOKEN

            token = req.headers.authorization.split(" ")[1];

            // VERIFY TOKEN

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // GET USER DETAILS

            req.user = await User.findById(decoded.id).select("-password");

            next();

        } catch (error) {

            return res.status(401).json({
                message: "Invalid Token"
            });
        }
    }

    if (!token) {

        return res.status(401).json({
            message: "Access Denied. No Token Provided"
        });
    }
};

module.exports = protect;