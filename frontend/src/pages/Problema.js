
import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import './../components/TopNavbar';

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
            <TopNavBar/>
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
                    <div>Categorías: </div>
                    <p>
                        {(datos.categoria)?datos.categoria.map((value, index) => {
                            return (<span key={index}>{value + " | "}</span>)
                        }):null}
                    </p>

                </div>
                <p>
                    {datos.enunciado}
                </p>
                <p className="inputProblems">
                    Valores de entrada y salida:
                    <ul>
                        {(datos.casos_prueba)?datos.casos_prueba.map((value, index) => {
                            console.log("Datos de prueba: ", value, datos.casos_prueba.length)
                            if(datos.casos_prueba.length != index + 1){
                                return (<li key={index}>{value + " | "}</li>)
                            }
                            
                        }):null}
                    </ul>
                </p>
            </div>
            :<div className="loading">
                
            </div>}
        </div>

    )
    
    
};


export default Problema;

