/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  schein: number;
  scheinJSON: any = [];
  quiztype: any;
  thema: string;
  questionsnumber = 0;
  currentQuestion = 0;
  image = [];
  progress: any = [];
  answerDisable = 'auto';
  quizQuestionsArray = [];
  quizQuestionsPerTopic = [5, 3, 2, 2, 2, 2, 2, 2, 2, 2];

  checkButtonText = 'Check';

  constructor(
    private router: Router,
    private storageService: StorageService,
    private alertController: AlertController
  ) {

  }

  ngOnInit() {

    this.data = this.storageService.getQuestions();
    this.schein = this.storageService.getLicense();
    this.quiztype = this.storageService.getQuiztype();
    this.themaindex = this.storageService.getTopic();
    this.thema = String(this.themaindex);

    if (this.quiztype === 2) {
      this.quizsimulation();
    }

    this.questionsnumber = this.questionnumberfunction();

    this.getJSON();

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
    if (this.quiztype === 0) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < this.data.scheine[this.schein].Thema.length; i++) {
        for (const a of this.data.scheine[this.schein].Thema[i].questions) {
          qeustionnumbers++;
        }
      }
    }
    else if (this.quiztype === 1) {
      for (const a of this.data.scheine[this.schein].Thema[this.themaindex].questions) {
        qeustionnumbers++;
      }
    }
    else {
      qeustionnumbers = this.quizQuestionsPerTopic.reduce((a, b) => a + b, 0);
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
        }
        else {
          document.documentElement.style.setProperty(this.fields[this.answerIndexArray[i]], '#ff00003f');
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
        question: this.questionindex,
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
      if ((this.data.scheine[this.schein].Thema[this.themaindex].questions.length === this.questionindex + 1 && this.quiztype === 0)) {
        if (this.data.scheine[this.schein].Thema.length === this.themaindex + 1 && this.thema === undefined) {
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
        if (this.quiztype === 0) {
          this.questionindex++;
        }
        else {
          this.quizsimulation();
        }
      }
      this.datareader();
      this.clearCheckboxes();
      this.checkButtonText = 'Check';
      this.answerDisable = 'auto';
    }
  }


  quizsimulation() {

    if (this.quizQuestionsArray.length === this.quizQuestionsPerTopic[this.themaindex]) {
      if (this.data.scheine[this.schein].Thema.length === this.themaindex + 1) {
        this.currentQuestion = 0;
        this.questionindex = 0;
        this.themaindex = 0;
        this.navigate();
        return;
      }
      this.themaindex++;
      this.quizQuestionsArray = [];
    }

    this.questionindex = this.randomQuestion();
  }

  randomQuestion() {

    const max = this.data.scheine[this.schein].Thema[this.themaindex].questions.length - 1;
    const min = 0;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    let wrong = 0;

    do {
      wrong = 0;
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < this.quizQuestionsArray.length; i++) {
        if (randomNumber === this.quizQuestionsArray[i]) {
          randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          wrong++;
        }
      }
    }
    while (wrong !== 0);
    this.quizQuestionsArray.push(randomNumber);
    return randomNumber;
  }


  clearCheckboxes() {
    this.answerBool = [false, false, false, false];
    for (let i = 0; i < 4; i++) {
      document.documentElement.style.setProperty(this.fields[i], 'var(--ion-color-button)');
      document.documentElement.style.setProperty(this.infos[0], 'hidden');
    }
  }

  async navigateHome() {
    const alert = await this.alertController.create({
      cssClass: 'customalert',
      backdropDismiss: false,
      header: 'Achtung!',
      message: 'Bist du dir sicher?',
      buttons: [
        {
          text: 'Abbrechen'
        }, {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['tabs/home']);
          }
        }]
    });

    await alert.present();
  }

  navigate() {
    this.router.navigate(['result/' + JSON.stringify(this.answerschecker)]);
  }
}
