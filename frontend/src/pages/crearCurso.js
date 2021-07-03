import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import CSRFToken from "../components/csrftoken"
import NavAdmin from "../components/NavAdmin";


const crearCurso = (props) => {
    const [datos, setDatos] = useState([]) 
    const { user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();

    useEffect(()=>{
        var URL = '/api/ramos'
        console.log(URL)
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

    const agregarCurso = async (e) => {
        e.preventDefault()
        const accessToken = await getAccessTokenSilently()
        const requestOptions = {
            method: "POST",
            headers: { Accept: 'application/json', "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify({
                'codigo_ramo':e.target[1]["value"], 'seccion':e.target[2]["value"], 'año':e.target[4]["value"], 'semestre':e.target[3]["value"]
            }),
        };
        fetch('/administracion/crear_curso', requestOptions).then((response) => response.json())
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
                    <form method="POST" onSubmit={(event)=>{agregarCurso(event)}}>
                        <CSRFToken />
                        <p>Ramo:</p>
                        <select name="codigo_ramo">
                            <option key="NULL" value="NULL">NULL</option>
                            {datos.map((row) => (
                                <option key={row.id} value={row.id}>{row.nombre}</option>
                            ))}
                        </select>
                        <p>Ingrese Sección:</p>
                        <input name="seccion" type="text" placeholder="Ingresar Sección"/>
                        <p>Ingrese Semestre:</p>
                        <input name="semestre" type="text" placeholder="Ingresar Semestres"/>
                        <p>Ingrese Año:</p>
                        <input name="año" type="text" placeholder="Ingresar Año"/>
                        <br/>
                        <button type="submit">Agregar</button>
                    </form>             
                </div>
        </div>

    )
    
    
};


export default crearCurso;
