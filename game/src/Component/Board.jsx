import React,{useState,useEffect} from 'react'
import {motion} from 'framer-motion';
 import Score from './ScoreBoard/Score';
import blank from  './assets/blank.jpeg'
 import red from './assets/red.jpeg';
 import blue from './assets/blue.jpeg';
 import Yellow from './assets/Yellow.jpeg';
 import pink from './assets/pink.jpeg';
 import green from './assets/green.jpeg';
 import Brown from './assets/Brown.jpeg';
 
 


const Colors=[
    red,
    blue,
    Yellow,
    pink,
    green,
    Brown
]
 const width=8;
const Board = () => {
    const [CurrentColor, setCurrentColor] = useState([])
  const [SquareBeignDragged, setSquareBeignDragged] = useState(null);
  const [SquareBeignReplaced, setSquareBeignReplaced] = useState(null)
   const [ScoreDisplay, setScoreDisplay] = useState(0)

    const Chexkthree = ()=>{
        for(let i= 0;  i <= 47; i++){
            const threesqure = [ i, i + width, i + width * 2];
            const DescidedColor = CurrentColor[i]
            const isblank = CurrentColor[i] === blank
            if(threesqure.every(Squar => CurrentColor[Squar] === DescidedColor && !isblank)){
setScoreDisplay(()=>ScoreDisplay + 3)
                threesqure.forEach(Squar => CurrentColor[Squar]=blank)
                return true
            }
        }
    }

    const Chexkfour = ()=>{
        for(let i= 0;  i <=39; i++){
            const foursqure = [ i, i + width, i + width * 2, i + width * 3];
            const DescidedColor = CurrentColor[i]
            const isblank = CurrentColor[i] === blank
            if(foursqure.every(Squar => CurrentColor[Squar] === DescidedColor && !isblank)){
                setScoreDisplay(()=>ScoreDisplay + 4)
                foursqure.forEach(Squar => CurrentColor[Squar]= blank)
                return true
            }
        }
    }
//checking for the row
const Chexkrowthree = ()=>{
    for(let i= 0;  i < 64; i++){
        const rowthreesqure = [ i, i + 1,i + 2 ];
        const DescidedColor = CurrentColor[i];
        const invalid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
        if(invalid.includes(i))continue
        const isblank = CurrentColor[i] === blank
        if( rowthreesqure.every(Squar => CurrentColor[Squar] === DescidedColor && !blank)){
            setScoreDisplay(()=>ScoreDisplay + 3)
            rowthreesqure.forEach(Squar => CurrentColor[Squar]=  blank)
            return true
        }
    }
}
const Chexkrowfour = ()=>{
    for(let i= 0;  i < 64; i++){
        const fourrowsqure = [ i, i+1, i+ 2, i + 3];
        const DescidedColor = CurrentColor[i]
        const invalid=[5,6,7,13 ,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64];
        if(invalid.includes(i))continue
        const isblank = CurrentColor[i] === blank
        if(fourrowsqure.every(Squar => CurrentColor[Squar] === DescidedColor && !isblank)){
            setScoreDisplay(()=>ScoreDisplay + 4)
            fourrowsqure.forEach(Squar => CurrentColor[Squar]=   blank)
            return true
        }
    }
}



//creating a function tat will enable movingdownword if the down box is empty


const Movedown = () =>{
    for(let i = 0; i <= 55; i++){

         const firstRow = [0,1,2,3,4,5,6,7];
         const isFirst = firstRow.includes(i);


         if(isFirst && CurrentColor[i]===   blank){
            let RandomNumber = Math.floor(Math.random() * Colors.length);
            CurrentColor[i] = Colors[RandomNumber]
        }
        if(CurrentColor[i + width]===   blank){
            CurrentColor[i + width]=CurrentColor[i];
            CurrentColor[i]=   blank;
        }
       
    }
}

const DragStart = (e) =>{

setSquareBeignDragged(e.target)
}
const DragEnd = (e) =>{
 const SqureDraggedId = parseInt(SquareBeignDragged.getAttribute('data-id'));
 const SquareReplacedId = parseInt(SquareBeignReplaced.getAttribute('data-id'))


 //switching the background
CurrentColor[SqureDraggedId] = SquareBeignReplaced.getAttribute('src')
CurrentColor[SquareReplacedId]=SquareBeignDragged.getAttribute('src')
 console.log(SqureDraggedId);
 console.log("SqureReplaced",SquareReplacedId)


//cMaking valid move
const Validmoves =[
    SqureDraggedId - 1,
    SqureDraggedId - width,
    SqureDraggedId + 1,
    SqureDraggedId + width
]
 //defining a valid move
 const Validmove = Validmoves.includes(SquareReplacedId)
 const isroethree =Chexkrowthree();
 const isrowfour =Chexkrowfour()
 const iscolumnthree =Chexkthree();
 const uscolumnfour =  Chexkfour ()


 if(SquareReplacedId 
    && Validmove 
    && (isroethree|| isrowfour||uscolumnfour ||iscolumnthree)){
   setSquareBeignDragged(null)
   setSquareBeignReplaced(null)
 } else{
    CurrentColor[SqureDraggedId]=SquareBeignDragged.getAttribute('src')
   CurrentColor[SquareReplacedId]=SquareBeignReplaced.getAttribute('src')
   setCurrentColor([...CurrentColor])
 }
}


//creating board
     const CreateBoard =()=>{
       let Randomcolor=[]   
     for(let i=0; i < width * width; i++){
      
        const Colorsrandom = Colors[ Math.floor(Math.random()*Colors.length)]
        Randomcolor.push(Colorsrandom)
        setCurrentColor(Randomcolor)
     }
    }

   
    useEffect(() => {
        CreateBoard()
      
    }, [])

    useEffect(()=>{
        const time = setInterval(()=>{
            Chexkfour ()
            Chexkrowfour()
            Chexkrowthree()
            Chexkthree (), 
            Movedown ()
            setCurrentColor([...CurrentColor])
        },100)
        return()=> clearInterval(time)
    },[Chexkthree, Chexkrowthree,Chexkrowfour, Chexkfour,Movedown ,CurrentColor ])
//Function that will run drop
const Drop =(e)=>{
console.log(e.target)
setSquareBeignReplaced(e.target)
}



  return (
    <motion.div  animate={{x:-7 , x:7}} transition={{duration:10}}className="board">
        <div className="boardgame">
            {CurrentColor.map((color,index)=>(
  <img  src={color} alt={color}
  key={index}
  
  data-id={index}
  draggable={true}
 
  onDragStart={DragStart}
  onDragEnter={(e)=>e.preventDefault()}
  onDragLeave={(e)=>e.preventDefault()}
  onDragOver={(e)=>e.preventDefault()}
  onDrop={Drop}
  onDragEnd={DragEnd}
  />
            ))}
            
          
        </div>

        <Score Score={ScoreDisplay}/>
    </motion.div>
  )
}

export default Board