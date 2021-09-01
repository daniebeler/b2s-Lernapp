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
  quote = '';
  allQuestions = 0;
  percent: string;

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

    this.setPercentOfProgressCircle(35);
  }

  datareader() {
    this.schein = this.activatedRoute.snapshot.paramMap.get('schein');
    this.scheinName = this.data.scheine[this.schein].scheinName;
    this.quote = this.data.scheine[this.schein].quote;

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
    this.router.navigate(['tabs/home']);
  }

  setPercentOfProgressCircle(percent: number) {

    this.percent = percent + '%';
    let deg = percent * 3.6;
    if (percent >= 50) {
      document.documentElement.style.setProperty('--background-processCircle', 'white');
      deg = deg - 180;
    }
    else {
      document.documentElement.style.setProperty('--background-processCircle', '#777777');
    }
    document.documentElement.style.setProperty('--transform', 'rotate('+deg+'deg)');
  }

}
