import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import * as firebase from "firebase";
/**
 * Generated class for the CameraselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cameraselect2',
  templateUrl: 'cameraselect2.html',
})
export class Cameraselect2Page {
  // imagePicker:any;
  flag:any;
  load:any;
  key:any;
  lloading:any;
  constructor(private imagePicker: ImagePicker,private camera: Camera,public loading:LoadingController,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
this.key=this.navParams.get("key");
  }

  getSinglevideo(){

    const options2: CameraOptions = {
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.ALLMEDIA,
    }

    this.camera.getPicture(options2).then((results) => {
      console.log(results);


      this.lloading = this.loading.create({
        spinner: 'hide',
        content: 'Loading Please Wait'
      });
      this.lloading.present();

      console.log('upload video start!!!!!')
      console.log(results);
      (window as any).resolveLocalFileSystemURL("file://"+results,FE=>{
        console.log(FE);
        FE.file(file=>{
          console.log(file);
          const FR=new FileReader()
          FR.readAsArrayBuffer(file)
          console.log(FR);

          FR.onloadend=((res:any)=>{
            console.log(res);
            let AF=res.target.result;
            console.log(AF);
            let blob=new Blob([new Uint8Array(AF)],{type:'video/mp4'});
            console.log(blob);
            firebase.storage().ref().child("videos").child(this.key).put(blob).then((e)=>{
              firebase.storage().ref().child("videos").child(this.key).getDownloadURL().then((url)=>{
                console.log('upload video end!!!!')
                if(this.lloading!=undefined){
                  this.lloading.dismiss()
                }
                console.log(url);
                this.viewCtrl.dismiss({'data':url,"flag":"videos"});
              })

            })
          })
        })
      }).catch(err=>{
        if(this.lloading!=undefined){
          this.lloading.dismiss()
        }
      })
    }, (err) => {
      this.viewCtrl.dismiss({"flag":"false","data":undefined})
    });
  }


  getSinglePhoto(){
    //gallery

    console.log("single photo come");
    const options3 = {
      // max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 1,
      quality: 100,
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 1200,
      height: 1200,
      outputType:1

      // quality of resized image, defaults to 100
    };
    console.log(this.imagePicker)
    console.log("gogo");
    this.imagePicker.getPictures(options3).then((results) => {
      console.log("getpic is : "+results);

      if(results=="ok"){
        this.imagePicker.getPictures(options3).then((results) => {
          console.log("getpic22 is : "+results);
        });


      }else{

        this.viewCtrl.dismiss({'data':results,"flag":"single"});
      }

      // if(results=="OK"){
      //   window.alert("loading")

      //   setTimeout(()=>{

      //       this.viewCtrl.dismiss({"flag":"multi","data":results[0]});

      //   },500)

      // }else{
      //   this.viewCtrl.dismiss({"flag":"signle","data":results[0]});
      // }

    }, (err) => {
      console.log(err);
     window.alert(err)
    });
  }

  takePhoto(){
    try{
      console.log("sss")
      const options : CameraOptions={
        quality:50,
        targetHeight:600,
        targetWidth:600,
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType:this.camera.DestinationType.DATA_URL,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE
      }
      const result= this.camera.getPicture(options).then(imagedata=>{
        console.log("get picture done");
        console.log(imagedata);
        var temp=[];
        temp[0]=imagedata;
        this.viewCtrl.dismiss({'data':temp,"flag":"picture"});
      })
    }catch(e){

      window.alert(e);
      this.viewCtrl.dismiss({"flag":"false","data":undefined})
    }
  }

  ionViewDidLoad() {

  }
  confirm(){
    this.viewCtrl.dismiss();
  }

}
