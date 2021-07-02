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
    const jQuerycode = (data) => {
        return 3;
        var table = $('#newTable').DataTable(
            {
                "processing": true,
                "serverSide": true,
                ajax: {
                    url: '/api/public',
                    "type": "POST",
                    dataFilter: function(data){
                        console.log("DataTablkes: ",data)
                        return []
                        /*
                        var json = data.map(item => {
                            var values = Object.values(item);
                            var arr = []
                    
                            return values
                        })
             
                        return JSON.stringify( json ); // return JSON string
                        */
                    }
                },
                columns: [
                    { title: "id" },
                    { title: "Titulo" },
                    { title: "Dificultad" },
                    { title: "Categoria" }
                ],
                dom: '<<".sd1"<".sd1-5" f>B>< ".sd2" tr><".sd3" pil>>',
                retrieve: true,
                pagingType: "simple",
                language: {
                    "search": '',
                    "searchPlaceholder": "\uf002 Buscar pacientes",
                    "paginate": {
                        "previous": '<i class="fas fa-chevron-left"></i>',
                        "next": '<i class="fas fa-chevron-right"></i>',

                    },
                    "info": '_START_ - _END_ de _TOTAL_',
                    "lengthMenu": 'Por página <select>' +
                        '<option value="10"><div>10</div></option>' +
                        '<option value="20">20 </option>' +
                        '<option value="30">30</option>' +
                        '<option value="40">40</option>' +
                        '<option value="50">50</option>' +
                        '<option value="-1">All</option>' +
                        '</select>'
                },
                buttons: [{
                    extend: 'collection',
                    text: '<i class="fas fa-sort-amount-up" style="color: #F9807D; "></i> Ordenar',
                    tag: 'span',
                    className: 'b1',
                    buttons: [{ text: 'Nombre <i id="icon_sda" class="fas fa-arrow-up"></i>', action: function () { table.order([0, 'asc']).draw(); } },
                    { text: 'Solicitud <i id="icon_sda" class="fas fa-arrow-up"></i>', action: function () { table.order([1, 'asc']).draw(); } },
                    { text: 'Fecha <i id="icon_sda" class="fas fa-arrow-up"></i>', action: function () { table.order([2, 'asc']).draw(); } },
                    { text: 'Prioridad <i id="icon_sda" class="fas fa-arrow-up"></i>', action: function () { table.order([3, 'asc']).draw(); } },
                    { text: 'Nombre <i id="icon_sda" class="fas fa-arrow-down"></i>', action: function () { table.order([0, 'desc']).draw(); } },
                    { text: 'Solicitud <i id="icon_sda" class="fas fa-arrow-down"></i>', action: function () { table.order([1, 'desc']).draw(); } },
                    { text: 'Fecha <i id="icon_sda" class="fas fa-arrow-down"></i>', action: function () { table.order([2, 'desc']).draw(); } },
                    { text: 'Prioridad <i id="icon_sda" class="fas fa-arrow-down"></i>', action: function () { table.order([3, 'desc']).draw(); } },
                    ]
                }]
                
                

            }
        );
    }
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
            
            <div className="content">
                <Filtro/>
                <Tabla problemas={datos}/>                
            </div>
            
        </div>

    )
    
    
};


export default Problemas;

