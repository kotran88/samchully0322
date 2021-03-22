import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform, LoadingController, Loading, AlertController, ActionSheetController, Alert, ToastController, Toast } from 'ionic-angular';
/*
  Generated class for the OnoffutilProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OnoffutilProvider {

  isAlert: boolean = false;
  isActionSheet: boolean = false;
  isLoading: boolean = false;
  isNotDismiss: boolean = false;

  alertObj: Alert;
  actionSheetObj;
  toastObj;
  loadingObj;
  constructor(    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public http: HttpClient) {
    console.log('Hello OnoffutilProvider Provider');
  }


  // 숫자형 3자리수마다 콤마 붙이기
  comma(n){
    var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
    n = String(n);    //숫자 -> 문자변환
    while(reg.test(n)){
      n = n.replace(reg, "$1" + "," + "$2");
    }
    return n;
  }

  // 콤마 제거하기
  uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
  }

  //-------------------------------------------------------------------


  //inappbrowser
  // gotoUrl(url:string, option = {}) {
  //   const browser = this.iab.create(url, '_blank', option);
  //   browser.on('loadstart').subscribe(
  //     (event) => {
  //       console.log('###### browser start ###### ');
  //       console.log(event);
  //       console.log('###### browser end ###### ');

  //       if(event.url == 'http://app://close' || event.url == 'app://close') {
  //         browser.close();
  //       }
  //     }
  //   );
  // }


  // 알림창 (다중 버튼일경우)
  alertBtns(title: string, content: string, btn: any): Alert {
    this.alertObj = this.alertCtrl.create({
        title: title,
        //subTitle: content,
        message : content,
        buttons: btn
      });

      // 중지
      this.alertObj.onDidDismiss(() => { this.isAlert = false; console.log('Alert 중지'); });

      this.isAlert = true;
      console.log('Alert 실행');

      this.alertObj.present();
      return this.alertObj;
  }

  // 알림창
  alert(title: string, content: string, btn: any = '확인'): Alert {
    this.alertObj = this.alertCtrl.create({
        title: title,
        //subTitle: content,
        message : content,
        buttons: [btn]
      });

      // 중지
      this.alertObj.onDidDismiss(()=>{ this.isAlert = false; console.log('Alert 중지'); });

      this.isAlert = true;
      console.log('Alert 실행');

      this.alertObj.present();
      return this.alertObj;
  }

  // 알림창
  alertDismissEnable(title: string, content: string, btn: any = '확인'): Alert {

    var btnAry;
    if(Array.isArray(btn)) {
      btnAry = btn;
    } else {
      btnAry = [btn];
    }

    this.alertObj = this.alertCtrl.create({
        title: title,
        //subTitle: content,
        message : content,
        enableBackdropDismiss : false,
        buttons: btnAry
      });

      // 중지
      this.alertObj.onDidDismiss(()=>{ this.isAlert = false; this.isNotDismiss = false; console.log('Alert 중지'); });

      this.isAlert = true;
      this.isNotDismiss = true;
      console.log('Alert 실행');

      this.alertObj.present();
      return this.alertObj;
  }

  actionSheet(title, btns) {
    this.actionSheetObj = this.actionSheetCtrl.create({
      title : title,
      buttons : btns
    });

    this.actionSheetObj.onDidDismiss(()=>{ this.isActionSheet = false; });

    this.isActionSheet = true;
    this.actionSheetObj.present();
  }
  // toast 메세지
  toast(msg, show=true): Toast {
    this.toastObj = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom'
    });
    if(show == true)
      this.toastObj.present();

    return this.toastObj;
  }

  // 로딩 띄우기
  loading(loadMsg: string = '데이터를 불러오고 있습니다.'): Loading {
    this.loadingObj = this.loadingCtrl.create({
      content: loadMsg
    });

    // 중지
    this.loadingObj.onDidDismiss(()=>{ this.isLoading = false; console.log('Loading 중지'); });

    this.isLoading = true; console.log('Loading 실행');

    // Loading 화면
    this.loadingObj.present();

    return this.loadingObj;
  }

//   getHttp(url: string, param: any = {}) {
//     if(param) {
//         param = (param);
//         url = url + "?" + param;
//     }

//     console.log(url);
//     // JSON 패치 문자열중 개행문자가 있을경우 오류 자체수정
//     //return this.http.get(url).map((res: Response) => res.json() );
//     return this.http.get(url).map((res: Response) => { return JSON.parse(this.jsonBeforeString(res['_body'])); } );
// }

// postHttp(url: string, param: any = {}) {
//     param = (param);
//     console.log(param);
//     let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded', 'Accept' : 'application/json' });
//     //let headers = new Headers({ 'Content-Type' : 'application/json' });
//     let options = new RequestOptions({ headers: headers });

//     // JSON 패치 문자열중 개행문자가 있을경우 오류 자체수정
//     //return this.http.post(url, param, options).map((res: Response) => res.json() );
//     return this.http.post(url, param, options).map((res: Response) => { return JSON.parse(this.jsonBeforeString(res['_body'])); } );
// }
}
