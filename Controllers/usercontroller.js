const user = require("../Models/user");
const Role = require("../Models/role");
const Message = require("../Models/message");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../Data/generateToken");

class userController {
  constructor() {}

  async getAll(req, res) {
    try {
      const users = await user.find().populate("role"); // Fixed: lowercase 'role'
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(new Message(`${err.message}`, 500));
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const foundUser = await user.findById(id).populate("role"); // Fixed: lowercase 'role'
      if (!foundUser) {
        return res.status(404).json(new Message(`User with ID ${id} not found`, 404));
      }
      return res.status(200).json(foundUser);
    } catch (err) {
      return res.status(500).json(new Message(`${err.message}`, 500));
    }
  }

  async Create(req, res) {
    try {
      const { FirstName, LastName, Email, Password, role } = req.body;

      // Validate required fields
      if (!FirstName || !LastName || !Email || !Password || !role) {
        return res.status(400).json(new Message(`All fields are required`, 400));
      }

      // Check if user exists
      const userExists = await user.findOne({ Email });
      if (userExists) {
        return res.status(409).json(new Message(`User already exists`, 409));
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(Password, 10);

      // Create new user
      const newUser = await user.create({
        FirstName,
        LastName,
        Email,
        Password: hashedPassword,
        role  // Added role assignment
      });

      return res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (err) {
      return res.status(500).json(new Message(`${err.message} - Internal Server Error`, 500));
    }
  }

  async Update(req, res) {
        try {
            const id = req.params.id;
            const {FirstName, LastName, Email, Password,role} = req.body
            const updated = await user.findByIdAndUpdate(id, {FirstName, LastName, Email, Password,role}, { new: true });
            if (!updated) return res.status(404).json(new Message(`user against given id#${id} is not found`, 404));
            return res.status(200).json(updated);
        }
        catch (err) {
            return res.status(500).json(new Message(`${err.message}`, 500));
        }
    }


  async Delete(req, res) {
    try {
      const id = req.params.id;
      const deletedUser = await user.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json(new Message(`User with ID ${id} not found`, 404));
      }

      return res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser
      });
    } catch (err) {
      return res.status(500).json(new Message(`${err.message}`, 500));
    }
  }

  async Login(req, res) {
    try {
      const { Email, Password } = req.body;

      if (!Email || !Password) {
        return res.status(400).json(new Message(`Email and Password are required`, 400));
      }

      const currentUser = await user.findOne({ Email });
      if (!currentUser) {
        return res.status(404).json(new Message(`Invalid Email or Password`, 404));
      }

      const isMatch = await bcrypt.compare(Password, currentUser.Password);
      if (!isMatch) {
        return res.status(401).json(new Message(`Incorrect password`, 401));
      }

      // Generate token and send response
      const token = generateToken(res, currentUser._id);
      
      return res.status(200).json({
        message: "Login successful",
        user: currentUser,
        token
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json(new Message(`Login failed - ${error.message}`, 500));
    }
  }
}

module.exports = new userController();