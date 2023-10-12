import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import './LandingPage.css';


const Landing = () => {
    return (
        <>
            <div className="mainContainer-landingPage">
                <h1 className="title-LandingPage">¡All Dogs!!!</h1>
             
            </div>
             <Link className="a-LandingPage" to="/home">
                <button className="button-landingPage">Ingresar</button>
            </Link> 
        </>

    );
}

export default Landing;