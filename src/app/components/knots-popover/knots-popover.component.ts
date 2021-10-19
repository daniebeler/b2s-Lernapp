import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-knots-popover',
  templateUrl: './knots-popover.component.html',
  styleUrls: ['./knots-popover.component.scss'],
})
export class KnotsPopoverComponent implements OnInit {

  params: string;

  constructor(
    private popover: PopoverController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.params = this.navParams.get('key1');
  }

  closePopover() {
    this.popover.dismiss();
  }

}
