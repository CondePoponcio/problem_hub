
import React, { useState, useEffect } from "react";

const Room = (props) => {
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
    return(
        
        <div>
            <p>
                Esta es una room page
            </p>
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

    )
    
    
};


export default Room;

