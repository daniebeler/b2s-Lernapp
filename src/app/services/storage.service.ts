import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private license = 0;
  private quiztype = 0;
  private topic = 0;
  private ergebnisJSON = [];

  private questions: any;

  constructor(
    private storage: Storage,
    private httpClient: HttpClient
  ) {
    this.storage.create();
    this.httpClient.get('./assets/data/questions.json').subscribe(data => {
      this.questions = data;
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

  setLicense(index) {
    this.license = index;
  }

  getLicense() {
    return this.license;
  }

  setQuiztype(index) {
    this.quiztype = index;
  }

  getQuiztype() {
    return this.quiztype;
  }

  setTopic(index) {
    this.topic = index;
  }

  getTopic() {
    return this.topic;
  }

  getQuestions() {
    return this.questions;
  }

  setErgebnisJSON(ergebenisJSON) {
    this.ergebnisJSON = ergebenisJSON;
  }

  getErgebnisJSON() {
    return this.ergebnisJSON;
  }
}
