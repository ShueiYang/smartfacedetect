import React from "react";

const Navigation =({handleRoute, isSignIn}) => {
   
    return ((isSignIn) ?  
        <nav>
            <p onClick={() => handleRoute('signIn')} 
            className="f3 link dim black underline pa3 pointer">Sign Out</p>
        </nav>
           
    :   <nav>
            <p onClick={() => handleRoute('signIn')} 
                className="f3 link dim black underline pa3 pointer">Sign in</p>
            <p onClick={() => handleRoute('register')} 
                className="f3 link dim black underline pa3 pointer">Register</p>
        </nav>    
    )
}

export default Navigation;          
       
 
           

    
    