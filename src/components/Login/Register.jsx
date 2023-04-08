import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errorform from "./Errorform";
import Loading from "./Loading";
import Footer from "../Footer";

const Register = ({ loadUser }) => {

    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [regForm, setRegForm] = useState({
        name: "",
        email: "",
        password: "",
        checkPassword:""
    })
    const navigate = useNavigate();

    function handleChange (event) {
        const { name, value } = event.target;
        setRegForm({ ...regForm, [name]: value })
    }

    function resetPassword() {
        setRegForm({
            ...regForm,
            password: "",
            checkPassword: "",
        })
    };

    async function onSubmitSignUp() {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(regForm)
            }); console.log({regForm})
            const user = await response.json();
            if (response.ok) {
                loadUser(user);
            } else if (response.status >= 400) {
                setLoginError(user);
            }
        } catch (err) {
            console.error(err)
            setLoginError(err);
        } finally {
            setLoading(false);
            resetPassword();
        }
    };


    if(loginError) {
        return (
            <Errorform 
                error={loginError}
                resetRoute={()=> {
                    setLoginError(null)
                    setLoading(false)
                }}
            />
        )
    }
    if(loading) {
       return <Loading />  
    }  

    return (
        <div className='Signin'> 
          <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name" 
                                    id="name"
                                    value={regForm.name}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    value={regForm.email}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    value={regForm.password}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="checkPassword" 
                                    id="checkPassword"
                                    value={regForm.checkPassword}
                                    onChange = {handleChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" value="Register" 
                                onClick= {onSubmitSignUp}/>
                        </div>
                        <div className="flex flex-column justify-around items-center lh-copy mt4 mb3">
                            <span className="f6">Already have an account?</span>
                            <span onClick={() => navigate("/")} 
                                className="f6 link dim black db pointer">Sign In</span>
                        </div>
                    </div>
                </main>
            </article>
        <Footer/>
        </div>
    )
}
export default Register;          
                