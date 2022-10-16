import React from "react";


const Footer = () => {
    
    return (
        <div className="footer">
            <div className="foot">  
                    <p> 
                        &copy;{new Date().getFullYear()} Developed by ShueiYang   
                    </p>
                <hr/>
                    <p>
                        <a href="https://github.com/ShueiYang" rel="noreferrer" target="_blank">GitHub</a>
                    </p>
                <hr/>
                    <p>
                        <a href="#!" rel="noreferrer"target="_blank">LinkedIn</a>
                    </p>
            </div>
            <p className="mt0 mb4">
                <a href="https://www.flaticon.com/free-icons/artificial-intelligence" rel="noreferrer" target="_blank" title="artificial-intelligence icons">AI icons created by Freepik - Flaticon</a>
            </p>
        </div>
    ) 
}

export default Footer;       
         
       