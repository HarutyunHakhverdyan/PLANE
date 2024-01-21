const app= new PIXI.Application({
    background: '2F719F',
    resizeTo: window
  })
  document.body.appendChild(app.view)
  let backgroundImage=PIXI.Sprite.from('https://images.unsplash.com/photo-1506102383123-c8ef1e872756?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
  backgroundImage.width=app.screen.width
  backgroundImage.height=app.screen.height
  app.stage.addChild(backgroundImage)
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
        this.sprite.anchor.set(0,0.5)
        this.sprite.y=150
        this.sprite.x=-300
        this.sprite.interactive = true; 
        this.sprite.buttonMode = true;
        
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
    for(let i=0;i<50;i++){
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
        viewPlane[i].sprite.x+=2
        viewPlane[i].sprite.scale.x*=1.0015
        viewPlane[i].sprite.x*=1.0015
        viewPlane[i].sprite.scale.y*=1.0015
    }

    if(viewPlane[viewPlane.length-1].sprite.x>app.screen.width+500){
        let lastPlane=viewPlane.pop()
        lastPlane.sprite.y=-300
        reservPlane.push(lastPlane)
    }
  }

  function crash(i){
    console.log(viewPlane[i])
    viewPlane[i].sprite.y-=4 
   if(viewPlane[i].sprite.y<-100){
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
    }
    }else{
        condSpeed=false
    }
  }

const container = new PIXI.Container();
app.stage.addChild(container);
const texture = PIXI.Texture.from('https://cdn-icons-png.flaticon.com/512/3375/3375739.png');
let arrBird=[]
for (let i = 0; i < 5; i++){
    for(let j=0;j<i;j++){
        const bird = new PIXI.Sprite(texture);
        bird.scale.x=0.05
        bird.scale.y=0.05
        bird.anchor.set(0.5)
        bird.anchor.set(0.5);
        bird.x = i*50-25*j
        bird.y = j*40
        bird.scale.x+=j/50
        bird.scale.y+=j/50
        container.addChild(bird);
        arrBird.push(bird)
    }
}
container.y = app.screen.height/3;
let k=app.screen.width/3
let condRot1=0
let condRot2=0
function hoverBirds(num){
       container.y+=Math.cos(num/10)/4
       container.x=k+Math.sin(num/k)*(k+1)
       if(container.x>2*k){
        ++condRot1
       }else{
        condRot1=0
       }
       if(container.x<0){
        ++condRot2
       }else{
        condRot2=0
       }
       if(condRot1==1||condRot2==1){
        for(let i=0;i<arrBird.length;i++){
           arrBird[i].scale.x=-arrBird[i].scale.x 
        }
       }else{
        for(let i=0;i<arrBird.length;i++){
            arrBird[i].rotation= Math.sin(num/10)/10
         }
       }
}

 let eps=0
 app.ticker.add((delta)=>{
    eps+=delta 
    travelIncrement()
    if(condClickNum){
       crash(num) 
    }
    if(condSpeed){
      speeding(num)  
    }
    hoverBirds(eps)
 })
