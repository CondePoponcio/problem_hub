
import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'

import ReactDatatable from '@ashvin27/react-datatable';

const columnsE = [
    {
        key: "titulo",
        text: "Título",
        className: "title",
        sortable: true
    },
    {
        key: "id",
        text: "Categoría",
        className: "categoria",
        TrOnlyClassName: "categoria",
        sortable: true
    },
    {
        key: "dificultad",
        text: "Dificultad",
        className: "dificultad",
        sortable: true
    }
]
const Tabla = (props) => {
    const [columns, setColumns] = useState(columnsE)
    const [records, setRecords] = useState([])
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
            setRecords(json)
        })

    },[])
    const config = {
        page_size: 10,
        length_menu: [10, 20, 50],
        show_filter: false,
        show_pagination: false,
        button: {
            excel: false,
            print: false
        }
    }
    
    useEffect(()=>{
        if(props.problemas){
            setRecords(props.problemas)
        }
    },[props.problemas])
    

    return (
        <ReactDatatable
            className="table custom-style-table"
            tHeadClassName="custom-header-style"
            config={config}
            records={records}
            columns={columns}/>
    );
}

export default Tabla;