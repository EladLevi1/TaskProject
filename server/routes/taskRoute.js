const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();

        if (tasks.length > 0) {
            res.status(200).send(tasks);
        } else {
            res.status(404).send("No tasks found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.params.id });

        if (task) {
            res.status(200).send(task);
        } else {
            res.status(404).send("Task not found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const latestTask = await Task.findOne({}, {}, { sort: { createddate: -1 } });

        const newId = latestTask ? parseInt(latestTask.id, 10) + 1 : 1;

        const newTask = new Task({
            id: newId,
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            isdone: req.body.isdone,
            createddate: new Date(),
            expireddate: new Date(req.body.expireddate),
            comments: req.body.comments || []
        });

        await newTask.save();
        res.status(201).send(newTask);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.deleteOne({ id: req.params.id });

        if (deletedTask.deletedCount > 0) {
            const remainingTasks = await Task.find();
            res.status(200).send(remainingTasks);
        } else {
            res.status(404).send("Task not found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.params.id });

        if (!task) {
            res.status(404).send("Task not found");
            return;
        }

        task.title = req.body.title;
        task.description = req.body.description;
        task.priority = req.body.priority;
        task.isdone = req.body.isdone;
        task.expireddate = req.body.expireddate;
        task.comments = req.body.comments || [];

        await task.save();
        res.status(200).send(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/:id/comments', async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.params.id });

        if (!task) {
            res.status(404).send("Task not found");
            return;
        }

        task.comments.push(req.body.comment);

        await task.save();

        res.status(200).send(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
