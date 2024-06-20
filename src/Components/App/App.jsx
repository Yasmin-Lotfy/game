import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MasterLayout from '../MasterLayout/MasterLayout';
import Home from '../Home/Home';
import All from '../All/All';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Notfound from '../Notfound/Notfound';
import './App.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import axios from 'axios';
import GameRendering from '../GameRendering/GameRendering.jsx';
import DetailedGame from '../DetailedGame/DetailedGame';




function App() {
  const [userTokenProfile, setUserTokenProfile] = useState(null);
  const [categoryPc, setCategoryPc] = useState([]);
  const [categoryBrowser, setCategoryBrowser] = useState([]);
  const [sortAlpha, setSortAlpha] = useState([]);
  const [sortRelease, setSortRelease] = useState([]);
  const [sortRele, setSortRele] = useState([]);
  const [sortPopularity, setsortPopularity] = useState([]);
  const [catShotter, setCatShotter] = useState([]);
  const [catRacting, setCatRacing] = useState([]);
  const [catSports, setCatSports] = useState([]);
  const [catSocial, setCatSocial] = useState([]);
  const [catOpenWorld, setCatOpenWorld] = useState([]);
  const [catZombie, setCatZombie] = useState([]);
  const [catFantacy, setCatFantacy] = useState([]);
  const [catActionRPG, setCatActionRPG] = useState([]);
  const [catAction, setCatAction] = useState([]);
  const [catFlight, setCatFlight] = useState([]);
  const [catRoyal, setCatRoyal] = useState([]);

  

  let getuserDataToken =()=>{
    if(localStorage.getItem("userToken")){
      let userEncoded = localStorage.getItem("userToken");
      let userDecoded = jwtDecode(userEncoded);
      setUserTokenProfile(userDecoded);
    }
  }

  let getApiAllCategories =async ( platform,callback)=>{
    
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: platform,
      headers: {
        'X-RapidAPI-Key': '93e03a98d2msh028f2497b0ae015p1993fejsncab5244ec9a7',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data)
      callback(response.data);
    }).catch(function (error) {
      console.error(error);
    });

}

 useEffect(() => {
  getuserDataToken();
  getApiAllCategories({platform:"pc"},setCategoryPc);
  getApiAllCategories({platform:"browser"},setCategoryBrowser);
  getApiAllCategories({'sort-by': 'alphabetical'},setSortAlpha);
  getApiAllCategories({'sort-by': 'release-date'},setSortRelease);
  getApiAllCategories({'sort-by': 'relevance'},setSortRele);
  getApiAllCategories({'sort-by': 'popularity'},setsortPopularity);
  getApiAllCategories({category: 'shooter'},setCatShotter);
  getApiAllCategories({category: 'racing'},setCatRacing);
  getApiAllCategories({category: 'sports'},setCatSports);
  getApiAllCategories({category: 'social'},setCatSocial);
  getApiAllCategories({category: 'open-world'},setCatOpenWorld);
  getApiAllCategories({category: 'zombie'},setCatZombie);
  getApiAllCategories({category: 'fantasy'},setCatFantacy);
  getApiAllCategories({category: 'action-rpg'},setCatActionRPG);
  getApiAllCategories({category: 'action'},setCatAction);
  getApiAllCategories({category: 'flight'},setCatFlight);
  getApiAllCategories({category: 'battle-royale'},setCatRoyal);
  

 }, [])

 

let routes = createBrowserRouter([
  {path:'/', element:<MasterLayout setUserTokenProfile={setUserTokenProfile} userTokenProfile={userTokenProfile}/>,errorElement:<Notfound/>, children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'all',element:<ProtectedRoute><All/></ProtectedRoute>},
    {path:'details/:id',element:<ProtectedRoute><DetailedGame/></ProtectedRoute>},
    {path:'log',element:<Login getuserDataToken={getuserDataToken}/>},
    {path:'reg',element:<Register/>},
    {path:'pc',element:<ProtectedRoute><GameRendering item={categoryPc}/></ProtectedRoute>},
    {path:'release',element:<ProtectedRoute><GameRendering item={sortRelease}/></ProtectedRoute>},
    {path:'pop',element:<ProtectedRoute><GameRendering item={sortPopularity}/></ProtectedRoute>},
    {path:'alpha',element:<ProtectedRoute> <GameRendering item={sortAlpha}/></ProtectedRoute>},
    {path:'relevence',element:<ProtectedRoute><GameRendering item={sortRele}/></ProtectedRoute>},
    {path:'race',element:<ProtectedRoute> <GameRendering item={catRacting}/></ProtectedRoute>},
    {path:'sports',element:<ProtectedRoute> <GameRendering item={catSports}/></ProtectedRoute>},
    {path:'social',element:<ProtectedRoute> <GameRendering item={catSocial}/></ProtectedRoute>},
    {path:'shot',element:<ProtectedRoute> <GameRendering item={catShotter}/></ProtectedRoute>},
    {path:'open',element:<ProtectedRoute><GameRendering item={catOpenWorld}/></ProtectedRoute>},
    {path:'zom',element:<ProtectedRoute> <GameRendering item={catZombie}/></ProtectedRoute>},
    {path:'fant',element:<ProtectedRoute><GameRendering item={catFantacy}/></ProtectedRoute>},
    {path:'actrpg',element:<ProtectedRoute><GameRendering item={catActionRPG}/></ProtectedRoute>},
    {path:'act',element:<ProtectedRoute> <GameRendering item={catAction}/></ProtectedRoute>},
    {path:'flight',element:<ProtectedRoute><GameRendering item={catFlight}/></ProtectedRoute>},
    {path:'battle',element:<ProtectedRoute><GameRendering item={catRoyal}/></ProtectedRoute>},
    {path:'browser',element:<ProtectedRoute><GameRendering item={categoryBrowser}/></ProtectedRoute>},
    {path:'profile',element:<ProtectedRoute><Profile userTokenProfile={userTokenProfile}/></ProtectedRoute>},
  ]}
])

  return (
    <>
    <RouterProvider router={routes}/>
    </>
    
  )
}

export default App;
