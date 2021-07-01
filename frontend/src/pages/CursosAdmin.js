import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import CSRFToken from "../components/csrftoken"
import NavAdmin from "../components/NavAdmin";



const CursosAdmin = (props) => {
    const [datos, setDatos] = useState([]) 
    const { user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();

    useEffect(()=>{
        var URL = '/administracion/cursos'
        fetch(URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((json) =>{
            if(json.data){
                setDatos(json.data)
            }  
        })
        

    },[])

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
            <ul>
            {datos.map((row) => (
                <li key={row.id}>
                    <h2>{row.nombre}</h2>
                    <p>Sección: {row.seccion} Semestre: {row.semestre} Año: {row.año}</p>
                    <a href={"/cursoAdmin/"+row.id}>Ver Curso</a>
                </li>
            ))}
            </ul>
        </div>

    )
    
    
};


export default CursosAdmin;