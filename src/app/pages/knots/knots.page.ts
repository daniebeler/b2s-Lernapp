import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnotsService } from 'src/app/services/knots.service';

@Component({
  selector: 'app-knots',
  templateUrl: './knots.page.html',
  styleUrls: ['./knots.page.scss'],
})
export class KnotsPage implements OnInit {

  knots: any;
  leftPictures = [];
  rightPictures = [];

  constructor(
    private router: Router,
    private knotsService: KnotsService
  ) { }

  ngOnInit() {
    this.knots = this.knotsService.getKnotData();
    this.fillPicutesArray();
  }

  fillPicutesArray() {
    for (let i = 1; i < this.knots.length; i++) {
      if (i % 2 === 0) {
        this.leftPictures.push(i);
      }
      else {
        this.rightPictures.push(i);
      }
    }
  }

  navigate(knotIndex: any) {
    this.knotsService.setCurrentKnotIndex(knotIndex);
    this.router.navigate(['tabs/knots/knot-slider']);
  }
}
