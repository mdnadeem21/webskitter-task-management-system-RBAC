const User = require("../../app/model/user.model");
const brctpyjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


class UserController {
    async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;
            
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await brctpyjs.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            const data = await newUser.save();

            res.status(201).json({ 
                status: "success",
                message: "User registered successfully",
                data:data
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                message: "Server error in registerUser" });
        }
    }
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid email" });
            }

            const isMatch = await brctpyjs.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                status: "success",
                message: "User logged in successfully",
                data:user,
                token,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                message: "Server error in loginUser" });
        }
    }

    async assignRole(req, res) {
        try {
            const { userId, role } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.role = role;
            await user.save();

            res.status(200).json({
                status: "success",
                message: "Role assigned successfully",
                data: user,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                message: "Server error in assignRole" });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                status: "success",
                message: "User deleted successfully",
                data: user,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                message: "Server error in deleteUser" });
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            if (!users || users.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }
            res.status(200).json({
                status: "success",
                length: users.length,
                message: "Users retrieved successfully",
                data: users,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                message: "Server error in getAllUsers" });
        }
    }
}

module.exports = new UserController();