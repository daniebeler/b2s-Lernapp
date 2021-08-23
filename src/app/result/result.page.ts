import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  data: any;
  result: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {

    this.data = this.activatedRoute.snapshot.paramMap.get('result');

    this.percent();
   }

  ngOnInit() {
  }

  percent() {
    let anzahlTrue = 0;
    let anzahlFalse = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === 't') {
        anzahlTrue++;
      }
      else if (this.data[i] === 'f') {
        anzahlFalse++;
      }
    }
    this.result = anzahlTrue / (anzahlFalse + anzahlTrue) * 100;
  }

}
