import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ResultPage } from '../pages/result/result.page';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage
  ) {
    this.storage.create();
   }

  async set(key: string, value: any): Promise<any> {
    await this.storage.set(key, value);
  }

  getStorage(key: string): Promise<any> {
    return this.storage.get(key);
  }

  shouldCreateProgressJSON() {
    let keys = [];
    this.storage.keys().then(data => {
      keys = data;
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'progress') {
          return false;
        }
      }
      return true;
    });

    return false;
  }

}
