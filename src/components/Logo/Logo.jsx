import React from "react";
import Tilt from "react-parallax-tilt";
import './Logo.css'
import brain from './Ai-brain.png'

const Logo =() => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2">             
                <div className="Tilt-inner">
                    <img src={brain} alt="logo" />
                </div>
            </Tilt>
        </div>
    )

}

export default Logo;
                
                
                
