import React,{useState,useEffect} from 'react'
import {motion} from 'framer-motion';



const Colors=[
    'Red',
    'Orange',
    'Skyblue',
    'Yellow',
    'Indigo',
    'Green' 
]
 const width=8;
const Board = () => {
    const [CurrentColor, setCurrentColor] = useState([])
    const Chexkthree = ()=>{
        for(let i= 0 ;  i < 47; i++){
            const threesqure = [ i, i +width, i +width];
            const DescidedColor = CurrentColor[i]
            if(CurrentColor.every(Squar => CurrentColor[Squar] === DescidedColor)){
                CurrentColor.forEach(Squar => CurrentColor[Squar]=== '')
            }
        }
    }

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
    console.log(CurrentColor)
 
  return (
    <motion.div claassName="board">
        <div className="boardgame">
            {CurrentColor.map((color,index)=>(
  <img style={{backgroundColor:color}}/>
            ))}
          
        </div>
    </motion.div>
  )
}

export default Board