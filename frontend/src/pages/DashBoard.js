import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import { Container } from "reactstrap";
import './../../static/css/dashboard.css';
//import Loading from "./components/Loading";
//import NavBar from "./components/NavBar";
//import Footer from "./components/Footer";
//import Home from "./views/Home";
//import Profile from "./views/Profile";
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

    return (
        <Router history={history}>
            
            <div className="grid-container">
                <div className="home_logo">
                    <i className="fas fa-bars header__menu"></i>
                    <a href={"/home"} className="logo">Problem <span>Hub</span></a>
                
                </div>
                <header className="header">
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
                    <i className="fas fa-times sidenav__brand-close"></i>
                    </div>
                    <ul className="sidenav__list">
                    <li className="sidenav__list-item"><Link to={`${match.path}`}>DashBoard</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/home`}>Home</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/problemas`}>Problemas</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/profile`}>profile</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/crear_curso`}>Crear Curso</Link></li>
                    <li className="sidenav__list-item"><Link to={`${match.path}/crear_ramo`}>Crear Ramo</Link></li>
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
                        <Route path={`${match.path}`} component={withAuthenticationRequired(IndexDashBoard, {
                            onRedirecting: () => <Loading />,
                        })}/>

                    </Switch>
                    
                </main>

                <footer className="footer">
                    <div class="footer-content">
                        <div id="item-1">
                            <h4>

                            </h4>
                            <p>2 32207345/344</p>
                            <p>contacto@dermacné.cl</p>
                            <p>Lo Fontecilla 101, torre A, oficina 613, Las Condes, Santiago. </p>
                        </div>
                        <div id="item-2">
                            <p><a href="/TerminosyCondiciones">Términos y condiciones del servicio</a></p>
                            
                            <p><a href="/FaQ">Preguntas frecuentes</a></p>
                        </div>
                        <div id="item-3">
                            <h4>
                                Síguenos
                            </h4>
                            <ul>
                                <li><i class="fab fa-facebook"></i></li>
                                <li><i class="fab fa-twitter"></i></li>
                                <li><i class="fab fa-instagram"></i></li>
                                <li><i class="fab fa-youtube"></i></li>
                            </ul>
                            <button onclick="window.location.href='#';">Escríbenos</button>
                        </div>
                    </div>
                    <div id="item-4">
                        <p><a href="/login-medic">Inicio de sesión médicos</a></p>
                            
                        <p><a href="/login-admin">Inicio de sesión para Administradores</a></p>
                    </div>
                </footer>
            </div>
            
        </Router>
    );
};

export default DashBoard;