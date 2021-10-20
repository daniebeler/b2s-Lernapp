import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private currentKnot = 0;
  private knotData: any;

  constructor(
    private storage: Storage,
    private httpClient: HttpClient
  ) {
    this.storage.create();

    this.httpClient.get('./assets/data/knots.json').subscribe(data => {
      this.knotData = data;
    });
  }

  async set(key: string, value: any): Promise<any> {
    await this.storage.set(key, value);
  }

  getStorage(key: string): Promise<any> {
    return this.storage.get(key);
  }

  async shouldCreateProgressJSON() {
    return this.storage.get('progress');
  }

  clear() {
    this.storage.clear();
  }

  setCurrentKnotIndex(knot) {
    this.currentKnot = knot;
  }

  getCurrentKnotIndex() {
    return this.currentKnot;
  }

  getCurrentKnotData() {
    return this.knotData.knots[this.getCurrentKnotIndex()];
  }
}
