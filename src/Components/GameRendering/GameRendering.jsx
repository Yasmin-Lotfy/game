import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';


export default function GameRendering({item}) {
    
    let [increaseCounter, setIncreaseCounter] = useState(20);
    const [gameId, setGameId] = useState(0)
    let seeMoreGames= ()=>{
        let games = increaseCounter;
        games=games+20;
        setIncreaseCounter(games);
        // console.log(counter)
    
      }
      let seeLessGames= ()=>{
        let games = increaseCounter;
        
        games=games-20;
        if(games == 0){
          games = 20
        }
        setIncreaseCounter(games);
        // console.log(counter)
    
      }
    
    
  return (
    <>
    { item.length > 0 ? <div className="container">
    <div className="recomm my-5">
      <div className="row gy-2 gx-2">
              {item.filter((elem,index)=>  index < increaseCounter ).map((element,index)=> 
               <div className={`col-md-3`} key={index}>
                 <Link className='text-decoration-none' to={`/details/${element.id}`}>
                  <div className={`cardGame  item  rounded-4 px-1  py-3 `}>
                    <img className=' w-100' src={element.thumbnail} alt='game-item' />
                    <div className="header-game py-2  d-flex justify-content-between align-items-center">
                    <h3 className='fs-6 text-lowercase text-muted'>{element.title}</h3>
                    <button className='btn btn-info text-white py-1 px-1 text-uppercase'>free</button>
                    </div>
                    <p className='fs-6 text-capitalize text-muted'>{element.short_description.split(" ").slice(0,3).join(" ")}</p>

                    <div className="header-game py-2 px-2 d-flex justify-content-between align-items-center">
                    <i className="greyColor fa-solid fa-square-plus"></i>
                    <div className='d-flex align-items-center justify-content-between'>
                      <p className='greyBgColor m-0 me-2 rounded-pill px-3'>{element.genre}</p>
                    <i className="greyColor fa-brands fa-windows"></i>
                    </div>
                    </div>
                  </div>
                  </Link>
                </div>
               
              )}
              
      </div>
      <div className='d-flex my-2'></div>
      <button onClick={seeMoreGames} className='my-2 btn btn-lg  btn-outline-info text-white'>More Games </button>
      <button onClick={seeLessGames} className='my-2 mx-2 btn btn-lg  btn-outline-info text-white'>Less Games</button>
       
      </div>
    </div> : <LoadingScreen/>}
    
    </>
  )
}
