import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationButtons.css"



const NavigationButtons  = () => {
    const navigate = useNavigate();
    
    return (
        <div className="navigate-button-box">        
            <button className="display-button-Dangeon" onClick={() => navigate("/")}>
            <img  className="button-Dangeon" src="/button-Dangeon.webp" alt="Dangeon" />    
            </button>
            <button className="display-button-Haracteristic" onClick={() => navigate("/character")}>
                <img  className="button-Haracteristic" src="/button-Haracteristic.webp" alt="Character" />    
            </button>
            <button className="display-button-Shop" onClick={() => navigate("/")}>
                <img  className="button-Shop" src="/button-Shop.webp" alt="Shop" />    
            </button>
        </div>
    );
};

export default NavigationButtons 