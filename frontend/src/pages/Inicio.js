
import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import Tabla from './../components/Tabla'
import TopNavBar from './../components/TopNavbar';
const Inicio = (props) => {
    const [datos, setDatos] = useState([])
    useEffect(()=>{
        
        fetch('/api/problemas', {
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
            <TopNavBar/>
            <button onClick={()=>{
                fetch('/api/dermacne', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => response.json())
                .then((json) =>{
                    console.log("Hola soy : ",json);
                    
                    
                })
            }}>Api python</button>
            <div className="content">

                <Tabla problemas={datos}/>
                {
                /*
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
                */
                }
                
            </div>
        </div>

    )
    
    
};


export default Inicio;

