import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DetailedGame() {
  let id = useParams();
  console.log(id)
  const [gameInfo, setGameInfo] = useState({})

  let getDetailedGame= async(x)=>{
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
      params: x,
      headers: {
        'X-RapidAPI-Key': '93e03a98d2msh028f2497b0ae015p1993fejsncab5244ec9a7',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      setGameInfo(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }
  useEffect(() => {
    getDetailedGame(id)
   
  }, [])
  

  return (
    <>
      <div className="container">
        <div className="row my-4">
          <div className="col-md-4">
            <img src={gameInfo.thumbnail} className="w-100 rounded-3"  />
            <div className='d-flex justify-content-between align-items-center my-2'>
              <a className='cardGame text-uppercase border-0 btn btn-info text-muted'target='_blank' href={gameInfo.freetogame_profile_url}>Free</a>
              <a className='btn btn-info text-white text-uppercase fw-bolder px-3 ' target='_blank' href={gameInfo.freetogame_profile_url}>Play Now <i class="fa-solid fa-arrow-right-from-bracket"></i></a>
            </div>
          </div>
          <div className="col-md-8">
          <h2 className='text-muted'>{gameInfo.title}</h2>
            <h5 className='text-muted'>About {gameInfo.title}</h5>
            <p className='text-muted '>{gameInfo.description}</p>
            <h3 className='text-muted'>Minimun System Requirements: </h3>
            {/* <p className='text-muted '>{gameInfo.minimum_system_requirements["graphics"]}</p> */}
          
          </div>
        </div>
      </div>
      </> 
     
 )
}
