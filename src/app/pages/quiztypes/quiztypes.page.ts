import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiztypes',
  templateUrl: './quiztypes.page.html',
  styleUrls: ['./quiztypes.page.scss'],
})
export class QuiztypesPage implements OnInit {

  data: any;
  schein: any;
  scheinName = '';
  allQuestions = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      this.data = data;
      this.datareader();
    });
  }

  datareader() {
    this.schein = this.activatedRoute.snapshot.paramMap.get('schein');
    this.scheinName = this.data.scheine[this.schein].scheinName;

    for (let i = 0; i < Object.keys(this.data.scheine[this.schein].Thema).length; i++) {
      for (const a of Object.keys(this.data.scheine[this.schein].Thema[i].questions)) {
        this.allQuestions++;
      }
    }
  }

  navigate(site: string) {
    this.router.navigate([site + this.schein]);
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

}