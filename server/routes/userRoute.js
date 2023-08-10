// const express = require('express');
// const User = require('../models/User');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');

// router.get('/', async (req, res) => {
//     let users = await User.find();
//     if (users) {
//         res.status(200).send(users).end();
//     }
//     else{
//         res.status(404).send("No users!").end();
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//         const latestUser = await User.findOne({}, {}, { sort: { createddate: -1 } });

//         let newId = 1;
//         if (latestUser) {
//             newId = parseInt(latestUser.id, 10) + 1;
//         }
        
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
//         const user = new User({
//             id: newId,
//             fullname: req.body.fullname,
//             username: req.body.username,
//             password: hashedPassword,
//             email: req.body.email
//         });
    
//         await user.save();
//         res.status(201).send();
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });


// router.post('/login', async (req, res) => {
//     try {
//         let user = await User.findOne({
//             email: req.body.email
//         });

//         if (!user) {
//             return res.status(404).send("Incorrect email or password!").end();
//         }

//         const passwordsMatch = await bcrypt.compare(req.body.password, user.password);

//         if (!passwordsMatch) {
//             return res.status(401).send("Incorrect email or password!").end();
//         }

//         const secret = crypto.randomBytes(64).toString('hex');

//         const token = jwt.sign({
//             id: user.id,
//             username: user.username
//         }, secret, {
//             expiresIn: '7d'
//         });

//         res.status(200).send({
//             token: token,
//             id: user.id,
//             username: user.username,
//             fullname: user.fullname,
//             phone: user.phone,
//             email: user.email
//         }).end();
//     } catch (err) {
//         res.status(500).send("An error occurred").end();
//     }
// });

// router.delete('/:id', async (req, res)=>{
//     try{
//         await User.deleteOne({
//             _id: req.params.id
//         });

//         res.status(200).send(await User.find()); //bad for performance
//         res.end();

//         // res.status(200).send("OK").end();
//     }
//     catch(err){
//         res.status(500).send(err.message).end();
//     }
// });

// router.put('/:id', async (req, res)=>{
//     try{
//         const user = await User.findOne({
//             id: req.params.id
//         });

//         if (!user){
//             return res.status(404).send("User not found").end();
//         }

//         user.fullname = req.body.fullname;
//         user.username = req.body.username;
//         user.password = req.body.password;
//         user.email = req.body.email;

//         await User.save();
//         res.status(200).send(user).end();
//     }
//     catch(err){
//         res.status(500).send(err.message).end();
//     }
// });

// module.exports = router;

const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        if (users.length > 0) {
            res.status(200).send(users);
        } else {
            res.status(404).send("No users found");
        }
    } catch (err) {
        res.status(500).send(err.message );
    }
});

router.post('/', async (req, res) => {
    try {
        const latestUser = await User.findOne({}, {}, { sort: { id: -1 } });

        const newId = latestUser ? parseInt(latestUser.id, 10) + 1 : 1;

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            id: newId,
            fullname: req.body.fullname,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });

        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(404).send("Incorrect email or password");
        }
        
        const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
        
        if (!passwordsMatch) {
            return res.status(404).send("Incorrect email or password");
        }

        const secret = crypto.randomBytes(64).toString('hex');

        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, secret, {
            expiresIn: '7d'
        });

        res.status(200).send({
            token: token,
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            email: user.email
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({
            id: req.params.id
        });

        if (deletedUser.deletedCount > 0) {
            const remainingUsers = await User.find();
            res.status(200).send(remainingUsers);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findOne({
            id: req.params.id
        });

        if (!user) {
            return res.status(404).send("User not found");
        }

        user.fullname = req.body.fullname;
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;

        await user.save();
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;