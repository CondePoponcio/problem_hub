import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import CSRFToken from "../components/csrftoken"
import { Redirect } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";



const CursoEditarMiembros = (props) => {
    const [datos, setDatos] = useState([])
    const [id, setId] = useState()
    const [miembros, setMiembros] = useState([]) 
    const [show, setShow] = useState(true)
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
                datosMiembros()
            }  
        })
    },[])
    
    const datosMiembros = () => {
        var id = props.match.params.id
        fetch('/administracion/miembros_curso/'+id, {
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
        
    const editarMiembros = async (e) => {
        e.preventDefault()
        console.log(e)
        console.log(e.target)
        var largo = e.target["length"]
        console.log(largo)
        let tipos = []
        let usuarios = []
        for(var i=1;i<(largo-1);i++){
            tipos.push(String(e.target[i]["checked"]))
            if(i%2==0){
                usuarios.push(String(e.target[i]["name"]))
            }
        }
        const accessToken = await getAccessTokenSilently()
        fetch('/administracion/editar_miembros/'+id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                'data':tipos, 'usuarios_id':usuarios
            }),
        }).then((response) => response.json())
        .then((json) =>{
            window.location.href = window.location.href;
        })
    }
    const revisar = (tipo) => {
        if(tipo == "Alumno"){
            return "checked"
        }
        else{
            return false
        }        
    }
    const revisar2 = (tipo) => {
        if(tipo == "Docente"){
            return "checked"
        }
        else{
            return false
        }        
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
                    <form method="POST" onSubmit={(event)=>(editarMiembros(event))}>
                        <CSRFToken />
                    {miembros.map((row) => (
                        <div>
                            <span key={row.id}>{row.nombres + " "+ row.apellidos}
                            <input type="radio" name={row.id} value="Alumno" defaultChecked={revisar(row.tipo)}/>Alumno
                            <input type="radio" name={row.id} value="Docente" defaultChecked={revisar2(row.tipo)}/>Docente
                            </span>
                        </div>
                    ))}
                    <button>Cambiar</button>
                    </form>
                    <a href={"/dashboard/cursoAdmin/"+id}>Atras</a>
                </div>
        </div>

    )
    
    
};


export default CursoEditarMiembros;