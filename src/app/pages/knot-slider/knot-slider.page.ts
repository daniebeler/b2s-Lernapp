import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { KnotsPopoverComponent } from '../../components/knots-popover/knots-popover.component';

@Component({
  selector: 'app-knot-slider',
  templateUrl: './knot-slider.page.html',
  styleUrls: ['./knot-slider.page.scss'],
})
export class KnotSliderPage implements OnInit {

  knot: any;
  data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private popover: PopoverController
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

  async createPopover(ev: any) {
    const pop = await this.popover.create({
      component: KnotsPopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      mode: 'ios',
      componentProps: {key1: this.data.knots[this.knot].videoURL},
    });
    return await pop.present();
  }
}
