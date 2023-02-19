import React from 'react'
import {ReactNavbar} from "overlay-navbar"
import logo from "../../../images/logo-no-background.png"
import {MdAccountCircle} from "react-icons/md";
import {MdSearch} from "react-icons/md";
import {MdAddShoppingCart} from "react-icons/md";

const options = {
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    navColor1: "#E5E0FF",
    logoHoverSize: "10px",
    logoHoverColor: "#80489C",
    logoTransition: 0.5,
    // nav1alignItems: "center",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About", 
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#C47AFF",
    link1Margin: "1vmax",
    // link2Margin: "1vmax",
    // link3Margin: "1vmax",
    // link4Margin: "1vmax",
    profileIconUrl: "/login",
    profileIcon:true,
    profileIconColor:"rgba(35, 35, 35,0.8)",
    ProfileIconElement:MdAccountCircle,
    searchIcon:true,
    searchIconColor: "rgba(35, 35, 35,0.8)",
    SearchIconElement:MdSearch,
    cartIcon:true,
    cartIconColor: "rgba(35, 35, 35,0.8)",
    CartIconElement:MdAddShoppingCart,
    profileIconColorHover: "#C47AFF",
    searchIconColorHover: "#C47AFF",
    cartIconColorHover: "#C47AFF",
    cartIconMargin: "1vmax",
   
  };
  
  const Header = () => {
    return     <ReactNavbar {...options} />
  
  };


// const Header = () => {
// return (
//     <ReactNavbar 
//         burgerColor = "#eb4034" 
//         burgerColorHover = "#a62d24"
//         logo = {logo} 
//         logoWidth = "20vmax"
//         navColor1 = "white"
//         logoHoverSize = "10px"
//         logoHoverColor = "#eb4034"
//         link1Text = "Home"
//         link2Text = "Products"
//         link3Text = "Contact"
//         link4Text = "About"
//         link1Url = "/"
//         link2Url = "/products"
//         link3Url = "/contact"
//         link4Url = "/about"
//         link1Size = "1.3vmax"
//         link1Color = "rgba(35, 35, 35,0.8)"
//         nav1justifyContent = "flex-end"
//         nav2justifyContent = "flex-end"
//         nav3justifyContent = "flex-start"
//         // nav4justifyContent = "flex-start"
//         link1ColorHover = "#eb4034"
//         link2ColorHover = "#eb4034"
//         link3ColorHover = "#eb4034"
//         link4ColorHover = "#eb4034"
//         // link1Margin = "1vmax"
        
//         link2Margin = "1vmax"
//         link3Margin = "0"
//         link4Margin = "1vmax"
//         profileIconColor = "rgba(35, 35, 35,0.8)"
//         // searchIcon = {true}
//         searchIconColor = "rgba(35, 35, 35,0.8)"
//         cartIconColor = "rgba(35, 35, 35,0.8)"
//         profileIconUrl = "/login"
//         profileIconColorHover = "#eb4034"
//         searchIconColorHover = "#eb4034"
//         cartIconColorHover = "#eb4034"
//         cartIconMargin = "1vmax"
//         />


// );
// };


export default Header