import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

//import Loading from "./components/Loading";
//import NavBar from "./components/NavBar";
//import Footer from "./components/Footer";
//import Home from "./views/Home";
//import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import history from "./utils/history";

import Room from './components/Test/Room';
import Create from './components/Test/Create';
import LoginButton from './components/Auth/LoginButton';
import Inicio from './pages/Inicio';
import Problema from './pages/Problema';
import Problemas from './pages/Problemas';
import Profile from './components/Profile';
import Loading from './components/Loading';
import crearCurso from "./pages/crearCurso";
import crearRamo from "./pages/crearRamo";


// styles
//import "./App.css";

// fontawesome
//import initFontAwesome from "./utils/initFontAwesome";
//initFontAwesome();

const App = () => {
    const { isLoading, error } = useAuth0();

    if (error) {
    return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
    return <h1>Cargando</h1>;
    }

    return (
        <Router history={history}>
            <div id="app" className="d-flex flex-column h-100">
            {
            //    <NavBar />
            }
            <Container className="flex-grow-1 mt-5">
            <Switch>

                <Route exact path="/" component={LoginButton}/>
                <Route exact path="/profile" component={withAuthenticationRequired(Profile, {
                    onRedirecting: () => <Loading />,
                })}/>
                <Route exact path="/home" component={withAuthenticationRequired(Inicio, {
                    onRedirecting: () => <Loading />,
                })}/>
                <Route exact path="/join" component={Room}/>
                <Route exact path="/join1" component={Create}/>
                <Route exact path="/problema/:id" component={withAuthenticationRequired(Problema, {
                    onRedirecting: () => <Loading />,
                })}/>
                <Route exact path="/problemas" component={withAuthenticationRequired(Problemas, {
                    onRedirecting: () => <Loading />,
                })}/>

                <Route exact path="/crear_curso" component={withAuthenticationRequired(crearCurso, {
                    onRedirecting: () => <Loading />,
                })}/>
                <Route exact path="/crear_ramo" component={withAuthenticationRequired(crearRamo, {
                    onRedirecting: () => <Loading />,
                })}/>
                <Route exact path="/agregarUsuarios" component={withAuthenticationRequired(agregarUsuarios, {
                    onRedirecting: () => <Loading />,
                })}/>
                    
            </Switch>
            </Container>
            {
            //    <Footer />
            }
            </div>
        </Router>
    );
};

export default App;