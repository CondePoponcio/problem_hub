import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import CSRFToken from "../components/csrftoken"


const crearCurso = (props) => {
    const [datos, setDatos] = useState([]) 
    const [curso, setCurso] = useState([])
    const [show, setShow] = useState(false)
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
            setCurso(json.data)
            setShow(!show)
        })
    }
    
    const agregarUsuarios = async (e) => {
        e.preventDefault()
        const accessToken = await getAccessTokenSilently()
        const requestOptions = {
            method: "POST",
            headers: { Accept: 'application/json', "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify({
                'usuarios':e.target[1]["value"], 'curso_id':curso.id
            }),
        };
        fetch('/administracion/agregar_miembros', requestOptions).then((response) => response.json())
        .then((json) =>{
            console.log("Boton : ",json);      
        })
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
            {show ? (
                <div className="content">
                    <form method="POST" onSubmit={(event)=>{agregarCurso(event)}}>
                        <CSRFToken />
                        <select name="codigo_ramo">
                            <option key="NULL" value="NULL">NULL</option>
                            {datos.map((row) => (
                                <option key={row.id} value={row.id}>{row.nombre}</option>
                            ))}
                        </select>
                        <input name="seccion" type="text" placeholder="Ingresar Seccion"></input>
                        <input name="semestre" type="text" placeholder="Ingresar Semestres"></input>
                        <input name="año" type="text" placeholder="Ingresar Año"></input>
                        <button type="submit">Agregar</button>
                    </form>             
                </div>
            ) : (
                <div className="content">
                    <form>
                        <CSRFToken />
                        <select name="codigo_ramo">
                            <option key="NULL" value="NULL">NULL</option>
                            {datos.map((row) => (
                                <option key={row.id} value={row.id}>{row.nombre}</option>
                            ))}
                        </select>
                        <input name="seccion" type="text" placeholder="Ingresar Seccion" disabled></input>
                        <input name="semestre" type="text" placeholder="Ingresar Semestres" disabled></input>
                        <input name="año" type="text" placeholder="Ingresar Año" disabled></input>
                    </form>
                    <form method="POST" onSubmit={(event)=>{agregarUsuarios(event)}}>
                        <CSRFToken />
                        <textarea name="Usuarios"></textarea>
                        <button type="submit">Agregar</button>
                    </form>                
                </div>
            )}
        </div>

    )
    
    
};


export default crearCurso;
