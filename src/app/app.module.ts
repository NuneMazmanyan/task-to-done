import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { HeaderComponent } from './taskboard/header/header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskComponent } from './taskboard/task/task.component';
import { EditModalComponent } from './taskboard/task/edit-modal/edit-modal.component';
import { CreateTaskModalComponent } from './taskboard/header/create-task-modal/create-task-modal.component';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TaskboardComponent,
    HeaderComponent,
    TaskComponent,
    EditModalComponent,
    CreateTaskModalComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
