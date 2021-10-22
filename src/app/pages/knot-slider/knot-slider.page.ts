import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnotsService } from 'src/app/services/knots.service';

@Component({
  selector: 'app-knot-slider',
  templateUrl: './knot-slider.page.html',
  styleUrls: ['./knot-slider.page.scss'],
})
export class KnotSliderPage implements OnInit {

  knotData: any;
  showVideo = false;

  constructor(
    private router: Router,
    private knotService: KnotsService
  ) { }

  ngOnInit() {
    this.knotData = this.knotService.getCurrentKnotData();
    this.showVideo = false;
  }

  navigateBack() {
    this.router.navigate(['tabs/knots']);
  }
}
