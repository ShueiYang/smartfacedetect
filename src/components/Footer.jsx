import React from "react";


const Footer = () => {
    
    return (
        <div className="footer">
            <div className="foot">  
                    <p> 
                        &copy;{new Date().getFullYear()} Developed from ZTM 
                    </p>
                <hr/>
                    <p>
                        <a href="https://github.com/ShueiYang" rel="noreferrer" target="_blank">GitHub</a>
                    </p>
                <hr/>
                    <p>
                        <a href="https://www.linkedin.com/in/shueiyang" rel="noreferrer"target="_blank">LinkedIn</a>
                    </p>
            </div>
            <p className="mt0 mb4">
                <a href="https://www.flaticon.com/free-icons/artificial-intelligence" rel="noreferrer" target="_blank" title="artificial-intelligence icons">AI icons created by Freepik - Flaticon</a>
            </p>
        </div>
    ) 
}

export default Footer;       
         
       