import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationButtons.css"



const NavigationButtons  = () => {
    const navigate = useNavigate();
    
    return (
        <div className="navigate-button-box">        
            <button className="" onClick={() => navigate("/")}>
            <img  className="button-Dangeon" src="/button-Dangeon.webp" alt="Dangeon" />    
                П
            </button>
            <button className="display-button-Haracteristic" onClick={() => navigate("/character")}>
                <img  className="button-Haracteristic" src="/button-Haracteristic.webp" alt="Character" />    
            </button>
            <button className="" onClick={() => navigate("/")}>
                Магазик
            </button>
        </div>
    );
};

export default NavigationButtons 