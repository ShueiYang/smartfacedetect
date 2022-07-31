import React, { useState } from "react";
import Errorform from "../Errorform";

const Signin = ({handleRoute, loadUser}) => {

    const [signInEmail, setSignInEmail] = useState("")
    const [signInPassword, setSignInPassword] = useState("")
    const [error, setError] = useState(null)

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value)
    }
    const onPasswordChange = (event) => {
       setSignInPassword(event.target.value)
    }
    const onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            .then(user => {
                loadUser(user)    
                handleRoute('home') 
            })
          } else if (response.status === 400) {
            return response.json()
            .then(err => setError(err))
          }
        })
        .catch(err => setError(err))
    }    
    
    return (
        <>
        { (error) ?
            <Errorform 
                errorMessage= {`${error}`}
                changeRoute= {()=> setError(null)}
            /> 
        :   <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
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
                        <div className="lh-copy mt3">
                            <p onClick={() => handleRoute('register')} className="f6 link dim black db pointer">Register</p>
                            {/* For this project I remove Forgot your password feature below */}
                            {/* <a href="#0" class="f6 link dim black db">Forgot your password?</a> */}
                        </div>
                    </div>
                </main>
            </article>
        }
        </>
    )
}
export default Signin;
