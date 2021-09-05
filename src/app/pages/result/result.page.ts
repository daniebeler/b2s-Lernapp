import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  resultJSON: any;

  data: any;
  resultArray: Array<boolean> = [];
  resultArrayCounter = 0;
  result: any;
  topicIndizes: Array<number> = [];
  trueInTheme: Array<any> = [];
  falseInTheme: Array<any> = [];
  topic: number;
  schein: number;
  topics = [];
  wrongQuestionsJSON = {
    thema: []
  };
  wrongQuestionsArray = [];
  clicked = [];
  percent: string;
  percentAusgabe = [];
  backgroundProgressbar = [];
  transformProgressbar = [];
  trueQuestions = [];
  falseQuestions = [];
  currentQuestion = [];
  lastclickedButton = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {

  }

  ngOnInit() {
    const resultreceived = this.activatedRoute.snapshot.paramMap.get('result');
    this.resultJSON = JSON.parse(resultreceived);
    console.log(this.resultJSON);
    this.schein = this.resultJSON[0].license;

    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      this.data = data;
      this.generateTopicsArray();
    });


    //this.resultreceivedToArray(resultreceived);
    //this.getScheinAndTopic(resultreceived);

  }


  generateTopicsArray() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.resultJSON.length; i++) {
      let found = false;
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let j = 0; j < this.topicIndizes.length; j++) {
        if (this.resultJSON[i].topic === this.topicIndizes[j]) {
          found = true;
        }
      }
      if (!found) {
        this.topicIndizes.push(this.resultJSON[i].topic);
        this.fillCurrentQuestionArray(this.resultJSON[i].topic);
        this.wrongQuestionsJSON.thema.push({
          question: []
        });
        this.getquestions(this.resultJSON[i].topic);
        this.getPercent(this.resultJSON[i].topic);
      }
    }
  }

  fillCurrentQuestionArray(topic: number) {
    for (let i = 0; i < topic + 1; i++) {
      this.currentQuestion.push(0);
    }
  }


  getquestions(topic: any) {
    let countTrue = 0;
    let countFalse = 0;

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.resultJSON.length; i++) {
      if (this.resultJSON[i].topic === topic) {
        this.currentQuestion[topic] = this.currentQuestion[topic] + 1;

        if (this.resultJSON[i].state === true) {
          countTrue++;
        }
        else {
          countFalse++;
          this.addWrongQuestions(topic);
        }
      }
    }

    this.trueQuestions[topic] = countTrue;
    this.falseQuestions[topic] = countFalse;
  }

  getPercent(topicIndex: number) {
    const trueCount = this.trueQuestions[topicIndex];
    const answersNumber = Object.keys(this.data.scheine[this.schein].Thema[topicIndex].questions).length;
    const percent = trueCount / answersNumber * 100;
    this.setPercentOfProgressCircle(percent);
  }

  addWrongQuestions(topic: any) {
    let jsonposition;
    if (this.topicIndizes.length === 1) {
      jsonposition = 0;
    }
    else {
      jsonposition = topic;
    }

    this.wrongQuestionsJSON.thema[jsonposition].question.push({
      id: this.data.scheine[this.schein].Thema[topic].questions[this.currentQuestion[topic] - 1].id,
      question: this.data.scheine[this.schein].Thema[topic].questions[this.currentQuestion[topic] - 1].question,
      trueAnswers: this.getTrueAnswers(topic, this.currentQuestion[topic] - 1),
      wrongAnswers: this.getWrongAnswers(topic, this.currentQuestion[topic] - 1)
    });
  }

  wrongQuestionsJSONtoArray(topic: number) {
    for (let i = 0; i < Object.keys(this.wrongQuestionsJSON.thema[topic].question).length; i++) {
      this.wrongQuestionsArray.push(this.wrongQuestionsJSON.thema[topic].question[i].question);
    }
  }


  toggleItemContent(topicIndex: number) {
    if (this.wrongQuestionsJSON.thema[topicIndex].question.length !== 0) {
      this.wrongQuestionsArray = [];
      this.wrongQuestionsJSONtoArray(topicIndex);
      this.clicked[topicIndex] = !this.clicked[topicIndex];
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

    this.percentAusgabe.push(Math.ceil(percent) + '%');
    let deg = percent * 3.6;
    if (percent >= 50) {
      this.backgroundProgressbar.push('var(--color-progress-bar)');
      deg = deg - 180;
    }
    else {
      this.backgroundProgressbar.push('var(--color-progress-bar-dark)');
    }
    this.transformProgressbar.push('rotate(' + deg + 'deg)');
  }

  applyStyles(thema: number) {
    const styles = {
      'background-color': this.backgroundProgressbar[thema],
      transform: this.transformProgressbar[thema]
    };
    return styles;
  }

}
