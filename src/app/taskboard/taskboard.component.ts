import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../task.service';
import { Task, TaskState } from '../models';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent implements OnInit {
  taskStates = Object.values(TaskState);
  taskMap: { [key in TaskState]: Task[] } = {} as { [key in TaskState]: Task[] };
  taskIndexes: { [taskId: number]: number } = {};

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.taskMap$.subscribe(updatedMap => {
      this.taskMap = updatedMap;
      this.updateGlobalIndexes();
    });
  }

  connectedTo(state: TaskState): string[] {
    const stateIndex = this.taskStates.indexOf(state);
    const connectedColumns = [...this.taskStates];

    if (stateIndex > 0) connectedColumns.push(this.taskStates[stateIndex - 1]);
    if (stateIndex < this.taskStates.length - 1) connectedColumns.push(this.taskStates[stateIndex + 1]);

    return connectedColumns;
  }

  updateGlobalIndexes() {
    let globalIndex = 1;

    this.taskStates.forEach(state => {
      this.taskMap[state].forEach(task => {
        this.taskIndexes[task.id] = globalIndex;
        globalIndex++;
      });
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    const task = event.previousContainer.data[event.previousIndex];
    const newState = event.container.id as TaskState;
    const newIndex = event.currentIndex;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      const previousColumn = event.previousContainer.data;
      previousColumn.splice(event.previousIndex, 1);

      task.state = newState;

      event.container.data.splice(newIndex, 0, task);

      this.taskService.updateTaskState(task, newState, newIndex);

      this.updateGlobalIndexes();
    }
  }
}
