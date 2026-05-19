// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const generateToken = require("../utils/generateToken");

// const signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     const userExists = await User.findOne({ email });

//     if (userExists) {
//         return res.status(400).json({
//             message: "User already exists"
//         });
//     }

//     const salt = await bcrypt.genSalt(10);

//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//         name,
//         email,
//         password: hashedPassword
//     });

//     res.status(201).json({
//         _id: user._id,
//         token: generateToken(user._id)
//     });
// };

// const login = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//         res.json({
//             _id: user._id,
//             token: generateToken(user._id)
//         });
//     } else {
//         res.status(401).json({
//             message: "Invalid credentials"
//         });
//     }
// };

// module.exports = {
//     signup,
//     login
// };

const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");


// ================= REGISTER =================

const signup = async (req, res) => {

    const { name, email, password } = req.body;

    // CHECK USER EXISTS

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    // HASH PASSWORD

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE USER

    await User.create({
        name,
        email,
        password: hashedPassword
    });

    // ONLY SUCCESS MESSAGE

    res.status(201).json({
        message: "Registered Successfully"
    });
};


// ================= LOGIN =================

const login = async (req, res) => {

    const { email, password } = req.body;

    // FIND USER

    const user = await User.findOne({ email });

    // CHECK PASSWORD

    if (user && await bcrypt.compare(password, user.password)) {

        // TOKEN GENERATED ONLY AFTER LOGIN

        res.status(200).json({
            message: "Login Successful",

            token: generateToken(user._id),

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } else {

        res.status(401).json({
            message: "Invalid Email or Password"
        });
    }
};


module.exports = {
    signup,
    login
};