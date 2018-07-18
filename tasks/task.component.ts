import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../model/task.model';

@Component({
	selector: 'tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss'];
})

export class TasksComponent {
	tasks: Taks[];
	title: string;

	constructor( private taskService: TaskService) {
		this.taskService.getTasks()
			.subscribe(tasks => {
				this.tasks = tasks;
			});
	}
	addTask(event) {
		event.preventDafault();

		let newTask = {
			title: this.title;
			isDone: false;
		};

		this.taskService.addTask(newTask)
			.subscribe(task => {
				this.tasks.push(task);
				this.title = '';
			});
	}

	deleteTask(id) {
		let tasks = this.tasks;

		this.taskService.deleteTask(id).subscribe(data => {
			if (data.n === 1) {
				for (let i = 0; i < tasks.length; i++) {
					if (tasks[i]._id === id) {
						task.splice(i, 1);
					}
				}
			}
		});
	}

	updateStatus(task) {
		let _task = {
			_id: task._id,
			title: task.title,
			isDone: !task.isDone
		};

		this.taskService.updateStatus(_task).subscribe(data => {
			task.isDone = !task.isDone;
		})
	}
}