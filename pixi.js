let app=new PIXI.Application({width:640,height:360,background:0x33FFFF})
document.body.append(app.view)
let sprite1 = PIXI.Sprite.from('https://cdn-icons-png.flaticon.com/512/2685/2685659.png');
let arr=[] 
let cond2=1
let num=0
for(let i=0; i<5;i++){ 
    let sprite1 = PIXI.Sprite.from('https://cdn-icons-png.flaticon.com/512/2685/2685659.png'); 
    let cont = new PIXI.Container() 
    cont.addChild(sprite1) 
    cont.width=0.15 
    cont.height=0.15
    arr.push(cont) 
   sprite1.interactive = true; 
   sprite1.buttonMode = true; 
   sprite1.on('click', onClick) 
 let cond1=0
 
 let k=0
function onClick() { 
    debugger
    if(arr[num].y<0){
        cond2=1
    }
    if(cond2){
       cond1=1;
       k=i 
       num=k
     }
     cond2=0
    } 
app.stage.addChild(arr[i]) 
    cont.y=200 
    let eps=0 
    let cond=1 
app.ticker.add((d)=>{  
   eps+=d 
   if(arr[i].x>=app.view.width){ 
    cond=0 
    arr[i].x=-arr[i].width
} 
arr[i].x+=0.5 
   if(cond){ 
    if(i>=1&&i!=k){ 
arr[i].x=arr[i-1].x+arr[i-1].width+40
      } 
   } 
     if(cond1){
        arr[k].y-=2
       if(k<arr.length-1&&k>0){
        if(arr[k-1].x<arr[k].x){ 
            for(let j=0;j<k;j++){
            arr[j].x+=1
           } 
       } 
     } 
   }
 }) 
}