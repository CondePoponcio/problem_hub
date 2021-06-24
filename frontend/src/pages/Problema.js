
import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";

const Problema = (props) => {
    const [datos, setDatos] = useState([])
    const { user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();
    useEffect(()=>{
        const getDataProblem = async () => {
            console.log("Estos son los props:", props)
            var id = props.match.params.id
            const accessToken = await getAccessTokenSilently()
            console.log("URL: ", '/api/problema/',parseInt(id))
            fetch('/api/problema/'+parseInt(id), {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }).then((response) => response.json())
            .then((json) =>{
                console.log("Hola soy : ",json);
                //alert("Hola")
                if(json.data){
                    setDatos(json.data)
                }
                
            })
        }
        getDataProblem();
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

