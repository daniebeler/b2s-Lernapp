import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  data: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
/*     this.activatedRoute.paramMap.subscribe(
      (data) => {
        console.log(data);
      }
    ); */
    this.data = this.activatedRoute.snapshot.paramMap.get('result');
   }

  ngOnInit() {
  }

}
