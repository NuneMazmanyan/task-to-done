import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskState } from './models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = [
    { id: 1, taskName: "TASK TITLE 1", state: TaskState.TODO },
    { id: 2, taskName: "TASK TITLE 2", state: TaskState.TODO },
    { id: 3, taskName: "TASK TITLE 3", state: TaskState.IN_PROGRESS },
    { id: 4, taskName: "TASK TITLE 4", state: TaskState.TESTING },
    { id: 5, taskName: "TASK TITLE 5", state: TaskState.DONE },
    { id: 6, taskName: "TASK TITLE 6", state: TaskState.DONE },
    { id: 7, taskName: "TASK TITLE 7", state: TaskState.DONE }
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
}
