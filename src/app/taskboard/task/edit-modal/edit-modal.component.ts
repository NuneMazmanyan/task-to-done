import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../models';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent {
  @Input() task!: Task;

  ngOnInit() {
  }

  onSave() {
  }

  onClose() {
  }
}
