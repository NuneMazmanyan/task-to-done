import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { HeaderComponent } from './taskboard/header/header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskComponent } from './taskboard/task/task.component';
import { EditModalComponent } from './taskboard/task/edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskboardComponent,
    HeaderComponent,
    TaskComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
