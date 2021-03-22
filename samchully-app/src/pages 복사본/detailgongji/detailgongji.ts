import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailgongjiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detailgongji',
  templateUrl: 'detailgongji.html',
})
export class DetailgongjiPage {

  gongjidata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gongjidata=this.navParams.get('gongji')
    this.gongjidata.text=this.gongjidata.text.replace(/(?:\r\n|\r|\n)/g, '<br>')
  }

  backaction(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailgongjiPage');
  }

}
