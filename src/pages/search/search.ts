import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchServiceProvider } from '../../providers/search-service/search-service'
import * as xml2js from 'xml2js';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private searchServiceProvider: SearchServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  searchForKeyword(event, key) {
    var parser = xml2js.Parser({explicitArray : false});

    this.searchServiceProvider.searchMichelin(event.target.value).subscribe(
      data => {
       this.getJSONUrl(data, parser).then((url) =>  {this.url = url});
      }
    );
  }

  getJSONUrl(xmlText, parser){
    return new Promise(function(resolve,reject){
      parser.parseString(xmlText,function(err,result){
        if(!err){
          resolve(result.GSP.RES.R[0].U);
        }else{
          reject(err);
        }
      })
    })
  }

}
