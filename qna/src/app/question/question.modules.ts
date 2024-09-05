import { NgModule } from '@angular/core';
import { QuestionComponent } from './question.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuestionsService } from './question.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [QuestionComponent],
  providers: [QuestionsService],
  exports: [QuestionComponent],
})
export class QuestionModule {}
