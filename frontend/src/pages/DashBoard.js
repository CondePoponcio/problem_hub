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
                <div className="menu-icon">
                    <i className="fas fa-bars header__menu"></i>
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
                        <Route exact path={`${match.path}`} component={withAuthenticationRequired(IndexDashBoard, {
                            onRedirecting: () => <Loading />,
                        })}/>

                    </Switch>
                    
                </main>

                <footer className="footer">
                    {
                        //<div className="footer__copyright">&copy; 2021 MTH</div>
                    }
                    {
                        //<div className="footer__signature">Made with love by pure genius</div>
                    }
                </footer>
            </div>
            
        </Router>
    );
};

export default DashBoard;