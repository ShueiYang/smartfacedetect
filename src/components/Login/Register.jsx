import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errorform from "./Errorform";
import Loading from "./Loading";
import Footer from "../Footer";

const Register = ({ loadUser }) => {

    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const onNameChange = (event) => {
        setRegName(event.target.value)
    };
    const onEmailChange = (event) => {
        setRegEmail(event.target.value)
    };
    const onPasswordChange = (event) => {
       setRegPassword(event.target.value)
    };
    const onConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    };
    const resetPassword = () => {
        setRegPassword("")
        setConfirmPassword("")
    };

    const onSubmitSignUp = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/register`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: regName,
                    email: regEmail,
                    password: regPassword,
                    checkpassword: confirmPassword
                })
            })
            const user = await response.json();
            if(response.ok) {
                setLoading(false)
                loadUser(user)
            } else if (response.status === 400) {
                setError(user)
            }
        } catch (err) {
            setError(err)
        } finally {
            resetPassword();
        }
    };

    return (
        <div className='Signin'> 
        { (error) ?
            <Errorform 
                errorMessage= {`${error}`}
                resetRoute= {()=> {
                    setError(null)
                    setLoading(false)
                }}
            />
        : (loading) ?
            <Loading />  
        :   <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
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
                                    value={regName}
                                    onChange = {onNameChange}
                                    />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address" 
                                    id="email-address"
                                    value={regEmail}
                                    onChange = {onEmailChange}
                                    />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    onChange = {onPasswordChange}
                                    />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password" 
                                    id="password2"
                                    onChange = {onConfirmPassword}
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
                            <span onClick={() => navigate("/signin")} 
                                className="f6 link dim black db pointer">Sign In</span>
                        </div>
                    </div>
                </main>
            </article>
        }
        <Footer/>
        </div>
    )
}
export default Register;          
                