import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  question = '';
  data: any = [];
  answer1 = '';
  answer2 = '';
  answer3 = '';
  answer4 = '';
  answerBool = [false, false, false, false];

  constructor(private httpClient: HttpClient) {

   }

  ngOnInit() {
    this.httpClient.get('./assets/data/questions.json').subscribe(data =>{
      this.data = data;
      this.datareader();
    });
  }

  datareader() {
    this.question = this.data.questions[0].question;

    this.answer1 = this.data.questions[0].answer1;
    this.answer2 = this.data.questions[0].answer2;
    this.answer3 = this.data.questions[0].answer3;
    this.answer4 = this.data.questions[0].answer4;
  }

  check() {
    for (let i = 0; i < this.answerBool.length; i++) {
      if (this.answerBool[i] === this.data.questions[0].correctAnswer[i]) {
        console.log('perfect');
      }
    }
  }
}
