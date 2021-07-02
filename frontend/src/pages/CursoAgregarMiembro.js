import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import CSRFToken from "../components/csrftoken"
import { Redirect } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";



const CursoAgregarMiembro = (props) => {
    const [datos, setDatos] = useState([])
    const [id, setId] = useState()
    const { user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();

    useEffect(()=>{
        var id = props.match.params.id
        setId(parseInt(id))
        var URL = '/administracion/curso/'+id
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
    
        
    const agregarUsuarios = async (e) => {
        e.preventDefault()
        var id = props.match.params.id
        const accessToken = await getAccessTokenSilently()
        const requestOptions = {
            method: "POST",
            headers: { Accept: 'application/json', "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify({
                'usuarios':e.target[1]["value"], 'curso_id':id
            }),
        };
        fetch('/administracion/agregar_miembros', requestOptions).then((response) => response.json())
        .then((json) =>{
            console.log("Boton : ",json);
            setUsuarios(json.data)
            window.location.href = window.location.href;      
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
                <div>
                    <p>Curso: {datos.nombre} Sección: {datos.seccion} Semestre: {datos.semestre} Año: {datos.año}</p>
                    <form method="POST" onSubmit={(event)=>(agregarUsuarios(event))}>
                        <CSRFToken />
                        <p>Ingrese los mails de los usuarios con comas entre medio:</p>
                        <textarea name="usuarios"></textarea>
                    <button>Agregar</button>
                    </form>
                    <a href={"/dashboard/cursoAdmin/"+id}>Atras</a>
                </div>
        </div>

    )
    
    
};


export default CursoAgregarMiembro;