// authRoutes.js

const express = require('express');
const router = express.Router();
const UserService = require('../../service/UserService/userService.service');
const { authorize } = require('../../middlewares/auth.middleware');

router.post('/signup', async (req, res) => {
    try {
      const result = await UserService.signup(req.body, res); // Pass the response object
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
  

  router.get('/verify-email', async (req, res) => {
    try {
      await UserService.verifyEmail(req, res); // Pass the request and response objects
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
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

router.get('/profile', authorize, async (req, res) => {
    try {
        const result = await UserService.getProfile(req, res); // Pass req and res
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

router.put('/security', authorize, async (req,res) => {
    try {
        await UserService.updatePassword(req, res); // Pass req and res
        res.send("password updated successfully");
    }catch (error){
        res.status(500).send(error.message);
    }
})
module.exports = router;