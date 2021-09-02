import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-themen',
  templateUrl: './themen.page.html',
  styleUrls: ['./themen.page.scss'],
})
export class ThemenPage implements OnInit {

  topicNames: Array <string> = [];
  numberOfQuestionsPerTopic: Array <number> = [];
  allQuestions: any = [];
  licenseName = '';
  quote = '';
  percent: string;
  progressPercent = [];
  backgroundProgressbar = [];
  transformProgressbar = [];
  userStats: any = [];
  schein: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      this.allQuestions = data;
      this.datareader();
    });
  }

  ionViewDidEnter() {
    this.getJSON();
  }

  async getJSON() {
    this.storageService.getStorage('progress').then(data => {
      this.userStats = data;
      this.getPercent();
    });
  }

  getPercent() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let schein = 0; schein < Object.keys(this.allQuestions.scheine).length; schein++) {
      let countAll = 0;
      let countTrue = 0;

      for (let thema = 0; thema < Object.keys(this.allQuestions.scheine[schein].Thema).length; thema++) {
        for (let question = 0; question < Object.keys(this.allQuestions.scheine[schein].Thema[thema].questions).length; question++) {
          countAll++;
          if (this.userStats.scheine[schein].thema[thema].correctQuestion[question]) {
            countTrue++;
          }
        }
      }
      const percent = countTrue / countAll * 100;
      this.setPercentOfProgressCircle(percent);
    }
  }

  datareader() {
    this.schein = this.activatedRoute.snapshot.paramMap.get('schein');

// eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.allQuestions.scheine[this.schein].Thema.length; i++) {
      this.topicNames.push(this.allQuestions.scheine[this.schein].Thema[i].themaName);
      this.numberOfQuestionsPerTopic.push(this.allQuestions.scheine[this.schein].Thema[i].questions.length);
    }
    this.licenseName = this.allQuestions.scheine[this.schein].scheinName;
    this.quote = this.allQuestions.scheine[this.schein].quote;
  }

  navigate(theme: string) {

    let scheinZahl: any;

    for (const i in this.topicNames) {
      if (this.topicNames[i] === theme) {
        scheinZahl = i;
      }
    }

    const schein = this.activatedRoute.snapshot.paramMap.get('schein');
    this.router.navigate(['questions/' + schein + scheinZahl]);
  }

  navigateHome() {
    this.router.navigate(['tabs/home']);
  }

  setPercentOfProgressCircle(percent: number) {

    this.progressPercent.push(Math.ceil(percent) + '%');
    let deg = percent * 3.6;
    if (percent >= 50) {
      this.backgroundProgressbar.push('white');
      deg = deg - 180;
    }
    else {
      this.backgroundProgressbar.push('#777');
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
