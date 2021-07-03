import React, { useState, useEffect } from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import { Container } from "reactstrap";
import './../../static/css/dashboard.css';
//import Loading from "./components/Loading";
//import NavBar from "./components/NavBar";
//import Footer from "./components/Footer";
//import Home from "./views/Home";
//import Profile from "./views/Profile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faTimes, faBars, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
//library.add(fas, faCheckSquare, faCoffee)
import $ from 'jquery';
import dt from 'datatables.net';
import ExternalApi from "./../views/ExternalApi";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import history from "./../utils/history";

import Room from '.././components/Test/Room';
import Create from '.././components/Test/Create';
import LoginButton from '.././components/Auth/LoginButton';
import Inicio from '.././pages/Inicio';
import Problema from '.././pages/Problema';
import Problemas from '.././pages/Problemas';
import Profile from '.././components/Profile';
import Loading from '.././components/Loading';
import crearCurso from ".././pages/crearCurso";
import crearRamo from ".././pages/crearRamo";
import agregarUsuarios from "./agregarUsuarios";
import CursosAdmin from "./CursosAdmin";
import CursoAdmin from "./CursoAdmin";

import NotFound from "./404";
import IndexDashBoard from "./../components/IndexDashBoard";
import TopNavBar from './../components/TopNavbar'; 
import scraper from "./scraper";
import Curso from './Curso';
// styles
//import "./App.css";

// fontawesome
//import initFontAwesome from "./utils/initFontAwesome";
//initFontAwesome();

const DashBoard = (props) => {
    const { match } = props;
    const [curso, setCurso] = useState([])
    const { user, isLoading, isAuthenticated, getAccessTokenSilently, error } = useAuth0();
    const [cargando, setCargando] = useState(false)
    if (error) {
    return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
    return <h1>Cargando</h1>;
    }
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
    useEffect(async ()=>{
        if(!isAuthenticated || !user) return null
        const accessToken = await getAccessTokenSilently()
        var csrftoken = await getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: { Accept: 'application/json', "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`, 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                'id':props.match.params.id
            }),
        };
        fetch(`/api/curso/${props.match.params.id}`, requestOptions).then((response) => response.json())
        .then((json) =>{
            console.log("HA",json)
            if(json.data){
                setCurso(json.data[0])
            }
        })
    },[])
    const jQuerycode = () => {
        
    }
    useEffect(()=>{
        jQuerycode()
    },[])

    return (
        (!curso)?(
        <h1 style={{width:"100%", height: "100%", display:"flex", justifyContent:"center", alignItems:"center", color:"rgb(51 45 45)"}}>
            <p>No tiene autorización para ver este curso</p>
        </h1>
        ):
        (
        <div>
            <div className="main-header">
            <div className="main-header__heading">Hola que tal, bienvenido/a al curso de {curso.nombre}</div>
            <div className="main-header__updates">Recent Items</div>
            </div>

            <div className="main-overview">
            <div className="overviewcard">
                <Link className="overviewcard__info" to={{
                    pathname:`/dashboard/curso/${curso.id}/problemas`,
                    data: curso
                }}>Ver apartado de problemas Problemas</Link>
            </div>
            <div className="overviewcard">
                <div className="overviewcard__icon">Overview</div>
                <div className="overviewcard__info">Card</div>
            </div>
            <div className="overviewcard">
                <div className="overviewcard__icon">Overview</div>
                <div className="overviewcard__info">Card</div>
            </div>
            <div className="overviewcard">
                <div className="overviewcard__icon">Overview</div>
                <div className="overviewcard__info">Card</div>
            </div>
            </div>

            <div className="main-cards">
            <div className="card">Card</div>
            <div className="card">Card</div>
            <div className="card">Card</div>
            </div>
        </div>
        )
    );
};

export default DashBoard;