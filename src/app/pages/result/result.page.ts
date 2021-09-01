import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  data: any;
  resultArray: Array<boolean> = [];
  resultArrayCounter = 0;
  result: any;
  topicIndizes: Array<string> = [];
  trueInTheme: Array<any> = [];
  falseInTheme: Array<any> = [];
  topic: number;
  schein: number;
  topics = [];
  wrongQuestionsJSON = {
    thema: [{
      question: []
    }]
  };
  wrongQuestionsArray = [];
  clicked = [];
  percent: string;
  percentAusgabe = [];
  backgroundProgressbar = [];
  transformProgressbar = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {

  }

  ngOnInit() {
    const resultreceived = this.activatedRoute.snapshot.paramMap.get('result');
    this.resultreceivedToArray(resultreceived);
    this.getScheinAndTopic(resultreceived);

    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      this.data = data;
      this.fillClickedArray();
      this.createTopicsJSON();
      this.answersInTheme();
    });

  }

  getScheinAndTopic(resultreceived: string) {
    this.topic = Number(resultreceived.charAt(1));
    this.schein = Number(resultreceived.charAt(0));
  }

  resultreceivedToArray(resultreceived: string) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < resultreceived.length; i++) {
      if (resultreceived[i] === 't') {
        this.resultArray.push(true);
      }
      else if (resultreceived[i] === 'f') {
        this.resultArray.push(false);
      }
    }
  }

  fillClickedArray() {
    if (isNaN(this.topic)) {
      for (const i of this.data.scheine[this.schein].Thema) {
        this.clicked.push(false);
      }
    }
    else {
      this.clicked.push(false);
    }
  }

  answersInTheme() {

    if (isNaN(this.topic)) {
      for (let i = 0; i < Object.keys(this.data.scheine[this.schein].Thema).length; i++) {
        this.topicIndizes.push(i.toString());
        const trueAnzahl = this.countTrue(i);
        this.topics.push({
          thema: [
            {
              trueCount: trueAnzahl,
              falseCount: this.countFalse(i, trueAnzahl)
            }
          ]
        });
        this.getPercent(i);
      }
    }
    else {
      this.topicIndizes.push(this.topic.toString());
      const trueAnzahl = this.countTrue(this.topic);
      this.topics.push({
        thema: [
          {
            trueCount: trueAnzahl,
            falseCount: this.countFalse(this.topic, trueAnzahl)
          }
        ]
      });
    }
  }


  getPercent(thema: number) {
    const trueCount = this.topics[thema].thema[0].trueCount;
    const answersNumber = Object.keys(this.data.scheine[this.schein].Thema[thema].questions).length;
    const percent = trueCount / answersNumber * 100;
    this.setPercentOfProgressCircle(percent);
    console.log(percent);
  }


  countTrue(thema: number) {
    let trueAnzahl = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < Object.keys(this.data.scheine[this.schein].Thema[thema].questions).length; i++) {
      if (this.resultArray[this.resultArrayCounter] === true) {
        trueAnzahl++;
      }
      else {
        this.addQuestionToJson(thema, i);
      }
      this.resultArrayCounter++;
    }
    return trueAnzahl;
  }

  countFalse(thema: number, trueCount: number) {
    return Object.keys(this.data.scheine[this.schein].Thema[thema].questions).length - trueCount;
  }

  buttonClicked(buttonIndex: number) {
    if (this.clicked[buttonIndex] === false) {
      if (this.topics[buttonIndex].thema[0].falseCount !== 0) {
        this.clicked = [];
        this.fillClickedArray();
        this.clicked[buttonIndex] = true;
        this.jsonToArray(buttonIndex);
      }
    }
    else {
      this.clicked[buttonIndex] = false;
    }
  }

  createTopicsJSON() {
    if (isNaN(this.topic)) {
      for (const i of this.data.scheine[this.schein].Thema) {
        this.wrongQuestionsJSON.thema.push({
          question: []
        });
      }
    }
    else {
      this.wrongQuestionsJSON.thema.push({
        question: []
      });
    }
  }

  addQuestionToJson(themaIndex: number, questionIndex: number) {
    if (isNaN(this.topic)) {
      this.wrongQuestionsJSON.thema[themaIndex].question.push({
        id: this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].id,
        question: this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].question,
        trueAnswers: this.getTrueAnswers(themaIndex, questionIndex),
        wrongAnswers: this.getWrongAnswers(themaIndex, questionIndex)


      });
    }
    else {
      this.wrongQuestionsJSON.thema[0].question.push({
        id: this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].id,
        question: this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].question,
        trueAnswers: this.getTrueAnswers(themaIndex, questionIndex),
        wrongAnswers: this.getWrongAnswers(themaIndex, questionIndex)

      });
    }
  }

  jsonToArray(thema: number) {
    this.wrongQuestionsArray = [];
    for (let i = 0; i < Object.keys(this.wrongQuestionsJSON.thema[thema].question).length; i++) {
      this.wrongQuestionsArray.push(this.wrongQuestionsJSON.thema[thema].question[i].question);
    }

  }

  getTrueAnswers(themaIndex: number, questionIndex: number) {


    const arr = [];
    if (this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].correctAnswer[0]) {
      arr.push(this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].answer1);
    }

    if (this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].correctAnswer[1]) {
      arr.push(this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].answer2);
    }

    if (this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].correctAnswer[2]) {
      arr.push(this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].answer3);
    }

    if (this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].correctAnswer[3]) {
      arr.push(this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].answer4);
    }
    return arr;
  }

  getWrongAnswers(themaIndex: number, questionIndex: number) {


    const arr = [];
    if (!this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].correctAnswer[0]) {
      arr.push(this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].answer1);
    }

    if (!this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].correctAnswer[1]) {
      arr.push(this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].answer2);
    }

    if (!this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].correctAnswer[2]) {
      arr.push(this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].answer3);
    }

    if (!this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].correctAnswer[3]) {
      arr.push(this.data.scheine[this.schein].Thema[themaIndex].questions[questionIndex].answer4);
    }
    return arr;
  }

  setPercentOfProgressCircle(percent: number) {

    this.percentAusgabe.push( Math.ceil(percent) + '%');
    let deg = percent * 3.6;
    if (percent >= 50) {
      this.backgroundProgressbar.push('white');
      deg = deg - 180;
    }
    else {
      this.backgroundProgressbar.push('#777');
    }
    this.transformProgressbar.push('rotate('+deg+'deg)');
  }

  applyStyles(thema: number) {
    const styles = {'background-color' : this.backgroundProgressbar[thema],
                    transform: this.transformProgressbar[thema]};
    return styles;
}

}



