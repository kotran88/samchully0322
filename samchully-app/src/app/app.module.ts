import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import firebase from 'firebase';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { OnoffutilProvider } from '../providers/onoffutil/onoffutil';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation/';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Cameraselect2Page } from '../pages/cameraselect2/cameraselect2';
import { HomePage } from '../pages/home/home';
import { CompletePage } from '../pages/complete/complete';
import { GongjiPage } from '../pages/gongji/gongji';
import { DetailgongjiPage } from '../pages/detailgongji/detailgongji';
import { DrawingPage } from '../pages/drawing/drawing';
import { ViewdatapagePage } from '../pages/viewdatapage/viewdatapage';
var firebaseConfig = {
  apiKey: "AIzaSyBRNKViuf66WJ0FmTOAjXgj3ZVEiMUFYmA",
  authDomain: "samchully-21458.firebaseapp.com",
  databaseURL: "https://samchully-21458.firebaseio.com",
  projectId: "samchully-21458",
  storageBucket: "samchully-21458.appspot.com",
  messagingSenderId: "698758284667",
  appId: "1:698758284667:web:83ca3fe9faef0350a0e9de",
  measurementId: "G-98DZ1840GP"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    Cameraselect2Page,
    HomePage,
    CompletePage,
    GongjiPage,
    DetailgongjiPage,
    DrawingPage,
    ViewdatapagePage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    Cameraselect2Page,
    HomePage,
    CompletePage,
    GongjiPage,
    DetailgongjiPage,
    DrawingPage,
    ViewdatapagePage
   
  ],
  providers: [
    AngularFireAuth,
    Camera,
    PhotoViewer,
    Geolocation,
    ImagePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    OnoffutilProvider,
  ]
})
export class AppModule { }
