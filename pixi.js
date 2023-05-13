let app=new PIXI.Application({width:640,height:360,background:0x33FFFF})
document.body.append(app.view)
let cond1=1
let cond2=1
let arr=[]
let num1=0
class Plane{
    constructor(arg){
        this.num=arg
        this.sprite = PIXI.Sprite.from('https://cdn-icons-png.flaticon.com/512/2685/2685659.png');
        this.sprite.scale.x *=0.2 ;
        this.sprite.scale.y *= 0.2;
        this.sprite.y=100
        this.sprite.x=-this.sprite.width
        this.sprite.interactive = true; 
        this.sprite.buttonMode = true;
        this.zoom=()=>{
            this.sprite.scale.y*=1.0005 
            this.sprite.scale.x*=1.0005 
        }
        this.onClick=()=>{
            if(cond2){
                app.ticker.add(()=>{
                    if(this.sprite.y>-100){
                        num1=this.num
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
        this.start=()=>{this.sprite.x+=0.5}
        this.ticker=()=>{
            app.ticker.add(()=>{
                this.start()
            if(this.sprite.scale.y<0.26){
                this.zoom()
           }
            })
        }
    }
}
let result=new Plane(arr.length)
 result.addChild()
 result.ticker()  
 arr.push(result)
 app.ticker.add((d)=>{
    if(result.sprite.x>45&&cond1){
         result=new Plane(arr.length)
        result.addChild()
        result.ticker()
        arr.push(result)
     }
     if(!cond2){
        for(let i=num1;i<arr.length-1;i++){
            if(arr[num1+1].sprite.x<arr[num1].sprite.x){
                arr[i+1].sprite.x+=2
            }
        }
     }
})






