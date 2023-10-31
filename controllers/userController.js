const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const usedEmail = await User.findOne({ email });
    const usedUserName = await User.findOne({ username });

    if (usedEmail) {
        res.status(400);
        throw new Error("Email is already registered!");
    } else if (usedUserName) {
        res.status(400);
        throw new Error("Username is already used!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashed password', hashedPassword);

    const newUser = await User.create({
        username, email,
        password: hashedPassword,
    });

    if (newUser) {
        res.status(200).json({ id: newUser.id, email: newUser.email })
    } else {
        res.status(400);
        throw new Error("User not created");
    }
});



const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ email });

    if (user) {

        if (await bcrypt.compare(password, user.password)) {

            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id
                    }
                },
                process.env.ACCESS_TOKEN,
                {
                    'expiresIn': "15m"
                }
            );

            res.status(200).json({ accessToken });

        } else {
            res.status(401);
            throw new Error("Wrong Password!");
        }

    } else {
        res.status(400);
        throw new Error("Email is not registered!");
    }
});



const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current User" });
});

module.exports = { registerUser, loginUser, currentUser }