import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import CSRFToken from "../components/csrftoken"
import NavAdmin from "../components/NavAdmin";




const scraper = (props) => {
    const { user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();

    const call_scrapy = async (e) => {
        e.preventDefault()
        const accessToken = await getAccessTokenSilently()
        const requestOptions = {
            method: "POST",
            headers: { Accept: 'application/json', "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify({
                'categoria':e.target[1]["value"], 'dificultad':e.target[2]["value"]
            }),
        };
        fetch('/administracion/scraper', requestOptions).then((response) => response.json())
        .then((json) =>{
            console.log("Boton : ",json);      
        })
    }

    return(
        
        <div className="grid">
            <div className="sideBar">
                <div>
                </div>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
            <div className="content">
                <form method="POST" onSubmit={(event)=>{call_scrapy(event)}}>
                    <CSRFToken />
                    <p>Ingrese la categoria:</p>
                    <input type="text" name="Categoria" placeholder="Ingresar Categoria"></input>
                    <p>Ingrese la Dificultad:</p>
                    <input type="text" name="Dificultad" placeholder="Ingresar Dificultad"></input>
                    <br/>
                    <button type="submit">Agregar</button>
                </form>             
            </div>
        </div>

    )
    
    
};


export default scraper;