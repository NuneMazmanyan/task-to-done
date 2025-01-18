import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskState } from '../../../models';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent {
  @Input() task!: Task;
  @Input() selectedState!: TaskState;
  @Output() close = new EventEmitter<void>();
  taskStates = Object.values(TaskState);

  constructor(private taskService: TaskService) { }

  saveChanges() {
    this.taskService.updateTask(this.task);
    if (this.selectedState != this.task.state) {
      const newIndex = this.taskService.getStateTasks(this.selectedState).length;
      this.taskService.updateTaskState(this.task, this.selectedState, newIndex);
    }
    this.onClose();
  }

  onClose() {
    this.close.emit();
  }

  deleteTask() {
    this.taskService.deleteTask(this.task);
    this.onClose();
  }

  changeTaskState(state: TaskState) {
    this.selectedState = state;
  }
}
