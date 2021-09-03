import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
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
  questionsJSON: any = [];
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
      this.questionsJSON = data;
      this.datareader();
    });
  }

  ionViewDidEnter() {
    this.storageService.shouldCreateProgressJSON().then(test => {
      const generateProgress = test;
      if (generateProgress === null) {
        this.generateProgressJSON();
      }
      else {
        this.progressPercent = [];
        this.backgroundProgressbar = [];
        this.transformProgressbar = [];
        this.getProgressJSONFromStorage();
      }
    });
  }

  generateProgressJSON() {
    const newJSON = {
      scheine: []
    };
    for (let schein = 0; schein < Object.keys(this.questionsJSON.scheine).length; schein++) {

      newJSON.scheine.push({
        id: this.questionsJSON.scheine[schein].id,
        thema: []
      });

      for (let thema = 0; thema < Object.keys(this.questionsJSON.scheine[schein].Thema).length; thema++) {
        newJSON.scheine[schein].thema.push({
          id: thema + 1,
          correctQuestion: []
        });
        const correctQuestionArray = [];

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let question = 0; question < Object.keys(this.questionsJSON.scheine[schein].Thema[thema].questions).length; question++) {
          correctQuestionArray.push(false);
          newJSON.scheine[schein].thema[thema].correctQuestion = correctQuestionArray;
        }
      }
    }
    this.storageService.set('progress', newJSON).then(() => {
      this.progressPercent = [];
      this.backgroundProgressbar = [];
      this.transformProgressbar = [];
      this.getProgressJSONFromStorage();
    });
  }

  async getProgressJSONFromStorage() {
    this.storageService.getStorage('progress').then(data => {
      this.userStats = data;
      this.checkIfJSONchanged();
    });
  }

  checkIfJSONchanged() {
    this.completeLicenses();
    this.completeTopics();
    this.completeQuestions();
    this.storageService.set('progress', this.userStats).then(value => {
    this.getPercent();
    });
  }

  completeLicenses() {
    if (Object.keys(this.questionsJSON.scheine).length !== Object.keys(this.userStats.scheine).length) {
      const missingids = [];
      for (let schein = 0; schein < Object.keys(this.questionsJSON.scheine).length; schein++) {
        let found = false;
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let progress = 0; progress < Object.keys(this.userStats.scheine).length; progress++) {
          if (this.questionsJSON.scheine[schein].id === this.userStats.scheine[progress].id) {
            found = true;
          }
        }
        if (!found) {
          missingids.push(schein);
        }

      }
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < missingids.length; i++) {
        this.userStats.scheine.splice(missingids[i], 0, {
          id: missingids[i] + 1,
          thema: []
        });
      }
    }
  }

  completeTopics() {
    for (let schein = 0; schein < Object.keys(this.questionsJSON.scheine).length; schein++) {
      if (Object.keys(this.questionsJSON.scheine[schein].Thema).length !== Object.keys(this.userStats.scheine[schein].thema).length) {
        const missingids = [];
        for (let thema = 0; thema < Object.keys(this.questionsJSON.scheine[schein].Thema).length; thema++) {
          let found = false;
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let progress = 0; progress < Object.keys(this.userStats.scheine[schein].thema).length; progress++) {
            if (this.questionsJSON.scheine[schein].Thema[thema].id === this.userStats.scheine[schein].thema[progress].id) {
              found = true;
            }
          }
          if (!found) {
            missingids.push(thema);
          }

        }
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < missingids.length; i++) {
          this.userStats.scheine[schein].thema.push({
            id: missingids[i] + 1,
            correctQuestion: []
          });
        }
      }
    }
  }

  completeQuestions() {
    for (let schein = 0; schein < Object.keys(this.questionsJSON.scheine).length; schein++) {
      for (let thema = 0; thema < Object.keys(this.questionsJSON.scheine[schein].Thema).length; thema++) {
        for (let i = Object.keys(this.userStats.scheine[schein].thema[thema].correctQuestion).length;
         i < Object.keys(this.questionsJSON.scheine[schein].Thema[thema].questions).length; i++) {
          this.userStats.scheine[schein].thema[thema].correctQuestion.push(false);
        }
      }
    }
  }

  getPercent() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let schein = 0; schein < Object.keys(this.questionsJSON.scheine).length; schein++) {
      let countAll = 0;
      let countTrue = 0;

      for (let thema = 0; thema < Object.keys(this.questionsJSON.scheine[schein].Thema).length; thema++) {
        for (let question = 0; question < Object.keys(this.questionsJSON.scheine[schein].Thema[thema].questions).length; question++) {
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
    for (let i = 0; i < this.questionsJSON.scheine.length; i++) {
      this.courses.push(this.questionsJSON.scheine[i].scheinName);
      this.quotes.push(this.questionsJSON.scheine[i].quote);
    }
  }

  navigate(index: any) {
    const test = {
        license: index
      };
    this.router.navigate(['tabs/home/quiztypes/' + JSON.stringify(test)]);
  }

  nav() {
    this.router.navigate(['tabs/']);
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

  reset() {
    this.storageService.clear();
  }
}
