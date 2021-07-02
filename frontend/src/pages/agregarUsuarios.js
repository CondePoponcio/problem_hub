import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from '../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import CSRFToken from "../components/csrftoken"
import NavAdmin from "../components/NavAdmin";



const crearCurso = (props) => {
    const [datos, setDatos] = useState([]) 
    const { user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();

    const agregarUsuarios = async (e) => {
        e.preventDefault()
        const accessToken = await getAccessTokenSilently()
        const requestOptions = {
            method: "POST",
            headers: { Accept: 'application/json', "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify({
                'nombres':e.target[1]["value"], 'apellidos':e.target[2]["value"], 'correo':e.target[3]["value"], 'contraseña':e.target[4]["value"]
            }),
        };
        fetch('/administracion/agregar_usuario', requestOptions).then((response) => response.json())
        .then((json) =>{
            console.log("Boton : ",json);      
        })
    }


    return(
        
        <div className="grid">
            <NavAdmin/>
            
            <div className="content">
                <form method="POST" onSubmit={(event)=>{agregarUsuarios(event)}}>
                    <CSRFToken />
                    <input name="nombre" tupe="text" placeholder="Ingresar Nombre"></input>
                    <input name="apellido" tupe="text" placeholder="Ingresar Apellido"></input>
                    <input name="correo" tupe="text" placeholder="Ingresar Correo"></input>
                    <input name="contraseña" tupe="text" placeholder="Ingresar Contraseña"></input>

                    <button type="submit">Agregar</button>
                </form>             
            </div>
        </div>

    )
    
    
};


export default crearCurso;