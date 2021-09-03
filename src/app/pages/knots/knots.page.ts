import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-knots',
  templateUrl: './knots.page.html',
  styleUrls: ['./knots.page.scss'],
})
export class KnotsPage implements OnInit {

  knotsArray: Array<any> = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.httpClient.get('./assets/data/knots.json').subscribe(data => {
      const knotsJSON: any = data;
      this.knotsArray = knotsJSON.knots;
    });
  }

  navigate(knotIndex: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        knotindex: knotIndex
      }
    };
    this.router.navigate(['tabs/knots/knot-slider'], navigationExtras);
  }
}
