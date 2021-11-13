import React from 'react'
import './Home.css';
import logoHome from '../../img/logoHome.svg'
import logoGithub from '../../img/gitIcon.png'

const Home = () => {
    return (
      <div className="homeContainer">
      <div className="main container">
        <img src={logoHome} className="homeLogo" alt="logoHome" />
        <h1>Pineapple Supermarket App</h1>
        <h2>Welcome</h2>
      </div>
      <footer>
        <a className="nav-link textoGit" href="https://github.com/Pineapple-G13">GitHub-Team G13</a>
        <p className="fs-6 fw-light textoDev " >Developed by Adriana Jimenez, Shel Valdez, Valentina, Vilma Garcia </p>
        <img src={logoGithub} className="headerIcon" alt="logoGithub" />
      </footer>
    </div>
    )
}

export default Home
