const express = require('express');
const router = express.Router();
const mongo = require('mongojs');
const db = mongo('db_name', ['tasks']);

/**----- get all tasks -----**/
router.get('tasks', (req, res, next) => {
	db.tasks.find((err, tasks) => {
		if (err) {
			res.send(err);
		}
		res.json(tasks);
	});
});

/**----- get a single task -----**/
router.get('/task/:id', (req, res, next) => {
	db.tasks.findOne({_id: mongo.ObjectId(req.params.id)}, (err, task) => {
		if (err) {
			res.send(err);
		}

		res.json(task);
	});
});

/**----- delete a task -----**/
router.delete('/task/:id', (req, res, next) => {
	db.tasks.remove({_id: mongo.ObjectId(req.params.id)}, (err, task) => {
		if (err) {
			res.send(err);
		}

		res.json(task);
	});
});

/**----- update a task -----**/
router.put('/task/:id', (req, res, next) => {
	let task = req.body;
	let updatedTask = {};

	if (task.isDone) {
		updatedTask = task.isDone;
	}

	if (task.title) {
		updatedTask.title = task.title;
	}

	if (!updatedTask) {
		res.status(400);
		res.json({
			"error": "bad data"
		});
	} else {
		db.tasks.update({_id: mongo.ObjectId(req.params.id)}, updatedTask, {}, (err, task) => {
			if (err) {
				res.send(err);
			}

			res.json(task);
		});
	}
});

module.exports = router;