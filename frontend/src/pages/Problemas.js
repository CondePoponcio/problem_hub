import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import Tabla from './../components/Tabla'
import { Filtro } from "../components/Filtro";
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import $ from 'jquery';
import dt from 'datatables.net';
const Problemas = (props) => {
    const [datos, setDatos] = useState([]) //datos de los problemas de la base de datos
    const { user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();
    const [prohibido, setProhibido] = useState(false)
    const getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    if(props.location.search != ""){
        var data = props.location.search
        data = data.replace("?", "")
    }
    else{
        var data = "none"
    }
    useEffect(async()=>{
        const accessToken = await getAccessTokenSilently()
        var csrftoken = await getCookie('csrftoken');
        
        var URL = '/api/problemas/'+String(data)
        const datos_curso = props.location.data;
        console.log("Dame los datos para pedir problemas: ", props.match.params.id)
        console.log(URL)
        fetch(URL, {
            method: 'POST',
            headers: { Accept: 'application/json', "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`, 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                'correo': user.email,
                'tipo': 'docente', 
                'curso': props.match.params.id
            }),
        }).then((response) => response.json())
        .then((json) =>{
            if(json.data){
                setDatos(json.data)
                
            }
            else{
                setProhibido(true)
            }
        })

    },[])
    if(prohibido){
        return (<div className="grid">
            
        <h1>No puedes acceder a este apartado</h1>
        
    </div>)
    }
    return(
        
        <div className="grid">
            
            <div className="content">
                <Filtro/>
                <Tabla problemas={datos} curso_id={props.match.params.id}/>                
            </div>
            
        </div>

    )
    
    
};


export default Problemas;

