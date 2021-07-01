
import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import TopNavBar from './../components/TopNavbar';
import { useAuth0 } from "@auth0/auth0-react";
import CSRFToken from "../components/csrftoken"


const Problema = (props) => {
    const [datos, setDatos] = useState([])
    const {user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();
    const [show, setShow] = useState(false)
    const [id, setId] = useState()
    const [enunciado, setEnunciado] = useState("")
    useEffect(()=>{
        const getDataProblem = async () => {
            console.log("Estos son los props:", props)
            var id = props.match.params.id
            setId(parseInt(id))
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

    const cambiarEnunciado = async (e) => {
        e.preventDefault()
        const accessToken = await getAccessTokenSilently()
        const requestOptions = {
            method: "POST",
            headers: { Accept: 'application/json', "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify({
                'enunciado':e.target[1]["value"]
            }),
        };
        fetch('/api/problema/edit'+parseInt(id), requestOptions).then((response) => response.json())
        .then((json) =>{
            console.log("Boton : ",json);      
        })
    }

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
                {show ? (
                    <div>
                        <form method="POST" onSubmit={(event)=>{cambiarEnunciado(event)}}>
                            <CSRFToken />
                            <textarea name="editorEnunciado" placeholder={datos.enunciado} onChange={e=>{setEnunciado(e.target.value);}}></textarea>
                            <br></br>
                            <button type="submit">Confirmar</button>
                        </form>
                        <div className="inputProblems">
                            Valores de entrada y salida:
                            <ul>
                                {(datos.casos_prueba)?datos.casos_prueba.map((value, index) => {
                                    console.log("Datos de prueba: ", value, datos.casos_prueba.length)
                                    if(datos.casos_prueba.length != index + 1){
                                        return (<li key={index}>{value + " | "}</li>)
                                    }
                                                    
                                }):null}
                            </ul>
                        </div>
                        <button onClick={()=>{setShow(!show);}}>Cancelar</button>
                    </div>
                ) :
                    (<div>
                        <div className="inputProblems">
                                Valores de entrada y salida:
                                <ul>
                                    {(datos.casos_prueba)?datos.casos_prueba.map((value, index) => {
                                        console.log("Datos de prueba: ", value, datos.casos_prueba.length)
                                        if(datos.casos_prueba.length != index + 1){
                                            return (<li key={index}>{value + " | "}</li>)
                                        }
                                        
                                    }):null}
                                </ul>
                        </div>
                        <button onClick={()=>{setShow(!show);}}>Editar</button>
                    </div>)
                } 
  
            </div>
            :<div className="loading">
                
            </div>}
        </div>

    )
    
    
};


export default Problema;

