import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import CSRFToken from "../components/csrftoken"
import { Redirect } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";



const CursoAdmin = (props) => {
    const [datos, setDatos] = useState([])
    const [id, setId] = useState()
    const [miembros, setMiembros] = useState([]) 
    const [show, setShow] = useState(true)
    const { user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();

    useEffect(()=>{
        var aux = props.match.params.id
        setId(parseInt(aux))
        var URL = '/administracion/curso/'+aux
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
                datosMiembros()
            }  
        })
    },[])
    
    const datosMiembros = () => {
        var aux = props.match.params.id
        fetch('/administracion/miembros_curso/'+parseInt(aux), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((json) =>{
            setMiembros(json.data)     
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
                    {miembros.map((row) => (
                        <ul>
                            <li key={row.id}>{row.nombres + " "+ row.apellidos}</li>
                        </ul>
                    ))}
                    <a href={"/dashboard/cursoAgregarMiembro/"+id}>Agregar Miembros</a>
                    <a href={"/dashboard/cursoEditarMiembros/"+id}>Editar tipo de miembro</a>

                </div>
        </div>

    )
    
    
};


export default CursoAdmin;