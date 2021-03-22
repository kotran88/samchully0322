import { Component } from '@angular/core';
import { Platform, App, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  allowClose=false;

  constructor(public toastCtrl:ToastController, platform: Platform,public app:App) {
    platform.ready().then(() => {
      // statusBar.styleDefault();
      // splashScreen.hide();
    });

    platform.registerBackButtonAction(() => {

      let navv = app.getActiveNav();
      const overlay = this.app._appRoot._overlayPortal.getActive();
      if (navv.getActive().component.name == "HomePage") {

        var local_page=localStorage.getItem('local_page');

        console.log(navv.getActive())
        if(local_page!='home'){
          // alert(local_page);
          navv.setRoot(HomePage,{id:localStorage.getItem('id')})
        }
        else if(!this.allowClose){
          this.allowClose = true;
          let toast = this.toastCtrl.create({
            message: "한번 더 누르면 종료됩니다.",
            duration: 2000,
            dismissOnPageChange: true
          });
          toast.onDidDismiss(() => {
            this.allowClose = false;
          });
          toast.present();
        }
        else{
          platform.exitApp();
        }

      }
      else{
        navv.pop();
      }
    });
  }
}

