// authRoutes.js

const express = require('express');
const router = express.Router();
const UserService = require('../../service/UserService/userService.service');
const { authorize } = require('../../middlewares/auth.middleware');

router.post('/signup', async (req,res) => {
    try {
        const result = await UserService.signup(req.body);
        
        // Set token in cookie upon successful signup
        res.cookie('token', result.token, { httpOnly: true });

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const result = await UserService.signin(req.body.email, req.body.password);
        
        // Set token in cookie upon successful signin
        res.cookie('token', result.token, { httpOnly: true });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
