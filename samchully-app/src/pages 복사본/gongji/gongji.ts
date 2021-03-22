import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from "firebase";
import { DetailgongjiPage } from '../detailgongji/detailgongji';

/**
 * Generated class for the GongjiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gongji',
  templateUrl: 'gongji.html',
})
export class GongjiPage {

  lloading:any;
  gongjilist=[];

  firemain=firebase.database().ref();
  constructor(public navCtrl: NavController, public navParams: NavParams,public loading:LoadingController) {
    this.lloading = this.loading.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });
    this.lloading.present();
    this.firemain.child('gongji').once('value').then((snap)=>{
      for(var i in snap.val()){
        var data=snap.val()[i]
        // data.date=data.date.split('T')[0];
        this.gongjilist.push(data);
      }
      this.gongjilist.sort((a, b)=>{
        if(a.date<b.date||!a.date){return 1;}
        else if(a.date>b.date||!b.date){return -1;}
        else return 0;
      })
      console.log(this.gongjilist)
      this.lloading.dismiss()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongjiPage');
  }
  backaction(){
    this.navCtrl.pop();
  }
  detailgongji(gongji){
    console.log(gongji)
    var data=gongji;
    this.navCtrl.push(DetailgongjiPage,{gongji:data})
  }
}
