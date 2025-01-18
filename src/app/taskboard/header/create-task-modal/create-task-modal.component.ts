import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task, TaskState } from '../../../models';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent {
  @Output() close = new EventEmitter<void>();
  task: Task | undefined;
  title: string = '';
  description: string = '';

  constructor(private taskService: TaskService) { }

  onClose() {
    this.close.emit();
  }

  createTask() {
    if (this.title.trim()) {
      const newTask: Task = {
        id: 0,
        taskName: this.title,
        state: TaskState.TODO,
        description: this.description
      };

      this.taskService.addTask(newTask);
      this.onClose();
    }
  }

}
