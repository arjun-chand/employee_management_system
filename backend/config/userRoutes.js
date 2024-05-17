const express = require('express');
const router = express.Router();
const User = require('../db/models/User.model');

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/signin', async (req, res) => {
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
           
            res.send(user);
        }else{
            res.send({result: "No User Found"})
        }
    }else{
        res.send({result: "No User Found"})
    }
})
module.exports = router;
