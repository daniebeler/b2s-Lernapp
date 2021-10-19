import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-knot-slider',
  templateUrl: './knot-slider.page.html',
  styleUrls: ['./knot-slider.page.scss']
})
export class KnotSliderPage implements OnInit {

  knot: any;
  data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) { }


  ngOnInit() {
    this.httpClient.get('./assets/data/knots.json').subscribe(data => {
      this.data = data;
      console.log(data);
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.knot = this.router.getCurrentNavigation().extras.state.knotindex;

      }
    });
  }


  navigateBack() {
    this.router.navigate(['tabs/knots']);
  }
}
