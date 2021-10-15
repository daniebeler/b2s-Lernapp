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
  data: any;
  leftPictures = [];
  rightPictures = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.httpClient.get('./assets/data/knots.json').subscribe(data => {
      const knotsJSON: any = data;
      this.data = data;
      this.knotsArray = knotsJSON.knots;
      this.fillPicutesArray();
    });
  }

  fillPicutesArray() {
    for (let i = 1; i < this.data.knots.length; i++) {
      if (i % 2 === 0) {
        this.leftPictures.push(i);
      }
      else {
        this.rightPictures.push(i);
      }
    }
    console.log(this.leftPictures);
    console.log(this.rightPictures);
    console.log(this.data);
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
