import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class TaskService {
	constructor(private http: Http) {
		console.log('Task service initialized');
	}

	getTasks() {
		return this.http.get('/api/tasks')
			.map(res => res.json());
	}

	addTask() {
		let heaers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post('/api/task', JSON.stringify(newTask), { headers: headers })
			.map(res => res.json());
	}

	/**----- delete a task with the specified id -----**/
	deleteTask(id) {
		return this.http.delete('/api/task/' + id)
			.map(res => res.json());
	}

	updateStatus() {
		let headers = new Headers();
		header.append('Content-Type', 'application/json');

		return this.http.put('/api/task/' + task_id, JSON.stringify(task), { headers: headers })
			.map(res => res.json());
	}
}