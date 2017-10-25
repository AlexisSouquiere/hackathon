import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SearchServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchServiceProvider {

  constructor(public http: Http) {
    console.log('Hello SearchServiceProvider Provider');
  }

  searchMichelin(params) {
    let url = "http://1578fc05.ngrok.io/search?q=" + params + "&client=michelin01&output=xml_no_dtd";
    return this.http.get(url).map(res => res.text());
  }
}
