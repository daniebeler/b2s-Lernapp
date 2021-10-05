import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-knot-slider',
  templateUrl: './knot-slider.page.html',
  styleUrls: ['./knot-slider.page.scss']
})
export class KnotSliderPage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;

  knot: any;
  slides: Array <string> = [];
  data: any;
  knotName: string;
  knotUsage: string;
  knotVideoURL: string;
  knotExplanation = [];
  arrow = '../../../assets/icon/swipeRight2.png';

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngAfterContentChecked() {
    if(this.swiper){
      this.swiper.updateSwiper({});
    }
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.knot = this.router.getCurrentNavigation().extras.state.knotindex;
        this.httpClient.get('./assets/data/knots.json').subscribe(data => {
          this.data = data;
          //this.getSlidePictures();
          this.knotFirstSlide();
        });
      }
    });
  }

  knotFirstSlide() {
    this.knotName = this.data.knots[this.knot].name;
    this.knotUsage = this.data.knots[this.knot].usage;
    this.knotVideoURL = this.data.knots[this.knot].videoURL;
  }

  getSlidePictures() {
     for (let i = 0; i < Object.keys(this.data.knots[this.knot].pictures).length; i++) {
       this.slides.push(this.data.knots[this.knot].pictures[i]);
       console.log(this.data.knots[this.knot].knotExplanation);
       this.knotExplanation.push(this.data.knots[this.knot].slideExplanation[i]);
     }
  }

  navigateBack() {
    this.router.navigate(['tabs/knots']);
  }
}
