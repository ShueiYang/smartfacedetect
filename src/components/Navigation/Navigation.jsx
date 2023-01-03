import React from "react";
import { Link } from "react-router-dom";

const Navigation =({ login, setUser }) => {
    
    const sessionLogOut = () => {
        setUser(null);
        window.open(`${process.env.REACT_APP_BASE_URL}/auth/logout`, "_self");    
    };
   
    return (login ?  
        <nav>
            <Link to='/'>
                <p className="f3 link dim black underline pa3 pointer"
                    onClick={()=> sessionLogOut()}>
                    Sign Out
                </p>
            </Link>
        </nav>
           
    :   <nav>
            <Link to='/'>
                <p className="f3 link dim black underline pa3 pointer">
                    Sign in
                </p>
            </Link>
            <Link to='/register'>
                <p className="f3 link dim black underline pa3 pointer">
                    Register
                </p>
            </Link>    
        </nav>    
    );
};

export default Navigation;