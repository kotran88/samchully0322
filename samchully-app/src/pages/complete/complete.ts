import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import * as $ from 'jquery';
import firebase, { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HomePage } from '../home/home';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Cameraselect2Page } from '../cameraselect2/cameraselect2';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DrawingPage } from '../drawing/drawing';
/**
 * Generated class for the CompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-complete',
  templateUrl: 'complete.html',
})
export class CompletePage {
  firemain = firebase.database().ref();

  flagflag='';

  mypicref:any;
  list:any;
  engineer_id = "";
  key:any;
  info_flag = 0;
  number: any;
  broken: any;
  subname: any;
  date_format: any;

  date = new Date();

  videourl:any=""
  videourl2:any=""

  flag7_broken = "";
  flag7_complete = "";
  flag7_yet = "";

  error_code: any;
  complete_code: any;
  unprocess_code: any;

  imageurl:any="";
  imageurl2:any="";
  imageurl3:any=""; // 고객 서명
  lloading:any;
  errorlist=[];

  geolocate_latitude=0;
  geolocate_longitude=0;
  geolocate_time:any;

  constructor(public geolocation:Geolocation,
    public photoViewer:PhotoViewer,public loading:LoadingController,public modal:ModalController,public navCtrl: NavController, public navParams: NavParams, public camera: Camera,public imagePicker:ImagePicker) {
    // this.takephoto();

    this.list = this.navParams.get("list");
    console.log(this.list);

    if(this.navParams.get('flag')){
      this.flagflag=this.navParams.get('flag')
    }

    this.mypicref=firebase.storage().ref("abc");
    this.error_code=this.list.error_code;
    this.firemain.child('error').once('value').then((snap)=>{
      for(var i in snap.val()){
        this.errorlist.push(snap.val()[i]);
      }
    });
    console.log(this.list)

    console.log(this.list);
    if(!this.list.complete_code) this.list.complete_code="";
    if(!this.list.unprocess_code) this.list.unprocess_code="";
    if(!this.list.complete_text) this.list.complete_text="";
    if(!this.list.yet_text) this.list.yet_text="";

    if(this.list.image1){
      this.imageurl=this.list.image1;
      this.videourl='';
      console.log('imageurl : ',this.imageurl)
    }
    else if(this.list.video1){
      this.videourl=this.list.video1;
      this.imageurl='';
      console.log('videourl : ',this.videourl)
    }

    if(this.list.image2){
      this.imageurl2=this.list.image2;
      this.videourl2='';
      console.log('imageurl2 : ',this.imageurl2)
    }
    else if(this.list.video2){
      this.videourl2=this.list.video2;
      this.imageurl2='';
      console.log('videourl2 : ',this.videourl2)
    }

    this.key = this.navParams.get("no");
    console.log(this.key);
    this.engineer_id = this.navParams.get("id");
    this.date_format = this.str_format(this.date.getFullYear(), 4) + "" + this.str_format(this.date.getMonth() + 1, 2) + "" + this.str_format(this.date.getDate(), 2);
    console.log(this.list);
    for (var data in this.list) {
      if (data == 'num') { this.number = this.list[data] }
      if (data == 'broken') { this.broken = this.list[data] }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletePage');
  }

  str_format(text, len) {
    text = String(text);
    for (var i = text.length; i < len; i++) {
      text = '0' + text;
    }
    return text;
  }

  info_display() {
    console.log(this.info_flag);
    if (this.info_flag % 2 == 0) {
      $('.info').css('display', 'block');
    } else {
      $('.info').css('display', 'none');
    }
    this.info_flag++;
  }

  //자동 하이픈
  phone_replace(phone) {
    phone = phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
    return phone;
  }

  receipt(){
    console.log('receipt');
    console.log(this.key);

    if(this.geolocate_time==undefined) this.geolocate_time='';

    this.list.status="처리진행";
    this.firemain.child("engineer").child(this.list.engineerID.split("@")[0]).child("currentReceipt")
      .child(this.key).update(this.list)
    .then(()=>{
      this.firemain.child("engineer").child(this.list.engineerID.split("@")[0]).child("currentReceipt")
      .child(this.key).update({
        sign_data:{
          latitude : this.geolocate_latitude,
          longitude : this.geolocate_longitude,
          time : this.geolocate_time,
        }
      })
      window.alert("처리진행 상태로 변경되었습니다.")
      this.navCtrl.setRoot(HomePage,{id:this.engineer_id})
    })
  }

  complete() {
    if(this.geolocate_time==undefined) this.geolocate_time='';

    console.log(this.complete_code);
    console.log('complete');
    console.log(this.key);

    this.list.status="처리완료";
    this.firemain.child("engineer").child(this.list.engineerID.split("@")[0]).child("currentReceipt")
      .child(this.key).update(this.list)
    .then(()=>{
      this.firemain.child("engineer").child(this.list.engineerID.split("@")[0]).child("currentReceipt")
      .child(this.key).update({
        sign_data:{
          latitude : this.geolocate_latitude,
          longitude : this.geolocate_longitude,
          time : this.geolocate_time,
          signimage:this.imageurl3
        }
      })
      window.alert("처리완료 상태로 변경되었습니다.")
      this.navCtrl.setRoot(HomePage,{id:this.engineer_id})
    })
  }
  stand(){
    console.log('stand');
    console.log(this.key);

    if(this.geolocate_time==undefined) this.geolocate_time='';
    console.log(this.list);
    this.list.status="처리대기";
    this.firemain.child("engineer").child(this.list.engineerID.split("@")[0]).child("currentReceipt")
      .child(this.key).update(this.list)
    .then(()=>{
      this.firemain.child("engineer").child(this.list.engineerID.split("@")[0]).child("currentReceipt")
      .child(this.key).update({
        sign_data:{
          latitude : this.geolocate_latitude,
          longitude : this.geolocate_longitude,
          time : this.geolocate_time,
        }
      })
      window.alert("처리대기 상태로 변경되었습니다.")
      this.navCtrl.setRoot(HomePage,{id:this.engineer_id})
    })
  }

  sign(){
    
    this.lloading = this.loading.create({
      spinner: 'hide',
      content: 'Loading Please Wait'
    });
    this.lloading.present();

    this.geolocation.getCurrentPosition().then((resp) => {
      this.geolocate_latitude=resp.coords.latitude
      this.geolocate_longitude=resp.coords.longitude
      console.log(this.geolocate_latitude,this.geolocate_longitude);

      this.geolocate_time=new Date();

      this.navCtrl.push(DrawingPage).then(() => {
        this.lloading.dismiss();
        this.navCtrl.getActive().onDidDismiss(data => {
          console.log(data);
          if(data!=undefined){
            this.imageurl3=data.url;
          }
        });
      });


    })
  }

  takephoto(v){
    let modal = this.modal.create(Cameraselect2Page,{"key":this.key});
    modal.onDidDismiss(url => {
      console.log("url is..");
      console.log(url.flag);
      console.log(url.data);
      if(url.flag=="videos"){
        if(v==1){
          this.videourl=url.data;
          this.list.video1=this.videourl;
          this.imageurl='';
          this.list.image1='';
        }
        if(v==2){
          this.videourl2=url.data;
          this.list.video2=this.videourl2;
          this.imageurl2='';
          this.list.image2='';
        }
      }else{
        this.camera_asd(url,(callback)=>{
          console.log("get it from url ");
            console.log(callback);
          console.log(url);
          if(url.flag=="single"){

            if(v==1){
              this.imageurl=callback;
              this.list.image1=this.imageurl;

              this.videourl='';
              this.list.video1='';
            }else{
              this.imageurl2=callback;
              this.list.image2=this.imageurl2;
              this.videourl2='';
              this.list.video2='';
            }
          }
          else if(url.flag==='video'){

            console.log(url);
          }
          else if(url.flag=="picture"){

            if(v==1){
              this.imageurl=callback;
              this.list.image1=this.imageurl;
              this.videourl='';
            }else{
              this.imageurl2=callback;
              this.list.image2=this.imageurl2;
              this.videourl2='';
            }
          }

        });
      }


    })
    modal.present();
  }

  camera_asd(imagedata,callback){
    console.log("imagedataimagedataimagedata");
    console.log(imagedata);
    if(imagedata.data!=''&&imagedata.data){

      console.log(imagedata)
      this.lloading = this.loading.create({
        spinner: 'hide',
        content: 'Loading Please Wait'
      });
      this.lloading.present();
      this.uploadImage(imagedata,1,(imageurl)=>{
        this.lloading.dismiss()
        console.log("upload done");
        console.log(imageurl);
        callback(imageurl);

      });
    }
    else{
      if(this.lloading!=undefined){
        this.lloading.dismiss()
      }
    }
  }

  uploadImage(imageURI,index,callback){
    let storageRef = firebase.storage().ref();
    var result="image"+(index+1);
    console.log(imageURI);
    imageURI=  "data:image/png;base64," + imageURI.data;
    console.log("sssssssssss : "+result);
    console.log(imageURI);
    console.log("donE!!!!!!!!!!")
        var a = this.mypicref.child("aaa").child("bbbb")
    this.encodeImageUri(imageURI, (image64)=>{
      a.putString(image64, 'data_url')
      .then(snapshot => {
        console.log(snapshot);
        this.mypicref.child("aaa").child("bbbb").getDownloadURL().then((url)=>{
          // this.count++;
          console.log("download url is : "+url);
          callback(url);
          // this.photoarray.push(url);
          // if(this.numofimage==this.photoarray.length){
          //   this.lloading.dismiss()
          //   window.alert("사진업로드 완료!")
          //   this.view.dismiss({'data':this.photoarray})
          // }


        }).catch((e)=>{
          console.log('eeeee');
          console.log(e);
          if(this.lloading!=undefined){
            this.lloading.dismiss()
          }
        })
      }).catch((e)=>{
        console.log("error is....")
        window.alert(e);
        console.log(e);
        if(this.lloading!=undefined){
          this.lloading.dismiss()
        }
      })
    })
  }
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/png");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  photo_view(url){
    this.photoViewer.show(url);
  }

  goback() {
    this.navCtrl.pop();
  }

}
