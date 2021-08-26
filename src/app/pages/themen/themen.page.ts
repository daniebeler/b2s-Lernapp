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
  scheinName = '';

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
    const schein = this.activatedRoute.snapshot.paramMap.get('schein');
// eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.data.scheine[schein].Thema.length; i++) {
      this.themes.push(this.data.scheine[schein].Thema[i].themaName);
    }
    this.scheinName = this.data.scheine[schein].scheinName;
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

  navigateHome() {
    this.router.navigate(['home']);
  }

}
