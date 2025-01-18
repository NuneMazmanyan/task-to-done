import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskState } from './models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = [
    { id: 1, taskName: "TASK TITLE 1", state: TaskState.TODO, description: "task1 is in to do state yet, but this is just a description, so it wont affect on state" },
    { id: 2, taskName: "TASK TITLE 2", state: TaskState.TODO, description: "task1 is in to do state yet, but this is just a description, so it wont affect on state" },
    { id: 3, taskName: "TASK TITLE 3", state: TaskState.IN_PROGRESS, description: "task1 is in to do state yet, but this is just a description, so it wont affect on state" },
    { id: 4, taskName: "TASK TITLE 4", state: TaskState.TESTING, description: "task1 is in to do state yet, but this is just a description, so it wont affect on state" },
    { id: 5, taskName: "TASK TITLE 5", state: TaskState.DONE, description: "task1 is in to do state yet, but this is just a description, so it wont affect on state" },
    { id: 6, taskName: "TASK TITLE 6", state: TaskState.DONE, description: "task1 is in to do state yet, but this is just a description, so it wont affect on state" },
    { id: 7, taskName: "TASK TITLE 7", state: TaskState.DONE, description: "task1 is in to do state yet, but this is just a description, so it wont affect on state" }
  ];

  private taskMap: { [key in TaskState]: Task[] } = {
    [TaskState.TODO]: [],
    [TaskState.IN_PROGRESS]: [],
    [TaskState.TESTING]: [],
    [TaskState.DONE]: []
  };

  private taskMapSubject = new BehaviorSubject<{ [key in TaskState]: Task[] }>(this.taskMap);
  taskMap$ = this.taskMapSubject.asObservable();

  constructor() {
    this.groupTasksByState();
  }

  private groupTasksByState() {
    Object.keys(this.taskMap).forEach(state => {
      this.taskMap[state as TaskState] = [];
    });

    this.tasks.forEach(task => {
      this.taskMap[task.state].push(task);
    });

    this.taskMapSubject.next({ ...this.taskMap });
  }

  updateTaskState(task: Task, newState: TaskState, newIndex: number) {
    const oldStateTasks = this.taskMap[task.state];
    const taskIndex = oldStateTasks.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
      oldStateTasks.splice(taskIndex, 1);
    }

    task.state = newState;

    this.taskMap[newState].splice(newIndex, 0, task);

    this.taskMapSubject.next({ ...this.taskMap });
  }

  deleteTask(task: Task) {
    const taskIndex = this.tasks.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }

    const stateTasks = this.taskMap[task.state];
    const stateTaskIndex = stateTasks.findIndex(t => t.id === task.id);
    if (stateTaskIndex !== -1) {
      stateTasks.splice(stateTaskIndex, 1);
    }
    this.taskMapSubject.next({ ...this.taskMap });
  }

  updateTask(updatedTask: Task) {
    const taskIndex = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = { ...updatedTask };
    }

    this.groupTasksByState();
  }

  getStateTasks(state: TaskState): Task[] {
    return this.taskMap[state];
  }

  addTask(newTask: Task) {
    this.tasks.push(newTask);
    this.taskMap[TaskState.TODO].push(newTask);
    this.taskMapSubject.next({ ...this.taskMap });
  }

}
