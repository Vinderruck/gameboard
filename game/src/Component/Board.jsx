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
        for(let i= 0;  i < 47; i++){
            const threesqure = [ i, i + width, i + width * 2];
            const DescidedColor = CurrentColor[i]
            if(threesqure.every(Squar => CurrentColor[Squar] === DescidedColor)){
                threesqure.forEach(Squar => CurrentColor[Squar]='')
            }
        }
    }

    const Chexkfour = ()=>{
        for(let i= 0;  i < 39; i++){
            const foursqure = [ i, i + width, i + width * 2, i + width * 3];
            const DescidedColor = CurrentColor[i]
            if(foursqure.every(Squar => CurrentColor[Squar] === DescidedColor)){
                foursqure.forEach(Squar => CurrentColor[Squar]='')
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
        if( rowthreesqure.every(Squar => CurrentColor[Squar] === DescidedColor)){
            rowthreesqure.forEach(Squar => CurrentColor[Squar]='')
        }
    }
}
const Chexkrowfour = ()=>{
    for(let i= 0;  i < 64; i++){
        const fourrowsqure = [ i, i+1, i+ 2, i + 3];
        const DescidedColor = CurrentColor[i]
        const invalid=[5,6,7,13 ,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64];
        if(invalid.includes(i))continue
        if(fourrowsqure.every(Squar => CurrentColor[Squar] === DescidedColor)){
            fourrowsqure.forEach(Squar => CurrentColor[Squar]='')
        }
    }
}



//creating a function tat will enable movingdownword if the down box is empty


const Movedown = () =>{
    for(let i = 0; i < 64 - width ; i++){

         const firstRow = [0,1,2,3,4,5,6,7];
         const isFirst = firstRow.includes(i);


         if(isFirst && CurrentColor[i]=== ''){
            let RandomNumber = Math.floor(Math.random() * Colors.length);
            CurrentColor[i] = Colors[RandomNumber]
        }
        if(CurrentColor[i + width]===''){
            CurrentColor[i + width]=CurrentColor[i];
            CurrentColor[i]='';
        }
       
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
    console.log(CurrentColor)
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

   
  return (
    <motion.div claassName="board">
        <div className="boardgame">
            {CurrentColor.map((color,index)=>(
  <img alt='image' style={{backgroundColor:color}}
  
  
  data-id={index}
  draggable={true}
  onDragEnd={{}}
  onDragStart={{}}
  onDragEnter={(e)=>e.preventDefault()}
  onDragLeave={(e)=>e.preventDefault()}
  omDragOver={(e)=>e.preventDefault()}
  onDrop={{}}
  />
            ))}
            
          
        </div>
    </motion.div>
  )
}

export default Board