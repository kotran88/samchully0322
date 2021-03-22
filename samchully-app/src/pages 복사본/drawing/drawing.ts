import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController,Platform,Content } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the DrawingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-drawing',
  templateUrl: 'drawing.html',
})
export class DrawingPage {

  shapes=[];
  checked=true;
  canvasElement:any;
  canvasElement2:any;
  canvasElement3:any;
  saveX:number;
  saveY:number;
  startX:number;
  startY:number;
  storedImage=[];
   endX;
   endY;
   dragok:boolean=false;
   middleX;
   middleXarray=[];
   middleYarray=[];
   startXarray=[];
   startYarray=[];

   ctx:any;
   endXarray=[];
   endYarray=[];

   middleflag=0;

   private _Canvas:any;
   private _Canvas3:any;
   private _Context:any;
   middleY;
  evenflag=0;
  @ViewChild("imageCanvas") canvas:any;
  @ViewChild("imageCanvas2") canvas2:any;
  @ViewChild("imageCanvas3") canvas3:any;
  @ViewChild("fixedContainer") fixedContainer:any;
  @ViewChild(Content) content:Content;

  private image : any = new Image();
  selectedColor='#9e2956';

  selectedFlag='2';
  values=['1','2','3']
  picdata:any;
  mypicref:any;
  colors=['#9e2956','#c2281d','#de722f','#edbf4c','#5db37e','#459cde','#4250ad','#802fa3']
  constructor(public view:ViewController,public plt : Platform,public navCtrl: NavController) {
    this.mypicref=firebase.storage().ref("name");
    this.shapes.push({x:10,y:100,width:30,height:30,fill:"#444444",isDragging:false});


  }

  mousedown(){
    console.log("mouse mousedown");
  }
  mouseup(){
    console.log("mouse up");
  }
  mousemove(){
    console.log("mouse move")
  }
  merging(){

    this._Canvas3=this.canvasElement3;
    this._Canvas3.width=500;
    this._Canvas3.height=500;
var can3 = document.getElementById('canvas3');
var ctx3 = this._Canvas3.getContext('2d');



ctx3.drawImage(this.canvasElement2, 0, 0);
ctx3.drawImage(this.canvasElement, 0, 0);
  }
   clear() {
    this.ctx.clearRect(0, 0, 500,500);
  }
  rect(r) {
    this.ctx.fillStyle=r.fill;
    this.ctx.fillRect(r.x,r.y,r.width,r.height);
  }

