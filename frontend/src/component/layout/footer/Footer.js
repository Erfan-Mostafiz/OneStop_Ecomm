import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import logo from "../../../images/logo indigo.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer id = "footer">
        <div class = "leftFooter">
            <h4>DOWNLOAD OUR ONESTOP APP</h4>
            <p>Download app for IOS and Android phones</p>
            <img id = "storeLink" src={appStore} alt="appStore" />
            <img id = "storeLink" src= {playStore} alt="playStore" />

        </div>

        <div class = "midFooter">
            <img id ="logo" src={logo} alt="OneStop Logo" />
            {/* <h1>OneStop</h1>
            <p>YOUR ONESTOP MARKET FOR EVERYTHING</p> */}
            <p>Copyrights 2023 &copy; <a href="https://github.com/Erfan-Mostafiz">Erfan Mostafiz</a></p>

        </div>

        <div class = "rightFooter">
            <h4>FOLLOW US</h4>
            <a href="https://github.com/Erfan-Mostafiz">GitHub</a>
            <a href="https://www.linkedin.com/in/erfan-mostafiz/">LinkedIn</a>
            <a href="https://www.facebook.com/erfan.mostafiz/">FaceBook</a>
            <a href="https://www.instagram.com/erfan_mostafiz/">Instagram</a>

        </div>

    </footer>
    
    
  );
};

export default Footer