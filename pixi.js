const app= new PIXI.Application({
    background: 'A8FE03',
    width:800,
    height:400
})
document.body.appendChild(app.view)
let arr1=[]
let arr=[]
let cond2=0
let cond1=1
let cond3=0
let num=0
class Plane{
    constructor(arg){
        this.sprite = PIXI.Sprite.from('https://cdn-icons-png.flaticon.com/512/2685/2685659.png');
        this.sprite.scale.x *=0.15 ;
        this.sprite.scale.y *= 0.15;
        this.sprite.y=150
        this.sprite.x=-this.sprite.width
        this.sprite.interactive = true; 
        this.sprite.buttonMode = true;
        this.sprite.anchor.set(0)
        this.onClick=()=>{
          if(cond1){ 
              d=0
              num=0
              cond3=1
              let m=1
          app.ticker.add(()=>{
            if(m){
              if(this.sprite.y>-100){
                  cond1=0
                  this.sprite.y-=3
               }else{
                m=0
                cond1=1
               }
              }
             num=arr.indexOf(this)
          })    
         }
        }
        this.addChild=()=>{
            this.sprite.on('click', this.onClick) 
            this.sprite.on('tap',this.onClick)
            app.stage.addChild(this.sprite)
        }
    }
}
for(let i=0;i<30;i++){
   let plane= new  Plane(i)
   plane.addChild()
   plane.sprite.x=-100
   arr1.push(plane)
}

arr.unshift(arr1.shift())
arr[0].sprite.x=-100

app.ticker.add(()=>{
  if(arr[0].sprite.x>=0){
    arr.unshift(arr1.shift())
    arr[0].sprite.x=-100
    arr[0].sprite.y=150  
  }
  for(let i=0;i<arr.length;i++){
    arr[i].sprite.scale.y*=1.0003
    arr[i].sprite.scale.x*=1.0003
    arr[i].sprite.x+=1
    if(arr[i].sprite.x>=app.view.width){
      let n=arr.pop()
      n.sprite.scale.y=0.15
      n.sprite.scale.x=0.15
      n.sprite.y=150
      arr1.push(n)
    }
  }
})

 let d=0 
app.ticker.add(()=>{
       if(num){
        d+=3
        if(d<100){
             for(let i=0;i<num;i++){
             arr[i].sprite.x+=3
           }
         }else{
        num=0
      }    
    }

})
