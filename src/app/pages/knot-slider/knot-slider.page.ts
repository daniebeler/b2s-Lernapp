import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { KnotsService } from 'src/app/services/knots.service';
import { KnotsPopoverComponent } from '../../components/knots-popover/knots-popover.component';

@Component({
  selector: 'app-knot-slider',
  templateUrl: './knot-slider.page.html',
  styleUrls: ['./knot-slider.page.scss'],
})
export class KnotSliderPage implements OnInit {

  knotData: any;

  constructor(
    private router: Router,
    private popover: PopoverController,
    private knotService: KnotsService
  ) { }

  ngOnInit() {
    this.knotData = this.knotService.getCurrentKnotData();
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
      componentProps: {key1: this.knotData.videoURL},
    });
    return await pop.present();
  }
}
