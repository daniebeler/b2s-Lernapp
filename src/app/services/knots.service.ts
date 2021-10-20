import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KnotsService {

  private currentKnot = 0;
  private knotData: any;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('./assets/data/knots.json').subscribe(data => {
      this.knotData = data;
    });
   }

   setCurrentKnotIndex(knot) {
    this.currentKnot = knot;
  }

  getKnotData() {
    return this.knotData.knots;
  }

  getCurrentKnotData() {
    return this.knotData.knots[this.currentKnot];
  }
}
