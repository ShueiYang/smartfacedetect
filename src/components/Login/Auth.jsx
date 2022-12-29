import React from "react";
import { FcGoogle } from "react-icons/fc";


const Auth = () => {

    const onGoogleSignIn = () => {
        window.open("http://localhost:8080/auth/google", "_self");    
    };
   
    return (
        <div id="auth" className="flex flex-column">
            <span className="hr-btn">or</span>
            <button className="google flex items-center justify-around f6 grow no-underline br2 ba ph3 pv2 mb2 mt2 dib dark-gray"
                onClick = {onGoogleSignIn}>
                <FcGoogle className="f2"/>
                <p className="f4 b">Sign in with Google</p>  
            </button>
        </div> 
    ) 
}
export default Auth; 