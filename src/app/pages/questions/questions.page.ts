import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

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
  infos = ['--info1'];
  questionindex = 0;
  themaindex = 0;
  answerschecker = [];
  schein: string;
  thema: string;
  questionsnumber = 0;
  currentQuestion = 0;
  quizType = 0;
  image = [];
  progress: any = [];
  answerDisable = 'auto';

  checkButtonText = 'Check';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService
  ) {

  }

  ngOnInit() {
    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      this.data = data;
      this.getJSON();
    });


    this.schein = this.activatedRoute.snapshot.paramMap.get('schein');
    if (this.schein.length === 2) {
      this.quizType = 1;
      this.thema = this.schein.charAt(1);
      this.schein = this.schein.charAt(0);
      this.themaindex = Number(this.thema);
    }
  }

  ionViewDidEnter() {
    this.clearCheckboxes();
  }

  async getJSON() {
    this.storageService.getStorage('progress').then(data => {
      this.progress = data;
      this.datareader();
    });
  }


  questionnumberfunction() {
    let qeustionnumbers = 0;
    if (this.quizType === 0) {
      for (let i = 0; i < Object.keys(this.data.scheine[this.schein].Thema).length; i++) {
        for (const a of Object.keys(this.data.scheine[this.schein].Thema[i].questions)) {
          qeustionnumbers++;
        }
      }
    }
    else {
      for (const a of Object.keys(this.data.scheine[this.schein].Thema[this.themaindex].questions)) {
        qeustionnumbers++;
      }
    }


    return qeustionnumbers;
  }


  datareader() {
    //frage und antworte wieder auslesen
    this.question = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].question;

    this.answer1 = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer1;
    this.answer2 = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer2;
    this.answer3 = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer3;
    this.answer4 = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer4;

    this.image[0] = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].image;

    if (this.image[0] === undefined) {
      this.image = [];
    }

    if (this.questionsnumber === 0) {
      this.questionsnumber = this.questionnumberfunction();
    }

    this.currentQuestion++;
  }


  check() {
    //change color if is true or false
    if (this.checkButtonText === 'Check') {
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
        console.log(this.schein);
        console.log(this.themaindex);
        console.log(this.progress);
        this.progress.scheine[this.schein].thema[this.themaindex].correctQuestion[this.questionindex] = true;
        this.storageService.set('progress', this.progress);
      }
      else {
        this.answerschecker.push(false);
        this.progress.scheine[this.schein].thema[this.themaindex].correctQuestion[this.questionindex] = false;
        this.storageService.set('progress', this.progress);
      }

      this.checkButtonText = 'Weiter';
      this.answerDisable = 'none';
      document.documentElement.style.setProperty(this.infos[0], 'visible');
    }

    else {
      //next Question or next Thema or fertig
      if (Object.keys(this.data.scheine[this.schein].Thema[this.themaindex].questions).length === this.questionindex + 1) {
        if (Object.keys(this.data.scheine[this.schein].Thema).length === this.themaindex + 1 && this.thema === undefined) {
          this.currentQuestion = 0;
          this.questionindex = 0;
          this.themaindex = 0;
          const answercheckerToResult = this.answerschecker;
          this.answerschecker = [];

          this.router.navigate(['result/' + this.schein.toString() + answercheckerToResult]);


        }
        else {
          if (this.thema === undefined) {
            this.themaindex++;
          }
          else {
            this.currentQuestion = 0;
            this.questionindex = 0;
            this.themaindex = Number(this.thema);
            this.router.navigate(['result/' + this.schein.toString() + this.thema.toString() + this.answerschecker]);
          }
          this.questionindex = 0;
        }
      }
      else {
        this.questionindex++;
      }
      this.datareader();
      this.clearCheckboxes();
      this.checkButtonText = 'Check';
      this.answerDisable = 'auto';
    }
  }

  clearCheckboxes() {
    //checkboxes wieder clearen
    this.answerBool = [false, false, false, false];
    for (let i = 0; i < 4; i++) {
      document.documentElement.style.setProperty(this.fields[i], 'var(--ion-color-button)');
      document.documentElement.style.setProperty(this.infos[0], 'hidden');
    }
  }

  navigateHome() {
    this.router.navigate(['tabs/home']);
  }
}
