const app= new PIXI.Application({
    background: '2F719F',
    width:1000,
    height:400
  })
  document.body.appendChild(app.view)
  let reservPlane=[];
  let viewPlane=[]
  let num=0
  let condClickNum=false
  let condSpeed=false
  class Plane{
    constructor(arg){
        this.sprite = PIXI.Sprite.from('https://cdn-icons-png.flaticon.com/512/4998/4998191.png');
        this.sprite.scale.x *=0.2 ;
        this.sprite.scale.y *= 0.2;
        this.sprite.y=150
        this.sprite.x=-300
        this.sprite.interactive = true; 
        this.sprite.buttonMode = true;
        this.sprite.anchor.set(0)
        this.onClick=()=>{
            if(!condSpeed&&!condClickNum){
                condSpeed=true
               condClickNum=true
               num=viewPlane.indexOf(this) 
            } 
        }
        this.addChild=()=>{
            this.sprite.on('click', this.onClick) 
            this.sprite.on('tap',this.onClick)
            app.stage.addChild(this.sprite)
        }
     }
  }
  
  function reserv(){
    for(let i=0;i<40;i++){
      let plane = new Plane()
      plane.addChild()
      reservPlane.push(plane)
    }
    viewPlane.unshift(reservPlane.shift())
  }
  reserv()

  function travelIncrement(){
    if(viewPlane[0].sprite.x>-200){
        
        let newPlane=reservPlane.shift()
        newPlane.sprite.y=150
        newPlane.sprite.x=-300
        newPlane.sprite.scale.y=0.2
        newPlane.sprite.scale.x=0.2
        viewPlane.unshift(newPlane)
        ++num
     }
    for(let i=0;i<viewPlane.length;i++){
        console.log(viewPlane[viewPlane.length-1].sprite.x)
        viewPlane[i].sprite.x+=2
        viewPlane[i].sprite.scale.x*=1.0015
        viewPlane[i].sprite.x*=1.0015
        if(viewPlane[i].sprite.y>0){
            viewPlane[i].sprite.scale.y*=1.0015
            viewPlane[i].sprite.y/=1.0015
        }
        
    }

    if(viewPlane[viewPlane.length-1].sprite.x>app.view.width+500){
        reservPlane.push(viewPlane.pop())
    }
  }

  function crash(i){
    console.log(viewPlane[i])
   viewPlane[i].sprite.y-=4 
   if(viewPlane[i].sprite.y<-200){
    condClickNum=false
   }
  }
  function speeding(num){
    if(viewPlane[num].sprite.x>viewPlane[num-1].sprite.x){
        for(let i=0;i<num;i++){
            viewPlane[i].sprite.x+=4
            viewPlane[i].sprite.scale.y*=1.003
            viewPlane[i].sprite.scale.x*=1.003
            viewPlane[i].sprite.x*=1.003
            viewPlane[i].sprite.y/=1.003
    }
    }else{
        condSpeed=false
    }
  }
 app.ticker.add(()=>{
    travelIncrement()
    if(condClickNum){
       crash(num) 
    }
    if(condSpeed){
      speeding(num)  
    }
 })
