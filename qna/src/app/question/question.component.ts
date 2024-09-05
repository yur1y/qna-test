import { Component } from '@angular/core';
import { Question } from './question.model';
import { QuestionsService } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [QuestionsService],
})
export class QuestionComponent {
  constructor(private questionService: QuestionsService) {}

  model = new Question(1, 'what models we have in stock?', 'wide screens ');
  list = [];
  selected = null;

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.get().subscribe((res) => {
      if (res.success) {
        this.list = res.data;
      }
    });
  }

  onSubmit() {
    this.questionService.create(this.model).subscribe((res) => {
      if (res.success) {
        this.list = [...this.list, res.data];
      }
    });
  }
  updateQuestion(q) {
    this.questionService.update(q).subscribe((res) => {
      this.list = this.list.map((question) => {
        if (question.id === res.data.id) {
          question.questions = res.data.questions;
        }
        return question;
      });
    });
  }

  deleteQuestion(q) {
    this.questionService.delete(q).subscribe((res) => {
      this.list = this.list.filter((question) => question.id !== res.data.id);
    });
  }

  selectQuestion(q: Question) {
    if (this.selected !== q.id) {
      this.selected = q.id;
    } else {
      this.selected = null;
    }
  }
}
