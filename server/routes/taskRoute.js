const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get('/', async (req, res) => {
    let tasks = await Task.find();

    if (tasks) {
        res.status(200).send(tasks).end();
    }
    else{
        res.status(404).send("No tasks!").end();
    }
});

router.get('/:id', async (req, res) => {
        const task = await Task.findOne({
            id: req.params.id
        });

        if (task) {
            res.status(200).send(task).end();
        }
        else{
            res.status(404).send("No task!").end();
        }      
});

router.post('/', async (req, res) => {
    try {
        const latestTask = await Task.findOne({}, {}, { sort: { createddate: -1 } });

        let newId = 1;

        if (latestTask) {
            newId = parseInt(latestTask.id, 10) + 1;
        }

        const tasks = new Task({
        id: newId,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        isdone: req.body.isdone,
        createddate: new Date(),
        expireddate: new Date(req.body.expireddate),
        comments: req.body.comments
        });

        await tasks.save();
        res.status(200).send().end();
    } catch (err) {
        res.status(404).send(err.message).end();
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await Task.deleteOne({
            id: req.params.id
        });

        res.status(200).send(await Task.find()); //bad for performance
        res.end();
    }
    catch(err){
        res.status(500).send(err.message).end();
    }
});

router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({
            id: req.params.id
        });

        if (!task) {
            return res.status(404).send("Task not found").end();
        }

        task.title = req.body.title;
        task.description = req.body.description;
        task.priority = req.body.priority;
        task.isdone = req.body.isdone;
        task.expireddate = req.body.expireddate;
        task.comments = req.body.comments;

        await task.save();
        res.status(200).send(task).end();
    }
    catch(err){
        res.status(500).send(err.message).end();
    }
});

module.exports = router;