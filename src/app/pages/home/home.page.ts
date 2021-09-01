import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  courses: Array<string> = [];
  quotes: Array<string> = [];
  data: any = [];
  currentcourse: string;
  percent: string;
  userStats: any = [];
  progressPercent = [];
  backgroundProgressbar = [];
  transformProgressbar = [];


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private screenOrientation: ScreenOrientation,
    private storageService: StorageService
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }


  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      this.data = data;
      this.datareader();

      if (this.storageService.shouldCreateProgressJSON()) {
        this.generateProgressJson();
      }
    });
  }

  ionViewDidEnter() {
    this.progressPercent = [];
    this.backgroundProgressbar = [];
    this.transformProgressbar = [];
    this.getJSON();
  }

  generateProgressJson() {
    const newJSON = {
      scheine: [

      ]
    };
    for (let schein = 0; schein < Object.keys(this.data.scheine).length; schein++) {

      newJSON.scheine.push(
        {
          thema: [

          ]
        }
      );

      for (let thema = 0; thema < Object.keys(this.data.scheine[schein].Thema).length; thema++) {

        newJSON.scheine[schein].thema.push(
          {
            correctQuestion: []
          }
        );

        const correctQuestionArray = [];

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let question = 0; question < Object.keys(this.data.scheine[schein].Thema[thema].questions).length; question++) {
          correctQuestionArray.push(false);
          newJSON.scheine[schein].thema[thema].correctQuestion = correctQuestionArray;
        }

      }

    }

    this.storageService.set('progress', newJSON);
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
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.data.scheine.length; i++) {
      this.courses.push(this.data.scheine[i].scheinName);
      this.quotes.push(this.data.scheine[i].quote);
    }

  }

  navigate(site: string) {

    let scheinZahl: any;

    for (const i in this.courses) {
      if (this.courses[i] === site) {
        scheinZahl = i;
      }
    }
    this.router.navigate(['tabs/home/quiztypes/' + scheinZahl]);
  }

  nav() {
    this.router.navigate(['tabs/']);

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
