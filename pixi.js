const app= new PIXI.Application({
    background: 'C3FE03',
    width:800,
    height:400
})
document.body.appendChild(app.view)
let arr=[]
let cond2=1
let cond1=0
let num=0
let a=0
class Plane{
    constructor(arg){
        this.sprite = PIXI.Sprite.from('https://cdn-icons-png.flaticon.com/512/2685/2685659.png');
        this.sprite.scale.x *=0.15 ;
        this.sprite.scale.y *= 0.15;
        this.sprite.y=150
        this.sprite.x=-this.sprite.width
        this.sprite.interactive = true; 
        this.sprite.buttonMode = true;
        this.onClick=()=>{
            if(cond2){
                 a=1
                 b=0
            num=arr.indexOf(this)
                app.ticker.add(()=>{
                    if(this.sprite.y>0){
                        cond2=0
                     this.sprite.y-=2
                   }else{cond2=1}
            })
         }
        }
        this.addChild=()=>{
            this.sprite.on('click', this.onClick) 
            this.sprite.on('tap',this.onClick)
            app.stage.addChild(this.sprite)
        }
        this.start=()=>{
            this.sprite.x+=1.5
            this.sprite.scale.y*=1.0005
            this.sprite.scale.x*=1.0005
        }
        this.ticker=()=>{
            app.ticker.add(()=>{
                this.start()
                if(this.sprite.x>app.view.width){
                    app.stage.removeChild(this.sprite)
                }
                if(this.sprite.y==0){
                    app.stage.removeChild(this.sprite)
                }
            })
        }
    }
}

let result= new  Plane(arr.length)
result.addChild()
result.ticker()
arr.push(result)
app.ticker.add(()=>{
    if(arr[0].sprite.x>60){
        num++
        let result= new  Plane()
        result.addChild()
        result.ticker()
        arr.unshift(result)
        if(arr[arr.length-1].sprite.x>app.view.width){
            arr.pop()
        }
    }
})
let b=0
app.ticker.add(()=>{
    if(num==0){
        num=1
    }
    if(a){
     b+=2   
     if(num<=arr.length-2){
    if(b<arr[1].sprite.x-arr[0].sprite.x){
      for(let i=0;i<num;i++){
        arr[i].sprite.x+=2
     }  
    }
   }else{
    if(b<(arr[1].sprite.x-arr[0].sprite.x)/2){
          for(let i=0;i<num;i++){
            arr[i].sprite.x+=2
          }  
        }
     }
  } 
})
 
