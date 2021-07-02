import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import { Container } from "reactstrap";
import './../../static/css/dashboard.css';
//import Loading from "./components/Loading";
//import NavBar from "./components/NavBar";
//import Footer from "./components/Footer";
//import Home from "./views/Home";
//import Profile from "./views/Profile";
import ExternalApi from "../views/ExternalApi";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import history from "../utils/history";



// styles
//import "./App.css";

// fontawesome
//import initFontAwesome from "./utils/initFontAwesome";
//initFontAwesome();

const IndexDashBoard = (props) => {
    const { isLoading, error } = useAuth0();
    const { match } = props;
    if (error) {
    return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
    return <h1>Cargando</h1>;
    }

    return (
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
    );
};

export default IndexDashBoard;


