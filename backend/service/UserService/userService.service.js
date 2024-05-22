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

async function updatePassword(req, res){
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // Validate the inputs
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            throw new Error('All fields are required');
        }

        if (newPassword !== confirmNewPassword) {
            throw new Error('New passwords do not match');
        }

        // Directly use the user from the request object
        const user = req.user;

        // Check if the old password is correct
        console.log('Old Password:', oldPassword);
        console.log('User Password:', user.password);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new Error('Old password is incorrect');
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();

        return { message: 'Password updated successfully' };
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

module.exports = {
    signup,
    signin,
    getProfile,
    updatePassword
};
