import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-quiztypes',
  templateUrl: './quiztypes.page.html',
  styleUrls: ['./quiztypes.page.scss'],
})
export class QuiztypesPage implements OnInit {

  data: any;
  schein: any;
  scheinName = '';
  quote = '';
  allQuestions = 0;
  percent: string;
  progressPercent = [];
  backgroundProgressbar = [];
  transformProgressbar = [];
  userStats: any = [];
  scheinJSON: any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private storageService: StorageService
  ) { }

  ngOnInit() {

  }


  ionViewDidEnter() {
    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      if (this.data === undefined) {
        this.data = data;
        this.datareader();
      }
      this.getJSON();
    });
  }

  async getJSON() {
    this.storageService.getStorage('progress').then(data => {
      this.userStats = data;
      this.getPercent();
    });
  }

  getPercent() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let schein = 0; schein < Object.keys(this.data.scheine).length; schein++) {
      let countAll = 0;
      let countTrue = 0;

      for (let thema = 0; thema < Object.keys(this.data.scheine[schein].Thema).length; thema++) {
        for (let question = 0; question < Object.keys(this.data.scheine[schein].Thema[thema].questions).length; question++) {
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
    this.scheinJSON = JSON.parse(this.activatedRoute.snapshot.paramMap.get('schein'));
    this.schein = this.scheinJSON.license;

    this.scheinName = this.data.scheine[this.schein].scheinName;
    this.quote = this.data.scheine[this.schein].quote;

    for (let i = 0; i < Object.keys(this.data.scheine[this.schein].Thema).length; i++) {
      for (const a of Object.keys(this.data.scheine[this.schein].Thema[i].questions)) {
        this.allQuestions++;
      }
    }
  }

  navigate(site: string, quiztypIndex: number) {

  this.scheinJSON = {
    license: this.schein,
    quiztype: quiztypIndex,
    topic: null
  };

    this.router.navigate([site + JSON.stringify(this.scheinJSON)]);
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
