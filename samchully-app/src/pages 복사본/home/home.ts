import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import * as $ from 'jquery';
import firebase from 'firebase';
import { CompletePage } from '../complete/complete';
import { OnoffutilProvider } from '../../providers/onoffutil/onoffutil';
import { GongjiPage } from '../gongji/gongji';
import { ViewdatapagePage } from '../viewdatapage/viewdatapage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  firemain = firebase.database().ref();

  all_receipt_list=[];
  today = new Date();
  date: any;
  flag = 1;

  errorlist=[];
  current_boru_count = 0;

  engineer_id = "";
  agency_name = "";
  engineer_name = "";
  engineer_position = "";
  agency_code = "";

  as_data = [];//전체내역
  as_receipt_data = [];//접수내역
  as_request_data = [];//요청내역
  as_complete_data = [];//완료내역
  as_hold_data = [];//보류내역
  as_waiting_data = [];//보류내역

  new_date = new Date();
  remain_time = "";
  today_Date = "";
  max_Date = "";
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  currentHour: any;
  currentMinute: any;
  schedule_title: any;

  current_recipt = [];
  current_recipt_count = 0;
  current_request_count = 0;
  current_progress_count = 0;
  current_complete_count = 0;
  current_waiting_count = 0;

  flag2_arr = [];
  flag2_receipt_num = "";
  flag2_name = "";
  flag2_remote: any;
  flag2_status: any;
  flag2_error = "";
  flag2_contents = "";
  flag2_division: any;
  flag2_date: any;
  flag2_time: any;
  flag2_view_list = [];

  flag3_sort_ch='접수시간내림';

  noarray = [];
  flag6_name = "";
  flag6_engineer = "";
  flag6_phone = "";
  flag6_store = "";
  flag6_sub_store = "";
  flag6_call = "";
  flag6_address = "";
  flag6_product = "";
  flag6_model = "";
  flag6_guarantee: any;
  flag6_repairlist=[];

  flag6_product_totallist=[];
  flag6_modellist=[];
  flag6_productlist=[];

  flag7_searchlist = [];
  flag7_searchtext = '';
  flag7_search_ch='';

  flagflag=false;

  searching_flag=false;

  load:any;
  flag4_info = [];
  asdasdasd=847000;
  constructor(public loading:LoadingController,public navCtrl: NavController, public navParams: NavParams, public util: OnoffutilProvider) {
    this.flag = 1;
    localStorage.setItem('local_page','home');

    this.today_Date = this.new_date.getFullYear() + '-' + (this.new_date.getMonth() + 1) + '-' + this.new_date.getDate();
    this.max_Date = (this.new_date.getFullYear() + 5) + '-' + (this.new_date.getMonth() + 1) + '-' + this.new_date.getDate();
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    localStorage.setItem('once_login','false')
    this.engineer_id = this.navParams.get("id");
    console.log(this.engineer_id);

    // this.engineer_id = "test2@gmail.com";
    var current_recipt_arr = [];
    var current_progress_arr = [];
    var current_complete_arr = [];
    var current_waiting_arr = [];
    var current_defer_arr = [];

    this.firemain.child('error').once('value').then((snap)=>{
      console.log(snap.val())
      for(var i in snap.val()){
        // console.log(snap.val()[i]);
        this.errorlist.push(snap.val()[i]);
        this.flag2_error="20";

      }
    });

    this.firemain.child('product').once('value').then((snap)=>{
      console.log(snap.val())
      for(var i in snap.val()){
        this.flag6_product_totallist.push(snap.val()[i])
      }
    })

    this.firemain.child("engineer").once("value", (sn) => {
      console.log(sn.val());
      for(var a in sn.val()){
        if (a == this.engineer_id.split("@")[0]) {
          this.agency_name = sn.val()[a].agency;
          this.engineer_name = sn.val()[a].name;
          this.engineer_position = sn.val()[a].position;
          break;
        }
      }
      if(this.agency_name==''){
        alert('사용자가 해당되는 대리점이 없습니다.')
        this.navCtrl.setRoot(LoginPage);
      }
      for (var engineer in sn.val()) {
        if(this.agency_name=="(주)삼천리ES"||this.agency_name=="본사"||
        sn.val()[engineer].agency==this.agency_name) {
          for(var i in sn.val()[engineer].currentReceipt){
            if(sn.val()[engineer].currentReceipt[i].error_code==""||
            !sn.val()[engineer].currentReceipt[i].error_code)
              sn.val()[engineer].currentReceipt[i].error_code="empty_code"

            if(sn.val()[engineer].currentReceipt[i].receipt_content==""||
            !sn.val()[engineer].currentReceipt[i].receipt_content)
              sn.val()[engineer].currentReceipt[i].receipt_content="empty_text"
          }


          if(sn.val()[engineer].schedule){
            for (var info in sn.val()[engineer].schedule) {
              if (sn.val()[engineer].schedule[info].date) {
                localStorage.setItem('once_login','false')
                this.flag4_info.push(sn.val()[engineer].schedule[info]);
                for(var i in sn.val()[engineer].currentReceipt){
                  if(sn.val()[engineer].currentReceipt[i].due_date
                  ==this.flag4_info[this.flag4_info.length-1].date&&
                  sn.val()[engineer].currentReceipt[i].customer
                  ==this.flag4_info[this.flag4_info.length-1].place)
                    this.flag4_info[this.flag4_info.length-1].receipt_date
                    =sn.val()[engineer].currentReceipt[i].receipt_number;
                }
              }
            }
          }

          for (var list in sn.val()[engineer].currentReceipt) {

            var data=sn.val()[engineer].currentReceipt[list];
            data.engineerID=sn.val()[engineer].id;

            this.all_receipt_list.push(data)
            if(sn.val()[engineer].currentReceipt[list].status=="승인완료"
            ||sn.val()[engineer].currentReceipt[list].status=="승인요청"
            ||sn.val()[engineer].currentReceipt[list].status=="처리완료"){
              this.as_complete_data.push(data);
            }
            else if(sn.val()[engineer].currentReceipt[list].status=="승인보류"){
              this.as_hold_data.push(data);
            }
            else if(sn.val()[engineer].currentReceipt[list].status=="처리진행"
            // ||sn.val()[engineer].currentReceipt[list].status=="처리완료"
            ){
              this.as_request_data.push(data);
            }
            else if(sn.val()[engineer].currentReceipt[list].status=="처리대기"){
              this.as_waiting_data.push(data)
            }
            else{
              //접수
              this.as_receipt_data.push(data);
            }

            for (var detail in sn.val()[engineer].currentReceipt[list]) {
              // console.log("detail is : " + detail);
              console.log(detail)
              if (detail == "status") {
                console.log(sn.val()[engineer].currentReceipt[list][detail])
                var status = sn.val()[engineer].currentReceipt[list][detail];
                if (status == "접수") {
                  current_recipt_arr.push(sn.val()[engineer].currentReceipt[list]);
                  this.current_recipt_count++;
                }
                //접수 처리완료랑 처리진행은 같으므로 처리진행으로 침.  승인완료, 보류  - 처리진행이랑 같음.
                if (status == "처리진행") {
                  current_progress_arr.push(sn.val()[engineer].currentReceipt[list]);
                  this.current_progress_count++;
                }
                if (status == "승인완료"||status == "승인요청"||status == "처리완료") {
                  current_complete_arr.push(sn.val()[engineer].currentReceipt[list]);
                  this.current_request_count++;
                }
                if (status == "승인보류") {
                  current_defer_arr.push(sn.val()[engineer].currentReceipt[list]);
                  this.current_boru_count++;
                }
                if(status == "처리대기") {
                  current_waiting_arr.push(sn.val()[engineer].currentReceipt[list]);
                  this.current_waiting_count++;
                }

              }
              // for (var detail_list in sn.val()[engineer].currentReceipt[list][detail]) {
              //   //
              //   this.as_data.push(sn.val()[engineer][detail][detail_list]);
              // }
            }
            // console.log(this.noarray);
            // console.log(engineer);
            this.noarray.push(engineer)
            // console.log(this.as_receipt_data);
            // console.log(this.noarray);

            if (engineer == "receipt") {
              console.log(this.as_receipt_data);
            }
            if (engineer == "complete") {//완료내역
              for (var as_complete in sn.val()[engineer]) {
                for (var as_complete_detail_list in sn.val()[engineer][as_complete]) {
                  this.as_complete_data.push(sn.val()[engineer][detail][as_complete_detail_list]);
                }
              }
            }
            if (engineer == "hold") {//보류내역
              for (var as_hold in sn.val()[engineer]) {
                for (var as_hold_detail_list in sn.val()[engineer][as_hold]) {
                  this.as_hold_data.push(sn.val()[engineer][detail][as_hold_detail_list]);
                }
              }
            }
          }
        }
      }
    }).then(() => {
      console.log(this.flag4_info);
      if(this.agency_name.length==0){

        localStorage.setItem('login_flag','false')
        this.navCtrl.setRoot(LoginPage);
        return;
      }else{
        this.firemain.child("agency").child(this.agency_name).once("value", (sn) => {
          this.agency_code = sn.val().code;
        })
      }

      //접수 , 처리진행 ,승인완료(처리진행) , 처리대기, 보류 ,
      // this.firemain.child("engineer").child(this.engineer_id.split("@")[0]).child("currentReceipt").once("value", (sn) => {
      //   console.log(sn.val())
        this.flag3_sorting();
        console.log(this.all_receipt_list);

        console.log(this.current_recipt_count);
        console.log(this.current_progress_count);
        console.log(this.current_request_count);
        console.log(this.current_boru_count);
      })
    // })
  }

  foot_icon_switching(num) {
    if (num == 1) {
      this.flag = 1;
      localStorage.setItem('local_page','home');
      $('#switching1').css("color", "#e96a15");
      $('#switching2, #switching3, #switching4, #switching5').css("color", "#6e6e6e");
    }
    if (num == 2) {
      this.flag = 2;
      localStorage.setItem('local_page','jubsu');
      $('#switching2').css("color", "#e96a15");
      $('#switching1, #switching3, #switching4, #switching5').css("color", "#6e6e6e");
      this.flag2_receipt_num = this.str_format(this.currentYear,4) + '' + this.str_format(this.currentMonth,2) + '' + this.str_format(this.currentDate,2) + '' + this.str_format(this.currentHour,2) + '' + this.str_format(this.currentMinute,2) + '' + this.agency_code;
      console.log(this.flag2_receipt_num);
    }
    if (num == 3) {
      this.flag = 3;
      localStorage.setItem('local_page','aschuri');
      $('#switching3').css("color", "#e96a15");
      $('#switching1, #switching2, #switching4, #switching5').css("color", "#6e6e6e");
    }
    if (num == 4) {
      this.flag = 4;
      localStorage.setItem('local_page','schedule');
      $('#switching4').css("color", "#e96a15");
      $('#switching1, #switching2, #switching3, #switching5').css("color", "#6e6e6e");
    }
    if (num == 5) {
      this.flag = 5;
      localStorage.setItem('local_page','mypage');
      $('#switching5').css("color", "#e96a15");
      $('#switching1, #switching2, #switching3, #switching4').css("color", "#6e6e6e");
    }
  }

  flag3_sorting(){
    console.log("flag3_sorting");
    var ch=$("#flag3-condition").val();
    console.log(ch);

    if(!ch||ch=='접수시간내림'){
      this.all_receipt_list.sort((a,b)=>{
        if(a.receipt_number<b.receipt_number){return 1;}
        else if(a.receipt_number>b.receipt_number){return -1;}
        else return 0;
      })
    }
    else{
      this.all_receipt_list.sort((a,b)=>{
        if(a.receipt_number>b.receipt_number){return 1;}
        else if(a.receipt_number<b.receipt_number){return -1;}
        else return 0;
      })
    }
  }

  get_fixlist(text){
    console.log(text);
    this.flag6_repairlist=[];
    this.firemain.child('engineer').once('value').then((snap)=>{
      for(var i in snap.val()){
        if(snap.val()[i].currentReceipt){
          for(var j in snap.val()[i].currentReceipt){
            if(snap.val()[i].currentReceipt[j].customer==text){
              this.flag6_repairlist.push(snap.val()[i].currentReceipt[j])
            }
          }
        }
      }
      console.log(this.flag6_repairlist);
    })
  }

  ionViewWillEnter() {
    this.date = new Date();
    this.getDaysOfMonth();
    this.schedule_title = this.monthNames[this.new_date.getMonth()];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage')
    $("#f7_search_input").on("change keyup paste", () => {
      var val = $(this).val();
      console.log(val);
      if (val != "") { $("#f7_search_result").hide(); }
      else { $("#f7_search_result").show(); }
      var searching = $("#f7_search_result:contains('" + val + "')");
      $(searching).parent().show();
    })
    window.addEventListener('keyboardWillShow', (e) => {
      console.log('keyboard show!!!')
      $(".main-footer").hide();
    });
    window.addEventListener('keyboardWillHide', () => {
      console.log('keyboard hide!!!')
      $(".main-footer").show();
    });
  }
  look_up(text) {
    console.log(text);
    if (text != "") { $(".f7_result").hide(); }
    else { $(".f7_result").show(); }
    var searching = $(".f7_result:contains('" + text + "')");
    $(searching).show();
  }

  flag7_resultget(data){
    this.flag = 6;
    localStorage.setItem('local_page','customer_get');
    console.log(data);

    if (this.flag7_search_ch === "customer"){
      console.log(this.flag7_search_ch)
      this.flag6_name=data.name;
      this.flag6_address=data.address;

      this.flag6_modellist=[];
      this.flag6_productlist=[];
      this.flag6_product_totallist=[];
      for(var i in data.product){
        console.log(data);
        this.flag6_productlist.push(data.product[i].serial)
        this.flag6_product_totallist.push(data.product[i])
      }
      this.flag6_product=this.flag6_productlist[0];
      this.flag6_modelchange();
      this.flag6_model=this.flag6_modellist[0];
      console.log(this.flag6_modellist)
      console.log(this.flag6_productlist)
      console.log(this.flag6_product_totallist)
      console.log(this.flag6_model)
      console.log(this.flag6_product)

      // flag6_repairlist
      this.get_fixlist(data.name);
    }

  }
  search_cancel(){
    this.flag = 6;
    localStorage.setItem('local_page','customer_get');
  }

  flag6_modelchange(){
    this.flag6_modellist=[];
    for(var i in this.flag6_product_totallist){
      if(this.flag6_product_totallist[i].serial==this.flag6_product){
        this.flag6_modellist.push(this.flag6_product_totallist[i].model);
      }
    }
  }
  selectChange(a){
    console.log("////"+a);
    this.flag2_error=a;
  }

  flag6_searching(key) {
    this.load= this.loading.create({
      content: '고객 데이터 조회중'
    });

    this.load.present();
    this.flag7_search_ch=key;
    console.log(key);
    var root: any;

    if (key === "customer") root = this.firemain.child('customer')
    else if (key === "engineer") root = this.firemain.child('engineer')
    else if (key === "phone") root = this.firemain.child('engineer')
    else if (key === "store") root = this.firemain.child('customer')
    else if (key === "sub_store") root = this.firemain.child('customer')
    else if (key === "call") root = this.firemain.child('agency').child(this.agency_name)
    else if (key === "address") root = this.firemain.child('agency').child(this.agency_name)


    root.once('value').then((snap) => {
      console.log(snap.val())
      console.log(this.agency_name)
      this.flag7_searchlist = [];
      this.flag7_searchtext = '';
      for (var i in snap.val()) {
        if (key === 'customer') {
          if(!this.flag6_name||this.flag6_name==''){
            this.flag7_searchlist.push(snap.val()[i])
          }
          else if(String(snap.val()[i].name).indexOf(this.flag6_name)>-1){
            this.flag7_searchlist.push(snap.val()[i])
          }
        }
        else if (key === 'engineer' && snap.val()[i].agency === this.agency_name) {
          this.flag7_searchlist.push(snap.val()[i].name)
        }
        else if (key === "phone" && snap.val()[i].agency === this.agency_name) {
          this.flag7_searchlist.push(snap.val()[i].phone)
        }
        else if (key === "store") {
          this.flag7_searchlist.push(snap.val().name)
          break;
        }
        else if (key === "sub_store") {
          this.flag7_searchlist.push(snap.val().code)
          break;
        }
        else if (key === "call") {
          this.flag7_searchlist.push(snap.val().call)
          break;
        }
        else if (key === "address") {
          this.flag7_searchlist.push(snap.val().address)
          break;
        }
      }
      console.log(this.flag7_searchlist)
      this.flag = 7;
      localStorage.setItem('local_page','search');

      this.load.dismiss();
    })
  }

  flag2_add() {
    this.flag = 6;
    localStorage.setItem('local_page','customer_get');
  }

  flag2_view() {
    console.log(this.flag6_name);
    console.log(this.flag6_model);
    if (this.flag6_name == "") { window.alert("업체명을 입력하세요.") }
    else {
      //완료코드 생기면
      // this.firemain.child("customer")
    }
  }

  go_detail(num,list){
    if(num==1){
      this.flagflag=true;
      this.foot_icon_switching(2);
      this.flag2_receipt_num=list.receipt_number;

      document.querySelector('input[name="remote"]:checked')
      if(list.remote_divisition=="가능"){$('input:radio[name="remote"]:input[value="가능"]').attr("checked");}
      else{$('input:radio[name="remote"]:input[value="불가능"]').attr("checked");}
      $('input:radio[name="status"]:input[value="예스파트너"]').attr("checked");
      $('input:radio[name="status"]:input[value="'+list.receipt_type+'"]').attr("checked");

      this.flag2_name=list.customer;
      if(!this.flag2_name) this.flag2_name='';

      this.flag2_error=list.error_code;
      if(!this.flag2_error) this.flag2_error='';

      this.flag2_contents=list.receipt_content;
      if(!this.flag2_contents) this.flag2_contents='';

      this.flag6_name=list.customer;
      if(!this.flag6_name) this.flag6_name='';

      this.flag6_engineer=this.engineer_name;
      if(!this.flag6_engineer) this.flag6_engineer='';

      this.flag6_phone=list.phone;
      if(!this.flag6_phone) this.flag6_phone='';

      this.flag6_sub_store=list.assigned_company;
      if(!this.flag6_sub_store) this.flag6_sub_store='';

      this.flag6_call=list.call;
      if(!this.flag6_call) this.flag6_call='';

      this.flag6_address=list.adress;
      if(!this.flag6_address) this.flag6_address='';

      this.flag6_product=list.product_name;
      if(!this.flag6_product) this.flag6_product='';

      this.flag6_model=list.product_model;
      if(!this.flag6_model) this.flag6_model='';


      this.flag=2;
    }
    else{
      this.navCtrl.push(CompletePage, { "list": list, "id": this.engineer_id, "no": list.receipt_number });
    }
  }

  go_viewdatapage(title,data){
    this.navCtrl.push(ViewdatapagePage,
      {
        engineer_id:this.engineer_id,
        title:title,
        list:data,
      }
    )
    .then(()=>{
      if(title=="현재접수"){
        this.navCtrl.getActive().onDidDismiss((data)=>{
          console.log(data);

          if(data){
            this.detail(data,data.receipt_number);
          }
        })
      }
    })
  }

  flag2_save() {
    this.flag2_remote = document.querySelector('input[name="remote"]:checked');
    this.flag2_status = document.querySelector('input[name="status"]:checked');
    this.flag2_division = document.querySelector('input[name="division"]:checked');
    var flag2_agency = "";
    var engineer_receipt = 0;
    var engineer_complete = 0;
    var agency_receipt = 0;
    var agency_complete = 0;
    var customer_num = "";
    console.log(this.flag2_date);
    console.log("undefined???");
    console.log(this.flag2_error);

    var status="처리진행"
    if (this.flag2_date == undefined) {
      this.flag2_date="";
      this.flag2_time="";
      // window.alert("작업일을 입력해주세요")////달력 선택
      status="접수"
      // return;
    }
    else if(this.flag2_time==undefined){
      alert('처리예정시간을 입력해주세요.');
      return;
    }
    console.log(status);

    console.log(this.flag2_name);
    if(this.flag6_store==undefined||this.flag6_store==""){
      this.flag6_store=this.flag2_name;
    }
    console.log(this.flag6_store);
    if (!this.flag6_guarantee) this.flag6_guarantee = { value: '', };

    console.log(this.flag6_guarantee);

    if(this.flagflag){
      this.firemain.child("engineer").child(this.engineer_id.split("@")[0]).once("value", (sn) => {

        for (var i in sn.val()) {
          if (i == "agency") { flag2_agency = sn.val()[i]; }
          if (i == "cntCurrentReceipt") { engineer_receipt = sn.val()[i]; }
          if (i == "cntCurrentComplete") { engineer_complete = sn.val()[i]; }
        }
        this.firemain.child("engineer").child(this.engineer_id.split("@")[0]).update({
          "cntCurrentReceipt": engineer_receipt + 1
        })
        if(flag2_agency==undefined){

        }else{
          this.firemain.child("agency").child(flag2_agency).once("value", (sn) => {
            for (var i in sn.val()) {
              if (i == "currentReceipt") { agency_receipt = sn.val()[i]; }
              if (i == "currentComplete") { agency_complete = sn.val()[i]; }
            }
            this.firemain.child("agency").child(flag2_agency).update({
              "currentReceipt": agency_receipt + 1,
              // "currentComplete": agency_complete + 1
            })
          })
        }

      })
      this.flagflag=false;
    }

    if(this.flag6_store==''){
      this.flag6_store=this.flag2_name;
    }
    console.log(this.flag6_store)
    this.firemain.child("customer").child(this.flag6_store).once("value", (sn) => {
      for (var i in sn.val()) {
        if (i == "no") { customer_num = sn.val()[i]; }
      }

      console.log(this.flag2_error);

      this.firemain.child("customer").child(this.flag6_store).child("history").child(this.flag2_receipt_num).update({
        "customer_receiptionist": this.flag2_name, "remote_division": this.flag2_remote.value,
        "error_code": this.flag2_error, "receipt_content": this.flag2_contents,
        "due_date": this.flag2_date, "due_time": this.flag2_time, "as_applicant": this.flag6_engineer, "as_applicant_phone": this.flag6_phone,
        "customer": this.flag6_store, "customer_building": this.flag6_sub_store, "address": this.flag6_address,
        "product_name": this.flag6_product, "product_model": this.flag6_model, "warranty": this.flag6_guarantee.value,
        "status": status, "assigned_company": flag2_agency, "no": customer_num, "receipt_number": this.flag2_receipt_num,
        "receipt_type": this.flag2_division.value
      })
      this.firemain.child("engineer").child(this.engineer_id.split("@")[0]).child("currentReceipt").child(this.flag2_receipt_num).update({
        "customer_receiptionist": this.flag2_name, "remote_division": this.flag2_remote.value,
        "error_code": this.flag2_error, "receipt_content": this.flag2_contents,
        "due_date": this.flag2_date, "due_time": this.flag2_time, "as_applicant": this.flag6_engineer, "as_applicant_phone": this.flag6_phone,
        "customer": this.flag6_store, "customer_building": this.flag6_sub_store, "address": this.flag6_address,
        "product_name": this.flag6_product, "product_model": this.flag6_model, "warranty": this.flag6_guarantee.value,
        "status": status, "assigned_company": flag2_agency, "no": customer_num, "receipt_number": this.flag2_receipt_num,
        "receipt_type": this.flag2_division.value
      }).then(() => {
        if(status=="접수"){
          window.alert("접수가 완료되었습니다. ");
          setTimeout(() => {
            localStorage.setItem('once_login','true')
            location.reload()
            // this.navCtrl.setRoot(HomePage,{id:this.engineer_id});
          }, 500);
        }
        else{
          window.alert("접수완료하였습니다.");
          this.firemain.child("engineer").child(this.engineer_id.split("@")[0]).child("schedule").child(this.flag2_receipt_num).update({ "date": this.flag2_date, "place": this.flag6_name })
          .then((snap)=>{
            setTimeout(() => {
              localStorage.setItem('once_login','true')
              location.reload()
              // this.navCtrl.setRoot(HomePage,{id:this.engineer_id});
            }, 500);
          })
        }
      })
    })
  }

  flag6_cancel() {
    this.flag6_name = "";
    this.flag6_engineer = "";
    this.flag6_phone = "";
    this.flag6_store = "";
    this.flag6_sub_store = "";
    this.flag6_call = "";
    this.flag6_address = "";
    this.flag6_product = "";
    this.flag6_model = "";
    this.flag6_guarantee = "";
    this.flag = 2;
    localStorage.setItem('local_page','jubsu');
  }

  flag6_save() {
    if (this.flag6_name == "") { window.alert("접수 고객 이름을 입력해주세요."); };
    if (this.flag6_address == "") { window.alert("주소를 입력해주세요."); };

    this.flag6_guarantee = document.querySelector('input[name="guarantee"]:checked');

    this.flag2_name = this.flag6_store + " " + this.flag6_name;
    this.flag = 2;
    localStorage.setItem('local_page','jubsu');
  }
  /*
npm uninstall @ionic/angular
npm i @ionic/angular@3 --save
npm uninstall @ionic/cli
npm i @ionic/cli@latest --save
npm uninstall cordova
npm i cordova@9
ionic cordova run android --emulator
  */

  detail(list, no) {
    console.log(list + ",," + no);
    this.navCtrl.push(CompletePage, { "list": list, "id": this.engineer_id, "no": no, "flag":'true' });
  }

  check_schedule(y, m, d) {
    var value='';
    for (var i in this.flag4_info) {
      var data = this.flag4_info[i].date.split('-');
      var data2=String(this.flag4_info[i].receipt_date).substring(0,8);
      // console.log(data2);
      if (Number(data[0]) === Number(y) &&
        Number(data[1]) === Number(m) &&
        Number(data[2]) === Number(d)) {
        return this.flag4_info[i].place;
      }
      else if (Number(data2.substring(0,4)) === Number(y) &&
        Number(data2.substring(4,6)) === Number(m) &&
        Number(data2.substring(6,8)) === Number(d)) {
        value=this.flag4_info[i].place;
      }
    }
    return value;
  }

  /*about calendar */
  getDaysOfMonth() {
    this.schedule_title = this.monthNames[this.date.getMonth()];
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.date.getMonth() + 1;
    this.currentYear = this.date.getFullYear();
    this.currentHour = this.date.getHours();
    this.currentMinute = this.date.getMinutes();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j + 1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    for (var k = 0; k < (6 - lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k + 1);
    }

    console.log(this.daysInNextMonth)
    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
        this.daysInNextMonth.push(l);
      }
    }

    console.log(this.daysInLastMonth)
    console.log(this.daysInThisMonth)
    console.log(this.daysInNextMonth)
  }

  goToday() {
    this.date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    console.log(this.date.getMonth() + 1);
    this.getDaysOfMonth();
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    console.log(this.date.getMonth() + 1);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }


  go_gongjipage() {
    this.navCtrl.push(GongjiPage);
  }

  str_format(text, len) {
    text = String(text);
    for (var i = text.length; i < len; i++) {
      text = '0' + text;
    }
    return text;
  }

  logout(){
    localStorage.setItem('login_flag','');
    this.navCtrl.setRoot(LoginPage)
  }

  remain_time_set_ready(){
    var now=new Date();
    now.setHours(9,0,0,0);
    console.log(now.toISOString())
    $('#datetime_here ion-datetime').remove()
    $('#datetime_here').append(
      '<ion-datetime id="get_timepicker" style="display: none;" display-format="HH:mm" picker-format="HH:mm"'+
      'value="'+now.toISOString()+'">'+'</ion-datetime>'
    )
    setTimeout(() => {
      console.log($("#get_timepicker"))
      $("#get_timepicker").trigger('click')
    }, 500);
  }

  remain_time_set(){
    console.log(this.flag2_date);
    var now=new Date();
    var scd=new Date(this.flag2_date);
    if(this.flag2_time){
      scd.setHours(this.flag2_time.split(':')[0],this.flag2_time.split(':')[1],0)
    }
    else scd.setHours(9,0,0);
    console.log(scd);
    var num=scd.getTime()-now.getTime();

    console.log("test")
    console.log(now);
    console.log(scd);
    console.log(num);
    this.remain_time=String(Math.floor(num/1000/60/60));
    console.log(this.remain_time);
  }

  get_remainingtime(list){
    var now=new Date();
    var due=new Date(list.due_date);
    if(list.due_time&&list.due_time!=''){
      due.setHours(list.due_time.split(':')[0],list.due_time.split(':')[1]);
    }
    var res=now.getTime()-due.getTime();
    var text='예정일로부터 ';

    console.log(res);
    console.log(res/3600000);
    res=Math.floor(res/3600000);
    console.log(res);

    if(res/24) text+=Math.floor(Math.abs(res/24))+'일 ';
    if(res%24) text+=Math.floor(Math.abs(res%24))+'시간 ';

    if(res<0) text+="남았습니다.";
    else if(res>0) text+="지났습니다.";
    else text=''

    return text;
  }
}
