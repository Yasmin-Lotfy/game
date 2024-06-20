import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GameRendering from '../GameRendering/GameRendering';

export default function All() {
  let [recomendedGamed, setRecomendedGamed] = useState([]);

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
 


  
  return (
    <>
   
    <GameRendering item={recomendedGamed}/>
   
    </>
  )
}
