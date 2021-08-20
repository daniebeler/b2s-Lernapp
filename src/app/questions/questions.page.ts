import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  question = 'wer bin ich';
  data: any;

  constructor(
    private http: Http
  ) {
   // this.http.get('assets/data/questions.json').map(res => res.json()).subscribe(data => {
      //this.data = data;
    //});
   }

  ngOnInit() {
  }

}
