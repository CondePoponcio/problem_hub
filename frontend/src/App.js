import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

//import Loading from "./components/Loading";
//import NavBar from "./components/NavBar";
//import Footer from "./components/Footer";
//import Home from "./views/Home";
//import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

import Room from './components/Test/Room';
import Create from './components/Test/Create';
import LoginButton from './components/Auth/LoginButton';
import Inicio from './pages/Inicio';
import Problema from './pages/Problema';
import Profile from './components/Profile';



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
            {
            //<Route path="/" exact component={Home} />
            }
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />

            <Route exact path="/" component={LoginButton}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/home" component={Inicio}/>
            <Route exact path="/join" component={Room}/>
            <Route exact path="/join1" component={Create}/>
            <Route exact path="/problema/:id" component={Problema}/>
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