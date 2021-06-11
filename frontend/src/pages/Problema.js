
import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'

const Problema = (props) => {
    const [datos, setDatos] = useState([])
    useEffect(()=>{
        console.log("Estos son los props:", props)
        var id = props.match.params.id
        console.log("URL: ", '/api/problema/',parseInt(id))
        fetch('/api/problema/'+parseInt(id), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((json) =>{
            console.log("Hola soy : ",json);
            //alert("Hola")
            if(json.data){
                setDatos(json.data)
            }
            
        })

    },[])

    return(
        
        <div className="grid">
            <div className="topBar navbar">
                <a href={"/"} className="logo">Problem <span>Hub</span></a>

                <a href="#"  className="inicio">Iniciar Sesión</a>
            </div>
            <div className="sideBar">
                <div>
                </div>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
            {(datos)?            
            <div className="content-problem">

                <h3>{datos.titulo}</h3>
                <div className="cat-problem">
                    <div>Categorías:</div>
                    <ul>
                        {(datos.categoria)?datos.categoria.map((value, index) => {
                            return (
                                <li key={index}>
                                    {value}
                                </li>
                            )
                        }):null}
                    </ul>

                </div>
                <p>
                    {datos.enunciado}
                </p>
            </div>
            :<div className="loading">
                
            </div>}
        </div>

    )
    
    
};


export default Problema;

