import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  question = 'wer bin ich';
  data: any = [];

  constructor(private httpClient: HttpClient) {

   }

  ngOnInit() {
    this.httpClient.get('./assets/data/questions.json').subscribe(data =>{
      this.data = data;
      this.datareader();
    });
  }

  datareader() {
    this.question = this.data.questions[1].question;
  }

}
