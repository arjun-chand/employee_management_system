const bcrypt = require('bcrypt');
const { generateToken } = require('../../middlewares/auth.middleware');
const  User  = require('../../db/models/User.model');

async function signup(user) {
    const { name, email, password } = user;
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate token
        const token = generateToken({ id: newUser.id, email: newUser.email });

        // Return token
        return { token };
    } catch (error) {
        throw new Error('Error signing up user: ' + error.message);
    }
}

async function signin(email, password) {
    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Email is not valid');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Generate token
        const token = generateToken({ id: user.id, email: user.email });

        // Return user ID and token
        return { userId: user.id, token };
    } catch (error) {
        throw new Error('Error signing in user: ' + error.message);
    }
}
async function getProfile(req, res) { // Accept req and res as parameters
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return user; // Return the user object
    } catch (error) {
        throw new Error('Error fetching user profile: ' + error.message);
    }
}

module.exports = {
    signup,
    signin,
    getProfile
};
