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
        this.trueInTheme.push(this.countTrue(i));
        this.falseInTheme.push(this.countFalse(i));
      }
    }
    else {
      this.topicIndizes.push(this.topic.toString());
      this.trueInTheme.push(this.countTrue(this.topic));
      this.falseInTheme.push(this.countFalse(this.topic));
    }
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
    console.log(trueAnzahl);
    return trueAnzahl;
  }

  countFalse(thema: number) {
    console.log(Object.keys(this.data.scheine[this.schein].Thema[thema].questions).length - this.countTrue(thema));
    return Object.keys(this.data.scheine[this.schein].Thema[thema].questions).length - this.trueInTheme[thema];
  }

}
