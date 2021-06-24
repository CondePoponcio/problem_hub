
import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import { useAuth0 } from "@auth0/auth0-react";

const TopNavBar = (props) => {
    const { user, isAuthenticated} = useAuth0();
    console.log("Datos en home: ", user, isAuthenticated)
    return(
        
        <div className="topBar navbar">
            <a href={"/home"} className="logo">Problem <span>Hub</span></a>

            {!isAuthenticated?(<a href={"/"}  className="inicio">Iniciar Sesión</a>):(<img src={user.picture} alt={user.name} />)}
        </div>

    )
    
    
};


export default TopNavBar;