  draw() {
    // this.clear();
    // this.rect(this.shapes[0]);
    // redraw each shape in the shapes[] array
    // for(var i=0;i<shapes.length;i++){
    //   // decide if the shape is a rect or circle
    //   // (it's a rect if it has a width property)
    //   if(shapes[i].width){
    //     rect(shapes[i]);
    //   }else{
    //     circle(shapes[i]);
    //   };
    // }
  }
  mouseDown(){
    console.log("down!")
  }
  ionViewDidLoad(){

    this.canvasElement=this.canvas.nativeElement;
    this.canvasElement.width=400;
    this.canvasElement.height=400;

   
    // this.canvasElement2=this.canvas2.nativeElement;
    // this._Canvas=this.canvasElement2;
    // this._Canvas.width=500;
    // this._Canvas.height=500;
    this.ctx=this.canvasElement.getContext('2d');
    


  //   $("#canvas").mousedown(function (e) {
  //     console.log("down")
  // });
  // $("#canvas").mousemove(function (e) {
  //    console.log("mousemove")
  // });
  // $("#canvas").mouseup(function (e) {
  //   console.log("mouseup")
  // });
  // $("#canvas").mouseout(function (e) {
  //   console.log("mouseout")
  // });
    var mx
    var my
  //   this.canvasElement.addEventListener('mousedown', e => {
  //     console.log("Mouse down")
  //     e.preventDefault();
  //     e.stopPropagation();
  //    var x = e.offsetX;
  //    var  y = e.offsetY;

  // console.log(e);
  // // get the current mouse position
  // var mx=(Number(e.clientX)-0);
  // var my=(e.clientY-0);
  // console.log(mx+',,,'+my)

  // this.startX=mx;
  // this.startY=my;
  //     // isDrawing = true;
  //   });
  var BB=this.canvasElement.getBoundingClientRect();
    this.canvasElement.addEventListener('mousedown', e => {
      console.log("touchdown down")


      e.preventDefault();
      e.stopPropagation();
      var mx=((e.clientX)-BB.x);
      var my=(e.clientY-BB.y-50);
     
      if(this.shapes[0].width){
        console.log("rec")
        console.log(e.clientX+",,"+e.clientY)
        console.log(mx+',,,'+my)
        console.log(this.shapes[0].x+","+this.shapes[0].y+","+this.shapes[0].width+","+this.shapes[0].height)
        // test if the mouse is inside this rect
        //24 > 10 ,,,,, 24 <40  ///   175>100 ,,,,,175<130
        if(mx>this.shapes[0].x && mx<this.shapes[0].x+this.shapes[0].width && my>this.shapes[0].y && my<this.shapes[0].y+this.shapes[0].height){
          // if yes, set that rects isDragging=true
          console.log("clicked square well !!!")
          this.dragok=true;
          this.shapes[0].isDragging=true;
        }
      }
     var x = e.offsetX;
     var  y = e.offsetY;

  console.log(e);
  // get the current mouse position
 

  this.startX=mx;
  this.startY=my;
    });
    
    // this.canvasElement.addEventListener('mousemove', e => {
    //   console.log("Move")
    //   if(this.dragok){
    //     mx=(e.clientX-BB.x);
    //     my=(e.clientY-BB.y-50);
    //     var dx=mx-this.startX;
    //     var dy=my-this.startY;
   
    //     var s=this.shapes[0];
    //     s.x+=dx;
    //     s.y+=dy;
    //     // this.draw();
    //     this.startX=mx;
    //     this.startY=my;
    //   }
   
    //   // if (isDrawing === true) {
    //   //   drawLine(context, x, y, e.offsetX, e.offsetY);
    //   //   x = e.offsetX;
    //   //   y = e.offsetY;
    //   // }
    // });
    // this.canvasElement.addEventListener('mouseup', e => {
    //   console.log("mouse up")
    //   e.preventDefault();
    //   e.stopPropagation();
    //   // if (isDrawing === true) {
    //   //   drawLine(context, x, y, e.offsetX, e.offsetY);
    //   //   x = e.offsetX;
    //   //   y = e.offsetY;
    //   // }
    // });
    
    // this.draw();
    // this.canvasElement3=this.canvas3.nativeElement;
    // setTimeout(()=>{
    //   if(this._Canvas.getContext){
    //     this._Context=this._Canvas.getContext("2d");
    //     this.image.src="assets/imgs/ctshow.jpg";
    //     this.image.onload = () =>{
    
    //       this._Context.drawImage(this.image,0,0,500,500)




    //     }

    //   }
    // },500)
   
    // var canvas = document.getElementById('canvas2');
    // // var context = canvas.getContext('2d');
    // var ctx = this.canvasElement2.getContext("2d");
    // var img = new Image();
    // img.onload = function () {
    //   var aux:any = this;
    //   // newcanvas.width = aux.width;
    //   // newcanvas.height = aux.height;
    //   ctx.drawImage(img, 0, 0);
    //   // var dataURL = newcanvas.toDataURL("image/png");
    // };
    // img.src = "./../../asset";
    // ctx.drawImage(image, 0, 0);

  }
  selectColor(color){
    this.selectedColor=color;
  }
   angle(cx, cy, ex, ey) {



    
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }
  
