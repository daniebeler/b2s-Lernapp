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


      this.storageService.set('test', JSON.stringify(this.data));
      this.userStats = this.getJSON().then(res =>{
        console.log(res);
      });

    });
    this.setPercentOfProgressCircle(80);
  }

  async getJSON() {
    this.storageService.getStorage('test').then(data => {
      return JSON.parse(data);
    });
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

    this.percent = percent + '%';
    let deg = percent * 3.6;
    if (percent >= 50) {
      document.documentElement.style.setProperty('--background-processCircle', 'white');
      deg = deg - 180;
    }
    else {
      document.documentElement.style.setProperty('--background-processCircle', '#777777');
    }
    document.documentElement.style.setProperty('--transform', 'rotate(' + deg + 'deg)');
  }

}
