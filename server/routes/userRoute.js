const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

router.get('/', async (req, res) => {

    let users = await User.find();
    if (users) {
        res.status(200).send(users).end();
    }
    else{
        res.status(404).send("No users!").end();
    }
});

router.post('/', async (req, res)=>{

    bcrypt.hash(req.body.password, 10).then(async (hashedPassword)=>{
        const user = new User({
            fullname: req.body.fullname,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            image: req.body.image
        });
    
        try {
            await user.save();
            res.status(200).send(user).end();
        }
        catch(error){
            res.status(404).send(error.message).end();
        }
    });
});

router.post('/login', async (req, res)=>{

    let user = await User.findOne({
        username: req.body.username
    });

    if(user){

        const secret = crypto.randomBytes(64).toString('hex');

        bcrypt.compare(req.body.password, user.password)
             .then((result)=>{
                if(result){
                    const token = jwt.sign({
                        _id: user._id,
                        username: user.username
                    }, secret,
                    { expiresIn: '7d'});

                    res.status(200).send({
                        token: token,
                        username: user.username,
                        phone: user.phone,
                        email: user.email
                    }).end();
                }
                else {
                    res.status(400).send("Incorrect password").end();
                }
        });

    }
    else {
        res.status(404).send(error.message).end();
    }  
});

router.delete('/:id', async (req, res)=>{
    try{
        await User.deleteOne({
            _id: req.params.id
        });

        res.status(200).send(await User.find()); //bad for performance
        res.end();

        // res.status(200).send("OK").end();
    }
    catch(err){
        res.status(500).send(err.message).end();
    }
});

router.put('/:id', async (req, res)=>{
    try{
        const user = await User.findOne({
            _id: req.params.id
        });

        if (!user){
            return res.status(404).send("User not found").end();
        }

        user.fullname = req.body.fullname;
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.image = req.body.image;

        await User.save();
        res.status(200).send(user).end();
    }
    catch(err){
        res.status(500).send(err.message).end();
    }
});

module.exports = router;