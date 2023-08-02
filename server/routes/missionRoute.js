const express = require('express');
const Mission = require('../models/Mission');
const router = express.Router();

router.get('/', async (req, res) => {
    let missions = await Mission.find();

    if (missions) {
        res.status(200).send(users).end();
    }
    else{
        res.status(404).send("No users!").end();
    }
});

router.post('/', async (req, res) => {
    const mission = new Mission({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        isdone: req.body.isdone,
        createddate: new Date(),
        expireddate: new Date(req.body.expireddate),
        comments: req.body.comments
    });

    try{
        await mission.save();
        res.status(200).send(mission).end();
    }
    catch(err){
        res.status(404).send(err.message).end();
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await Mission.deleteOne({
            _id: req.params.id
        });

        res.status(200).send(await User.find()); //bad for performance
        res.end();
    }
    catch(err){
        res.status(500).send(err.message).end();
    }
});

router.put('/:id', async (req, res) => {
    try {
        const mission = await Mission.findOne({
            _id: req.params.id
        });

        if (!mission) {
            return res.status(404).send("Mission not found").end();
        }

        mission.title = req.body.title;
        mission.description = req.body.description;
        mission.priority = req.body.priority;
        mission.isdone = req.body.isdone;
        mission.expireddate = req.body.expireddate;
        mission.comments = req.body.comments;

        await mission.save();
        res.status(200).send(mission).end();
    }
    catch(err){
        res.status(500).send(err.message).end();
    }
});

module.exports = router;