import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import style from './Navbar.module.scss'

export default function Navbar({userTokenProfile, logOut}) {
  // console.log(userTokenProfile)
  return (
    <>
    <nav className={`navbar navbar-expand-lg navbar-dark ${style.navBorder}`}>
  <div className="container">
    <Link className={`navbar-brand ${style.navStyle} ${style.whiteText}`} to=''>
      <img src={logo} className={style.logo} alt="" />
      Game Over
      </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userTokenProfile?  <ul className="navbar-nav me-auto ps-md-5 mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${style.whiteText}`} aria-current="page" to=''>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${style.whiteText}`} to='all'>All</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className={`nav-link dropdown-toggle ${style.whiteText} `} to='plat' role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Platforms
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to='pc'>Pc</Link></li>
            <li><Link className="dropdown-item"to='browser'>Browser</Link></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <Link className={`nav-link dropdown-toggle ${style.whiteText} `} to='sort' role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort-by
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to='release'>Release Date</Link></li>
          <li><Link className="dropdown-item"to='pop'>Popularity</Link></li>
          <li><Link className="dropdown-item"to='alpha'>Alphapetical</Link></li>
          <li><Link className="dropdown-item"to='relevence'>Relevance</Link></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <Link className={`nav-link dropdown-toggle ${style.whiteText} `} to='cat' role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to='race'>Racing</Link></li>
          <li><Link className="dropdown-item"to='sports'>Sports</Link></li>
          <li><Link className="dropdown-item"to='social'>Social</Link></li>
          <li><Link className="dropdown-item"to='shot'>Shotter</Link></li>
          <li><Link className="dropdown-item"to='open'>Open-world</Link></li>
          <li><Link className="dropdown-item"to='zom'>Zombie</Link></li>
          <li><Link className="dropdown-item"to='fant'>Fantacy</Link></li>
          <li><Link className="dropdown-item"to='actrpg'>Action-rpg</Link></li>
          <li><Link className="dropdown-item"to='act'>Action</Link></li>
          <li><Link className="dropdown-item"to='flight'>Flight</Link></li>
          <li><Link className="dropdown-item"to='battle'>Battle-Royal</Link></li>
          </ul>
        </li>
      </ul> :''}

     
      <form className="d-flex ms-auto" role="search">
        {userTokenProfile? <>
        <Link className="btn btn-outline-info mx-2" to='profile'>User Profile: <span className='fw-bolder text-white text-decoration-underline'>{userTokenProfile.first_name}</span> </Link>
        <span onClick={logOut} className="btn btn-outline-info mx-2" to=''>Log Out</span>
        </>:<>
        <Link className="btn btn-outline-info mx-2" to='log' >Log In</Link>
        <Link className="btn btn-outline-info mx-2" to='reg'>Join Free</Link>
        </> }
      </form>
    </div>
  </div>
</nav>

    </>
  )
}
