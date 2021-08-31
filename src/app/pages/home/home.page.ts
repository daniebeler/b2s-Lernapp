import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  courses: Array <string> = [];
  data: any = [];
  currentcourse: string;
  percent: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

   }


// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
ngOnInit() {
  this.httpClient.get('./assets/data/questions.json').subscribe(data => {
    this.data = data;
    this.datareader();
  });
  this.setPercentOfProgressCircle(80);
}

datareader() {
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < this.data.scheine.length; i++) {
    this.courses.push(this.data.scheine[i].scheinName);
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

  nav(){
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
    document.documentElement.style.setProperty('--transform', 'rotate('+deg+'deg)');
  }

}
