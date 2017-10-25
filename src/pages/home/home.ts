import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectorRef } from '@angular/core';
import { SearchServiceProvider } from '../../providers/search-service/search-service';
import * as xml2js from 'xml2js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  matches: String[];
  isRecording = false;
  url: any;

  constructor(public navCtrl: NavController,
              private speechRecognition: SpeechRecognition,
              private plt: Platform,
              private cd: ChangeDetectorRef,
              private searchServiceProvider: SearchServiceProvider ) { }

  isIos() {
    return this.plt.is('ios');
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }

  startListening() {
    let options = {
      language: 'en-US'
    };
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();

      this.searchForKeyword("point+restauration+carmes");
    });
    this.isRecording = true;

  }

  searchForKeyword(value) {
    var parser = xml2js.Parser({explicitArray : false});

    this.searchServiceProvider.searchMichelin(value).subscribe(
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
