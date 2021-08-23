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
  fields = ['--field1', '--field2', '--field3', '--field4'];
  questionindex = 0;

  checkButtonText = 'check';

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      this.data = data;
      this.datareader();
    });
  }

  datareader() {
    this.question = this.data.ASchein[this.questionindex].question;

    this.answer1 = this.data.ASchein[this.questionindex].answer1;
    this.answer2 = this.data.ASchein[this.questionindex].answer2;
    this.answer3 = this.data.ASchein[this.questionindex].answer3;
    this.answer4 = this.data.ASchein[this.questionindex].answer4;
  }

  check() {
    if (this.checkButtonText === 'check') {
      for (let i = 0; i < this.answerBool.length; i++) {
        if (this.answerBool[i] === this.data.ASchein[this.questionindex].correctAnswer[i]) {
          document.documentElement.style.setProperty(this.fields[i], '#00ff003f');
        }
        else {
          document.documentElement.style.setProperty(this.fields[i], '#ff00003f');
        }
      }
      this.checkButtonText = 'weiter';
    }
    else {
      this.questionindex++;
      this.datareader();
      this.clearCheckboxes();
      this.checkButtonText = 'check';
    }
  }

  clearCheckboxes() {
    this.answerBool = [false, false, false, false];
    for (let i = 0; i < 4; i++) {
      document.documentElement.style.setProperty(this.fields[i], '#fff');
    }
  }

}
