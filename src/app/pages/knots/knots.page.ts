import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';


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
    private router: Router,
    private storageService: StorageService
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
    this.storageService.setCurrentKnotIndex(knotIndex);
    this.router.navigate(['tabs/knots/knot-slider']);
  }
}
