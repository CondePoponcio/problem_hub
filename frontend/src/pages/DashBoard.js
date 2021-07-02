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
import { faCoffee, faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
//library.add(fas, faCheckSquare, faCoffee)
import $ from 'jquery'

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
import CursoAgregarMiembro from "./CursoAgregarMiembro";
import CursoEditarMiembros from "./CursoEditarMiembros";
// styles
//import "./App.css";

// fontawesome
//import initFontAwesome from "./utils/initFontAwesome";
//initFontAwesome();

const DashBoard = (props) => {
    const { isLoading, error } = useAuth0();
    const { match } = props;
    if (error) {
    return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
    return <h1>Cargando</h1>;
    }

    const jQuerycode = () => {
        //const sidenavEl = $('.sidenav');
        const homeLogo = $('.home_logo');
        const sidenavCloseEl = $('.sidenav__close-icon');
        const header__menu = $('.header__menu');
        // Add and remove provided class names
        function toggleClassName(el, className) {
        if (el.hasClass(className)) {
            el.removeClass(className);
        } else {
            el.addClass(className);
        }
        }

        // Open the side nav on click
        header__menu.on('click', function() {
        toggleClassName(homeLogo, 'active');
        });

        // Close the side nav on click
        sidenavCloseEl.on('click', function() {
        toggleClassName(homeLogo, 'active');
        });
    }
    useEffect(()=>{
        jQuerycode()
    },[])

    return (
        <Router history={history}>
            
            <div className="grid-container">
                <div className="home_logo">
                    <a href={"/dashboard"} className="logo">Problem <span>Hub</span></a>
                
                </div>
                <header className="header">
                    <FontAwesomeIcon icon={faBars} size="lg" className="header__menu"/>
                    
                    {
                        /*
                                            <div className="header__search">Search...</div>
                    <div className="header__avatar">Your face</div>
                        */
                       <TopNavBar/>
                    }

                </header>

                <aside className="sidenav">
                    <div className="sidenav__close-icon">
                    <FontAwesomeIcon icon={faFacebook} size="lg" className="sidenav__brand-close"/>
                    </div>
                    <ul className="sidenav__list">
                    <li className="sidenav__list-item"><Link to={`${match.path}`}>DashBoard</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/home`}>Home</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/problemas`}>Problemas</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/profile`}>profile</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/crear_curso`}>Crear Curso</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/crear_ramo`}>Crear Ramo</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/cursosAdmin`}>Cursos Admin</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/scraper`}>Web Scraping</Link></li>
                    </ul>
                </aside>

                <main className="main">

                    <Switch>

                        <Route path={`${match.path}/profile`} component={withAuthenticationRequired(Profile, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}/home`} component={withAuthenticationRequired(Inicio, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}/join`} component={Room}/>
                        <Route path={`${match.path}/join1`} component={Create}/>
                        <Route path={`${match.path}/problema/:id`} component={withAuthenticationRequired(Problema, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}/problemas`} component={withAuthenticationRequired(Problemas, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}/crear_curso`} component={withAuthenticationRequired(crearCurso, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}/crear_ramo`} component={withAuthenticationRequired(crearRamo, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}/agregarUsuarios`} component={withAuthenticationRequired(agregarUsuarios, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}/cursosAdmin`} component={withAuthenticationRequired(CursosAdmin, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}/cursoAdmin/:id`} component={withAuthenticationRequired(CursoAdmin, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}/cursoAgregarMiembro/:id`} component={withAuthenticationRequired(CursoAgregarMiembro, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}/cursoEditarMiembros/:id`} component={withAuthenticationRequired(CursoEditarMiembros, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}/scraper`} component={withAuthenticationRequired(scraper, {
                            onRedirecting: () => <Loading />,
                        })}/>
                        <Route path={`${match.path}`} component={withAuthenticationRequired(IndexDashBoard, {
                            onRedirecting: () => <Loading />,
                        })}/>

                    </Switch>
                    
                </main>

                <footer className="footer">
                    <div className="footer-content">
                        <div id="item-1">
                            <h4>

                            </h4>
                            <p>2 42207525/241</p>
                            <p>contacto@mail.udp.cl</p>
                            <p>Manuel Rodríguez Sur 415, Santiago 8320000 </p>
                            
                        </div>
                        <div id="item-2">
                            <p><a href="#">¿Quiere visitar nuestro Tour?</a></p>
                            
                            <p><a href="#">Preguntas frecuentes</a></p>
                        </div>
                        <div id="item-3">
                            <h4>
                                Síguenos
                            </h4>
                            <ul>                    
                                <li style={{color:"#2d88ff"}}><FontAwesomeIcon icon={faFacebook} size="lg" /></li>
                                <li style={{color: "rgba(29,161,242,1.00)"}}><FontAwesomeIcon icon={faTwitter} size="lg"/></li>
                                <li id="insta"><FontAwesomeIcon icon={faInstagram} size="lg"/></li>
                                <li style={{color: "rgb(255, 0, 0)"}}><FontAwesomeIcon icon={faYoutube} size="lg"/></li>
                            </ul>
                            <button onClick={()=>{window.location.href='#';}}>Escríbenos</button>
                        </div>
                    </div>
                    
                    
                    
                    
                </footer>
            </div>
            
        </Router>
    );
};

export default DashBoard;