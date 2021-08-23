import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
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
  themaindex = 0;
  answerschecker = [];
  schein: string;
  thema: string;

  checkButtonText = 'check';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {

  }

  ngOnInit() {
    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      this.data = data;
      this.datareader();
    });

    this.schein = this.activatedRoute.snapshot.paramMap.get('schein');
    if (this.schein.length === 2) {
      this.thema = this.schein.charAt(1);
      this.schein = this.schein.charAt(0);
      this.themaindex = Number(this.thema);
    }

  }



  datareader() {
    //frage und antworte wieder auslesen
    this.question = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].question;

    this.answer1 = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer1;
    this.answer2 = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer2;
    this.answer3 = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer3;
    this.answer4 = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer4;
  }


  check() {
    //change color if is true or false
    if (this.checkButtonText === 'check') {
      let countTrue = 0;

      for (let i = 0; i < this.answerBool.length; i++) {
        if (this.answerBool[i] === this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].correctAnswer[i]) {
          document.documentElement.style.setProperty(this.fields[i], '#00ff003f');
          countTrue++;
        }
        else {
          document.documentElement.style.setProperty(this.fields[i], '#ff00003f');
        }
      }

      if (countTrue === 4) {
        this.answerschecker.push(true);
      }
      else {
        this.answerschecker.push(false);
      }

      this.checkButtonText = 'weiter';
    }

    else {
//next Question or next Thema or fertig
      if (Object.keys(this.data.scheine[this.schein].Thema[this.themaindex].questions).length === this.questionindex + 1) {
        if (Object.keys(this.data.scheine[this.schein].Thema).length === this.themaindex + 1) {

          this.router.navigate(['result/' + this.answerschecker]);

        }
        else {
          if (this.thema === undefined) {
            this.themaindex++;
          }
          else {
            this.router.navigate(['result/' + this.answerschecker]);
          }
          this.questionindex = 0;
        }
      }
      else {
        this.questionindex++;
      }
      this.datareader();
      this.clearCheckboxes();
      this.checkButtonText = 'check';
    }
  }

  clearCheckboxes() {
    //checkboxes wieder clearen
    this.answerBool = [false, false, false, false];
    for (let i = 0; i < 4; i++) {
      document.documentElement.style.setProperty(this.fields[i], '#fff');
    }
  }

}
