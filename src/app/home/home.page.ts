import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  courses: Array <string> = [];
  data: any = [];

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
    this.router.navigate(['quiztypes/' + scheinZahl]);
  }


}
