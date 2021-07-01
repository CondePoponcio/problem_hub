import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import CSRFToken from "../components/csrftoken"



const crearRamo = (props) => {
    const { user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();

    const agregarRamo = async (e) => {
        e.preventDefault()
        const accessToken = await getAccessTokenSilently()
        const requestOptions = {
            method: "POST",
            headers: { Accept: 'application/json', "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify({
                'id':e.target[1]["value"], 'programa':e.target[3]["value"], 'nombre':e.target[2]["value"]
            }),
        };
        fetch('/administracion/crear_ramo', requestOptions).then((response) => response.json())
        .then((json) =>{
            console.log("Boton : ",json);      
        })
        return  <Redirect  to="/crear_ramo" />
    }

    return(
        
        <div className="grid">
            <TopNavBar/>
            <div className="sideBar">
                <div>
                </div>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
            <div className="content">
                <form method="POST" onSubmit={(event)=>{agregarRamo(event)}}>
                    <CSRFToken />
                    <input type="text" name="Id" placeholder="Ingresar ID"></input>
                    <input type="text" name="Nombre" placeholder="Ingresar Nombre"></input>
                    <textarea type="text" name="Programa" placeholder="Ingresar Programa"></textarea>
                    <button type="submit">Agregar</button>
                </form>             
            </div>
        </div>

    )
    
    
};


export default crearRamo;