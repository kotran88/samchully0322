import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CompletePage } from '../complete/complete';

/**
 * Generated class for the ViewdatapagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-viewdatapage',
  templateUrl: 'viewdatapage.html',
})
export class ViewdatapagePage {

  engineer_id='';
  title='';
  list=[];
  noarray=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.engineer_id=this.navParams.get('engineer_id');
    this.title=this.navParams.get('title');
    this.list=this.navParams.get('list');

    this.list.sort((a, b)=>{
      if(a.receipt_number<b.receipt_number||!a.receipt_number){return 1;}
      else if(a.receipt_number>b.receipt_number||!b.receipt_number){return -1;}
      else return 0;
    })
    for(var i in this.list){
      this.remain_time(i,this.list[i].due_date,this.list[i].due_time)
    }
    console.log(this.list);
  }

  remain_time(key,date,time){
    var due=new Date(date);
    var now=new Date();

    if(time&&time!=''){
      due.setHours(time.split(':')[0],time.split(':')[1]);
    }

    var data=due.getTime()-now.getTime();
    data=Math.floor(data/3600000);
    if(data==NaN) data=0;
    console.log(data);

    if(data<0){
      data=Math.abs(data);
      this.list[key].remain_flag="min"
      this.list[key].remain_text=data+'시간 지났습니다.'
    }
    else if(data>0){
      this.list[key].remain_flag="pls"
      this.list[key].remain_text=data+'시간 남았습니다.'
    }
    else{
      this.list[key].remain_flag=""
      this.list[key].remain_text=''
    }

  }

  detail(list) {
    console.log("detail click");
    console.log(list);
    //0303 접수건 눌렀을경우 dismiss로 가서 수정 
    // if(this.title=="현재접수"){
    //   console.log("goto dismiss")
    //   this.viewCtrl.dismiss(list)
    // }
    // else{
      console.log(list + ",," + list.receipt_number);
      console.log(list)
      this.navCtrl.push(CompletePage, { "list": list, "id": this.engineer_id, "no": list.receipt_number });
    }
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewdatapagePage');
  }

}
