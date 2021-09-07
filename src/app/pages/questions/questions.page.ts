/* eslint-disable max-len */
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
  answerArray = [];
  answerIndexArray = [];
  answerBool = [false, false, false, false];
  fields = ['--field1', '--field2', '--field3', '--field4'];
  infos = ['--info1'];
  questionindex = 0;
  themaindex = 0;
  answerschecker = [];
  schein: string;
  scheinJSON: any = [];
  quiztypeIndex: any;
  thema: string;
  questionsnumber = 0;
  currentQuestion = 0;
  justOneTopic = false;
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


      this.scheinJSON = JSON.parse(this.activatedRoute.snapshot.paramMap.get('schein'));
      this.schein = this.scheinJSON.license;
      this.quiztypeIndex = this.scheinJSON.quiztype;

      if (this.scheinJSON.topic !== null) {
        this.justOneTopic = true;
        this.themaindex = this.scheinJSON.topic;
        this.thema = String(this.themaindex);
      }

      this.getJSON();
    });

  }

  ionViewDidEnter() {
    this.answerschecker = [];
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
    if (this.justOneTopic === false) {
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

    this.answerIndexArray = [];

    this.answerArray[this.makeRandomNumber()] = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer1;
    this.answerArray[this.makeRandomNumber()] = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer2;
    this.answerArray[this.makeRandomNumber()] = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer3;
    this.answerArray[this.makeRandomNumber()] = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].answer4;
    this.image[0] = this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].image;

    if (this.image[0] === undefined) {
      this.image = [];
    }

    if (this.questionsnumber === 0) {
      this.questionsnumber = this.questionnumberfunction();
    }

    this.currentQuestion++;
  }

  makeRandomNumber() {

    let randomNumber = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    let wrong = 0;

    do {
      wrong = 0;
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < this.answerIndexArray.length; i++) {
        if (randomNumber === this.answerIndexArray[i]) {
          randomNumber = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
          wrong++;
        }
      }
    }
    while (wrong !== 0);
    this.answerIndexArray.push(randomNumber);
    return randomNumber;
  }


  check() {
    //change color if is true or false
    if (this.checkButtonText === 'Check') {
      let countTrue = 0;

      for (let i = 0; i < this.answerBool.length; i++) {
        // console.log(this.answerIndexArray[i]);
        // console.log(this.answerBool[this.answerIndexArray[i]] + '   ' + this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].correctAnswer[i]);
        if (this.answerBool[this.answerIndexArray[i]] === this.data.scheine[this.schein].Thema[this.themaindex].questions[this.questionindex].correctAnswer[i]) {
          document.documentElement.style.setProperty(this.fields[this.answerIndexArray[i]], '#00ff003f');
          countTrue++;
          console.log(this.answerIndexArray[i]);
        }
        else {
          document.documentElement.style.setProperty(this.fields[this.answerIndexArray[i]], '#ff00003f');
          console.log(this.answerIndexArray[i]);
        }
      }

      let stateBool;

      if (countTrue === 4) {
        stateBool = true;
      }
      else {
        stateBool = false;
      }

      const jason = {
        topic: this.themaindex,
        question: this.currentQuestion,
        state: stateBool,
        license: this.schein
      };

      this.answerschecker.push(jason);
      this.progress.scheine[this.schein].thema[this.themaindex].correctQuestion[this.questionindex] = stateBool;
      this.storageService.set('progress', this.progress);

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
          this.navigate();
        }
        else {
          if (this.thema === undefined) {
            this.themaindex++;
          }
          else {
            this.currentQuestion = 0;
            this.questionindex = 0;
            this.themaindex = Number(this.thema);
            this.navigate();
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
    this.answerBool = [false, false, false, false];
    for (let i = 0; i < 4; i++) {
      document.documentElement.style.setProperty(this.fields[i], 'var(--ion-color-button)');
      document.documentElement.style.setProperty(this.infos[0], 'hidden');
    }
  }

  navigateHome() {
    this.router.navigate(['tabs/home']);
  }

  navigate() {
    this.router.navigate(['result/' + JSON.stringify(this.answerschecker)]);
  }
}
