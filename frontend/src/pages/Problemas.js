import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import Tabla from './../components/Tabla'
import { Filtro } from "../components/Filtro";

const Inicio = (props) => {
    const [datos, setDatos] = useState([]) //datos de los problemas de la base de datos
    if(props.location.search != ""){
        var data = props.location.search
        data = data.replace("?", "")
    }
    else{
        var data = "none"
    }
    useEffect(()=>{
        var URL = '/api/problemas/'+String(data)
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

    return(
        
        <div className="grid">
            <div className="topBar navbar">
                <a href={"/home"} className="logo">Problem <span>Hub</span></a>

                <a href="#" className="inicio">Iniciar Sesión</a>
            </div>
            <div className="sideBar">
                <div>
                </div>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
            <div>
                <Filtro/>
            </div>
            <div className="content">
                <Tabla problemas={datos}/>
                {}                
            </div>
        </div>

    )
    
    
};


export default Inicio;

