import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-knots',
  templateUrl: './knots.page.html',
  styleUrls: ['./knots.page.scss'],
})
export class KnotsPage implements OnInit {

  data: any;
  knots: Array <string> = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.httpClient.get('./assets/data/knots.json').subscribe(data => {
      this.data = data;
      this.datareader();
    });
  }

  datareader() {

    for (let i = 0; i < Object.keys(this.data.knots).length; i++) {
      this.knots.push(this.data.knots[i].knotName);
    }
  }

  navigate(site: string) {

    let knotNumber: any;

    for (const i in this.knots) {
      if (this.knots[i] === site) {
        knotNumber = i;
      }
    }

    this.router.navigate(['knot-slider/' + knotNumber]);
  }
}
