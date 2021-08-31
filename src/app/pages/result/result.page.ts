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


  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {

  }

  ngOnInit() {

    const resultreceived = this.activatedRoute.snapshot.paramMap.get('result');
    this.getScheinAndTopic(resultreceived);
    this.resultreceivedToArray(resultreceived);

    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      this.data = data;
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
    console.log(this.topics);
    // console.log(this.topics);
  }


  countTrue(thema: number) {
    let trueAnzahl = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < Object.keys(this.data.scheine[this.schein].Thema[thema].questions).length; i++) {
      if (this.resultArray[this.resultArrayCounter] === true) {
        trueAnzahl++;
      }
      this.resultArrayCounter++;
    }
    return trueAnzahl;
  }

  countFalse(thema: number,  trueCount: number) {
    return Object.keys(this.data.scheine[this.schein].Thema[thema].questions).length - trueCount;
  }
}
