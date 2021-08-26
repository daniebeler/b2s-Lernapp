import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-footer',
  templateUrl: './custom-footer.component.html',
  styleUrls: ['./custom-footer.component.scss'],
})
export class CustomFooterComponent implements OnInit {

  knotsIcon = '../../../assets/icon/footerIcons/knoten.svg';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  navigate(site: string) {
    this.router.navigate([site]);
  }

}
