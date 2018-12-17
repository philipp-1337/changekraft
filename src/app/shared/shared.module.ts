import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionableBooleanPipe } from './questionableBoolean.pipe';

@NgModule({
  declarations: [QuestionableBooleanPipe],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuestionableBooleanPipe
  ]
})
export class SharedModule {}
