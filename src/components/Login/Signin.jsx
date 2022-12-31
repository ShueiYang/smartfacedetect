import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errorform from "./Errorform";
import Loading from "./Loading";
import Auth from "./Auth";
import Footer from "../Footer";


const Signin = ({ loadUser, loadScreen }) => {

    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value)
    }
    const onPasswordChange = (event) => {
       setSignInPassword(event.target.value)
    }
    const onSubmitSignIn = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/signin`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: signInEmail,
                    password: signInPassword
                })
            })
            const user = await response.json();
            if(response.ok) {
                setLoading(false)
                loadUser(user)
            } else if (response.status >= 400) {
                setError(user)
            }
        } catch (err) {
            setError(err);
        } finally {
            setSignInPassword("");
        }
    };    
    
    return (
        <div className='Signin'>
        { (error) ?
            <Errorform 
                error={error}
                resetRoute= {()=> {
                    setError(null)
                    setLoading(false)
                }}
            /> 
        : (loading || loadScreen) ?
            <Loading />     
        : <>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email" 
                                    name="email-address" 
                                    id="email-address"
                                    value={signInEmail}
                                    onChange = {onEmailChange}
                                    />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    onChange= {onPasswordChange}
                                    />
                            </div>
                            {/* For this project I remove the Remember me feature below */}
                            {/* <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" value="Sign in" 
                                onClick = {onSubmitSignIn}/>
                        </div>
                        <div className="flex flex-column justify-around items-center lh-copy mt4 mb3">
                            <span className="f6">Don't have an account?</span>
                            <span onClick={() => navigate("/register")} 
                                className="f6 link dim black db pointer">Sign Up</span>
                            {/* For this project I remove Forgot your password feature below */}
                            {/* <a href="#0" class="f6 link dim black db">Forgot your password?</a> */}
                        </div>
                    </div>
                </main>
            </article>
            
            <Auth />
          </>  
        }
        <Footer/>
        </div>
    )
}
export default Signin;