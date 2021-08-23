import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-themen',
  templateUrl: './themen.page.html',
  styleUrls: ['./themen.page.scss'],
})
export class ThemenPage implements OnInit {

  themes: Array <string> = [];
  data: any = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      this.data = data;
      this.datareader();
    });
  }

  datareader() {
// eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.data.scheine[0].Thema.length; i++) {
      this.themes.push(this.data.scheine[0].Thema[i].themaName);
    }
  }

  navigate(theme: string) {

    let scheinZahl: any;

    for (const i in this.themes) {
      if (this.themes[i] === theme) {
        scheinZahl = i;
      }
    }

    const schein = this.activatedRoute.snapshot.paramMap.get('schein');
    this.router.navigate(['questions/' + schein + scheinZahl]);
  }

}