  startDrawing(ev){
    console.log("start drawing come...."+this.selectedFlag+",,,"+this.evenflag)
    
    if($('input').is(":checked")==true){
      this.checked=false;
    }
    console.log(this.checked);
    console.log(this.selectedFlag);
    
    if(!this.checked){
      if(this.selectedFlag=="1"){
        var canvasPosition = this.canvasElement.getBoundingClientRect();
        this.saveX=ev.touches[0].pageX - canvasPosition.x;
        this.saveY=ev.touches[0].pageY - canvasPosition.y;
        console.log(this.saveX+","+this.saveY);
      }else if(this.selectedFlag=="2"){
        console.log("increase eventflag "+this.evenflag);
        this.evenflag++;

        console.log("increase eeeeventflag "+this.evenflag);
        //직선
        //짝수면 마무리, 홀수면 시작점. 
        var canvasPosition = this.canvasElement.getBoundingClientRect();
        let ctx=this.canvasElement.getContext('2d');
        if(this.evenflag%2==0){
          //짝수
          console.log("even!")
          this.endX=ev.touches[0].pageX - canvasPosition.x;
          this.endY=ev.touches[0].pageY - canvasPosition.y;
      
          this.endXarray.push(this.endX)
          this.endYarray.push(this.endY)
          console.log("end is ")
          console.log(this.endX+",,"+this.endY);
          console.log(this.endXarray+"??"+this.endYarray);
          this.middleX=(Number(this.startX)+Number(this.endX)) /2
          this.middleY=(Number(this.startY)+Number(this.endY)) /2
  
          this.middleXarray.push(this.middleX)
  
          this.middleYarray.push(this.middleY)
  
          if(this.middleXarray.length%2==0){
  
            this.middleflag++;
    
            //짝수
            console.log("ev")
  
            console.log(this.startXarray);
            console.log(this.endXarray)
            console.log(this.startYarray);
            console.log(this.endYarray)
            var dx1=this.startXarray[(this.startXarray.length-2)]-this.endXarray[(this.startXarray.length-2)];
            var dy1=this.startYarray[(this.startXarray.length-2)]-this.endYarray[(this.startXarray.length-2)];
            var dx2=this.endXarray[(this.startXarray.length-1)]-this.endXarray[(this.startXarray.length-2)];
            var dy2=this.endYarray[(this.startXarray.length-1)]-this.endYarray[(this.startXarray.length-2)];
            var a1=Math.atan2(dy1,dx1);
            var a2=Math.atan2(dy2,dx2);
  
            var a = Number((a2 - a1) * 180 / Math.PI + 360) % 360;
  
  
            // var angle = this.angle(this.middleXarray[0],this.middleYarray[0],this.middleXarray[1],this.middleYarray[1]);
  
            // window.alert(angle);
  
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.endXarray[(this.startXarray.length-2)],this.endYarray[(this.startYarray.length-2)]);
            ctx.arc(this.endXarray[(this.startXarray.length-2)],this.endYarray[(this.startXarray.length-2)],20,a1,a2);
            ctx.closePath();
            ctx.fillStyle="red";
            ctx.globalAlpha=0.25;
            ctx.fill();
  
            ctx.font='italic 20pt Calibri';
        
            ctx.fillStyle="blue";
            ctx.fillText(a.toFixed(0),this.endXarray[(this.startXarray.length-2)]+25,this.endYarray[(this.startXarray.length-2)]);
  
            ctx.restore();
  
  
          }
          
        
          console.log("middle issssss ")
          console.log(this.middleX+","+this.middleY)
  
          ctx.lineTo(this.endX,this.endY);
          ctx.closePath();
          ctx.stroke();
        }else{
          //홀수
       
          this.startX=ev.touches[0].pageX - canvasPosition.x;
          this.startY=ev.touches[0].pageY - canvasPosition.y;
          this.startXarray.push(this.startX);
          this.startYarray.push(this.startY);
      
          
          console.log("start is : ");
          console.log(this.startX+",,"+this.startY);
      
          ctx.lineJoin='round';
          ctx.strokeStyle=this.selectedColor;
          ctx.lineWidth=5;
          ctx.beginPath();
          ctx.moveTo(this.startX,this.startY);
        }
  
  
      }else{
  
  
          this.evenflag++;
        
          //직선
          //짝수면 마무리, 홀수면 시작점. 
          var canvasPosition = this.canvasElement.getBoundingClientRect();
          let ctx=this.canvasElement.getContext('2d');
          if(this.evenflag%2==0){
            //짝수
            console.log("even!")
            this.endX=ev.touches[0].pageX - canvasPosition.x;
            this.endY=ev.touches[0].pageY - canvasPosition.y;
        
            console.log("end is ")
            console.log(this.endX+",,"+this.endY);
            
          
            console.log("middle issssss ")
            console.log(this.middleX+","+this.middleY)
    
            ctx.lineTo(this.endX,this.endY);
            ctx.closePath();
            ctx.stroke();
          }else{
            //홀수
         
            this.startX=ev.touches[0].pageX - canvasPosition.x;
            this.startY=ev.touches[0].pageY - canvasPosition.y;
        
            
            console.log("start is : ");
            console.log(this.startX+",,"+this.startY);
        
            ctx.lineJoin='round';
            ctx.strokeStyle=this.selectedColor;
            ctx.lineWidth=5;
            ctx.beginPath();
            ctx.moveTo(this.startX,this.startY);
          }
    
    
  
      }
    }

   
    

  }
  uploadCanvasImage(){
    this.merging();
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
  uploadImage(imageURI,index){
    let storageRef = firebase.storage().ref();
    var result="image"+(index+1);
    console.log(imageURI);
    console.log("sssssssssss : "+result);
    console.log(imageURI);
    console.log("donE!!!!!!!!!!")
        var a = this.mypicref.child("name").child(result)
    this.encodeImageUri(imageURI, (image64)=>{
      a.putString(image64, 'data_url')
      .then(snapshot => {
        this.mypicref.child("name").child(result).getDownloadURL().then((url)=>{
          console.log("download url is : "+url);
            this.view.dismiss({"url":url})


      }).catch((e)=>{
        console.log("error is....")
        window.alert(e);
        console.log(e);
      })
    })
  });
}
  saveCanvasImage(){
    var dataUrl=this.canvasElement.toDataURL();
    console.log(dataUrl);

    let ctx=this.canvasElement.getContext('2d');

    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    this.uploadImage(dataUrl,0)

  }

  moved(ev){
    if(this.selectedFlag=="2"){
      var canvasPosition = this.canvasElement.getBoundingClientRect();

      let currentX=ev.touches[0].pageX - canvasPosition.x;
      let currentY=ev.touches[0].pageY - canvasPosition.y;
  
      console.log(this.saveX+","+this.saveY);
  
      let ctx=this.canvasElement.getContext('2d');
  
      ctx.lineJoin='round';
      ctx.strokeStyle=this.selectedColor;
      ctx.lineWidth=5;
      ctx.beginPath();
      ctx.moveTo(this.saveX,this.saveY);
      ctx.lineTo(currentX,currentY);
      ctx.closePath();
      ctx.stroke();
      this.saveX=currentX;
      this.saveY=currentY;
  
    }else{

    }
    
  }
}
