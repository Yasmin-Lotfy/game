import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import GameRendering from '../GameRendering/GameRendering';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import style from './Home.module.scss'



export default function Home() {
  let [recomendedGamed, setRecomendedGamed] = useState([]);
  let navigate = useNavigate()


  let getRecommendedGame=async ()=>{
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      headers: {
        'X-RapidAPI-Key': '93e03a98d2msh028f2497b0ae015p1993fejsncab5244ec9a7',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
  
    axios.request(options).then(function (response) {
      // console.log(response.data);
      setRecomendedGamed(response.data)
      
    }).catch(function (error) {
      console.error(error);
    });
}



  useEffect(() => {
    getRecommendedGame()

  }, [])
  let goToAll = ()=>{
    navigate("/all")
    
  }

  
  return (
    <>
    <div className={`${style.header} text-center m-auto py-5`}>
      <h2 className='fs-1'>Find & track the best <span className='text-info'>free-to-play</span> games!</h2>
    <p className='py-2 fs-5 text-muted'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
    <button onClick={goToAll} className={`py-2 my-2 btn ${style.browsBtn}`}>Browse Games</button>
    </div>
    <div className="container">
    <div className="recomm my-5">
      <p className='text-muted fs-2 my-3'><i class="fa-solid fa-robot pe-2"></i>Personalized Recommendations</p>
      {/* <GameRendering item={recomendedGamed.filter((element,index)=> index <4)}/> */}
      <div className="row gy-2 gx-2">
        {recomendedGamed.length > 0 ?recomendedGamed.filter((elem,index)=>  index < 3 ).map((element,index)=> 
                 <div className={`col-md-4`} key={index}>
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
              ) : <LoadingScreen/>}
            </div>

       
      </div>
    </div>

   
    
    </>
  )
}
