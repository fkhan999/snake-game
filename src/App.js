import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const total_grid_size=30;
  let initialSnakePosition=[
    {x:total_grid_size/2,y:total_grid_size/2},
    {x:total_grid_size/2+1,y:total_grid_size/2}
  ];
  
  let x_pos= Math.floor(Math.random()*total_grid_size);
  let y_pos= Math.floor(Math.random()*total_grid_size);
  const [food,setFood]=useState({x:x_pos,y:y_pos});
  const [snake,setSnake]=useState(initialSnakePosition);
  const [direction,setDirection]=useState("L");
  const [score,setScore]=useState(0);


  function renderboard(){
    let cellArray=[];
    for(let i=0; i<total_grid_size;i++){
      for(let j=0;j<total_grid_size;j++){
        let className="cell";
        if (food.x==i && food.y==j){
          className=className+"  food";
        }
        if (snake.some(ele=>ele.x==i && ele.y==j)){
          className=className+" snake";
        }
        
        let cell=<div className={className} key={`${i}-${j}`}></div>;
        cellArray.push(cell);
      }
    }
    return cellArray;
  }
  function gameOver(){
    setSnake(initialSnakePosition);
    setScore(0);
  }

  function updateGame(){
    if (snake[0].x<0 || snake[0].y<0 || snake[0].x>total_grid_size || snake[0].y>total_grid_size){
      gameOver();
      return;
    }
    if (snake.slice(1).some(ele=>ele.x==snake[0].x && ele.y==snake[0].y)){
      gameOver();
      return;
    }
    let newSnake=[...snake];
    switch(direction){
      case "L":
        newSnake.unshift({x:newSnake[0].x,y:newSnake[0].y-1})
        break;
      case "R":
        newSnake.unshift({x:newSnake[0].x,y:newSnake[0].y+1})
        break;
      case "U":
        newSnake.unshift({x:newSnake[0].x-1,y:newSnake[0].y})
        break;
      case "D":
        newSnake.unshift({x:newSnake[0].x+1,y:newSnake[0].y})
        break;

    }
    if (newSnake[0].x==food.x && newSnake[0].y==food.y){
      setScore(p=>p+1);
      renderFood();
    }
    else{
      newSnake.pop();
    }
    
    setSnake(newSnake); 
  }
  function updateDirection(e){
    let key=e.code;
    console.log(direction,key);
    switch(key){
      case "ArrowUp":
        if (direction!=="D")
        {
          setDirection("U");
        }
        break;
      case "ArrowDown":
        if (direction!=="U")
        {
          setDirection("D");
        }
        break;
      case "ArrowLeft":
        if (direction!=="R")
        {
          setDirection("L");
        }
        break;
      case "ArrowRight":
        if (direction!="L")
        {
          setDirection("R");
        }
        break;
    }

  }

  function renderFood(){
    let x_pos= Math.floor(Math.random()*total_grid_size);
    let y_pos= Math.floor(Math.random()*total_grid_size);
    setFood({x:x_pos,y:y_pos});

  }

  useEffect(()=>{
    let interval= setInterval(updateGame,200);
    return ()=>clearInterval(interval,updateGame);
  });

  useEffect(()=>{
    document.addEventListener("keydown",updateDirection);
    return ()=>clearInterval("keydown",updateGame);
  });

  

  return (
    <div className='container'>
      <div className='score'>
        Score: <span>{score}</span>
      </div>
      <div className='board'>
        {renderboard()}
      </div>
    </div>
  );
}

export default App;
