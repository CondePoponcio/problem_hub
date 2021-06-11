
import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
const Inicio = (props) => {
    const [datos, setDatos] = useState([])
    useEffect(()=>{
        
        fetch('http://localhost:8000/api/problemas', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((json) =>{
            console.log("Hola soy : ",json);
            //alert("Hola")
        })

    },[])

    return(
        
        <div className="grid">
            <div className="topBar">
                <h2>Problem <span>Hub</span></h2>

                <a href="#">Iniciar Sesión</a>
            </div>
            <div className="sideBar">

            </div>
            <div className="content">


                <button onClick={()=>{
                    var csrftoken = getCookie('csrftoken');
                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken},
                        body: JSON.stringify({
                            'titulo':'Problema4', 'categoria':'Árboles', 'dificultad':'medio', 'enunciado':'Usted se sacó un 1', 'casos_prueba':{'data':1}, 'origen':1, 'curso_id':1
                        }),
                    };
                    fetch('/api/crear', requestOptions).then((response) => response.json())
                    .then((json) =>{
                        console.log("Boton : ",json);
                        
                    })
                }}>Enviar</button>
                
            </div>
        </div>

    )
    
    
};


export default Inicio;

