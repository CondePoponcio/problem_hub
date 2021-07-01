import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import CSRFToken from "../components/csrftoken"
import { Redirect } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";



const CursoAdmin = (props) => {
    const [datos, setDatos] = useState([])
    const [miembros, setMiembros] = useState([]) 
    const [show, setShow] = useState(true)
    const { user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();

    useEffect(()=>{
        var id = props.match.params.id
        var URL = '/administracion/curso/'+parseInt(id)
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
        fetch('/administracion/miembros_curso/'+parseInt(id), {
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
    const editarEnunciado = async (e) => {
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
        var id = props.match.params.id
        const accessToken = await getAccessTokenSilently()
        fetch('/administracion/editar_miembros/'+parseInt(id), {
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
        })
        return  <Redirect  to="/cursoAdmin/:id" />
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
            <NavAdmin/>
            <div className="sideBar">
                <div>
                </div>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
            {show ? (
                <div>
                    <p>Curso: {datos.id} Sección: {datos.seccion} Semestre: {datos.semestre} Año: {datos.año}</p>
                    <button onClick={()=>(setShow(!show))}>Editar tipo usuario</button>

                </div>

            ) : (
                <div>
                    <p>Curso: {datos.id} Sección: {datos.seccion} Semestre: {datos.semestre} Año: {datos.año}</p>
                    <button onClick={()=>(setShow(!show))}>Cancelar</button>
                    <form method="POST" onSubmit={(event)=>(editarEnunciado(event))}>
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
                </div>
            )}

        </div>

    )
    
    
};


export default CursoAdmin;