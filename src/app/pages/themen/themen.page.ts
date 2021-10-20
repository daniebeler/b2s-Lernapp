import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-themen',
  templateUrl: './themen.page.html',
  styleUrls: ['./themen.page.scss'],
})
export class ThemenPage implements OnInit {

  topicNames: Array<string> = [];
  numberOfQuestionsPerTopic: Array<number> = [];
  allQuestions: any;
  licenseName = '';
  quote = '';
  percent: string;
  progressPercent = [];
  backgroundProgressbar = [];
  transformProgressbar = [];
  userStats: any = [];
  schein: any;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    if (this.allQuestions === undefined) {
      this.allQuestions = this.storageService.getQuestions();
      this.datareader();
      this.getJSON();
    }
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
    this.schein = this.storageService.getLicense();
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.allQuestions.scheine[this.schein].Thema.length; i++) {
      this.topicNames.push(this.allQuestions.scheine[this.schein].Thema[i].themaName);
      this.numberOfQuestionsPerTopic.push(this.allQuestions.scheine[this.schein].Thema[i].questions.length);
    }
    this.licenseName = this.allQuestions.scheine[this.schein].scheinName;
    this.quote = this.allQuestions.scheine[this.schein].quote;
  }

  navigate(i: number) {
    this.storageService.setTopic(i);
    this.router.navigate(['questions']);
  }

  navigateHome() {
    this.router.navigate(['tabs/home']);
  }

  setPercentOfProgressCircle(percent: number) {

    this.progressPercent.push(Math.ceil(percent) + '%');
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
