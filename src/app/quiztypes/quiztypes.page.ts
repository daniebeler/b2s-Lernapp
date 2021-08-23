import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiztypes',
  templateUrl: './quiztypes.page.html',
  styleUrls: ['./quiztypes.page.scss'],
})
export class QuiztypesPage implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  navigate(site: string) {
    const schein = this.activatedRoute.snapshot.paramMap.get('schein');
    this.router.navigate([site + schein]);
  }

}
