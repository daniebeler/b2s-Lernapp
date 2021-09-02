import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-knot-slider',
  templateUrl: './knot-slider.page.html',
  styleUrls: ['./knot-slider.page.scss'],
})
export class KnotSliderPage implements OnInit {

  knot: any;
  slides: Array <string> = [];
  data: any;
  knotName: string;
  knotUsage: string;
  knotExplanation = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.knot = this.activatedRoute.snapshot.paramMap.get('knot');
    this.httpClient.get('./assets/data/knots.json').subscribe(data => {
      this.data = data;
      this.getSlidePictures();
      this.knotFirstSlide();
    });
  }

  knotFirstSlide() {
    this.knotName = this.data.knots[this.knot].knotName;
    this.knotUsage = this.data.knots[this.knot].knotUsage;
  }


  getSlidePictures() {
     for (let i = 0; i < Object.keys(this.data.knots[this.knot].pictures).length; i++) {
       this.slides.push(this.data.knots[this.knot].pictures[i]);
       console.log(this.data.knots[this.knot].knotExplanation);
       this.knotExplanation.push(this.data.knots[this.knot].slideExplanation[i]);
     }
  }

}
