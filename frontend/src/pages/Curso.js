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
    const [cursos, setCursos] = useState([])
    const { user, isLoading, isAuthenticated, getAccessTokenSilently, error } = useAuth0();
    const [checkCourse, setCheckCourse] = useState(false)
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
        console.log("Data from Location: ", props.location.data)
        
    },[])
    const jQuerycode = () => {
        
    }
    useEffect(()=>{
        jQuerycode()
    },[])

    return (
        (props.location.data == undefined)?(
        <h1 style={{width:"100%", height: "100%", display:"flex", justifyContent:"center", alignItems:"center", color:"rgb(51 45 45)"}}>
            <p>No tiene autorización para ver este curso</p>
        </h1>
        ):
        (
        <div>
            <div className="main-header">
            <div className="main-header__heading">Hello User</div>
            <div className="main-header__updates">Recent Items</div>
            </div>

            <div className="main-overview">
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