import { Component, Input } from '@angular/core';
import { Task } from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;
  @Input() taskIndex!: Number;
  isEditModalOpen = false;

  updateTask(newTaskName: string) {
    this.task.taskName = newTaskName;
    this.isEditModalOpen = false;
  }
}
