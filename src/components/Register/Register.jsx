import React, { useState } from "react";
import Errorform from "../Errorform";
import Loading from "../Loading";

const Register = ({handleRoute, loadUser}) => {

    const [regName, setRegName] = useState("")
    const [regEmail, setRegEmail] = useState("")
    const [regPassword, setRegPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onNameChange = (event) => {
        setRegName(event.target.value)
    }
    const onEmailChange = (event) => {
        setRegEmail(event.target.value)
    }
    const onPasswordChange = (event) => {
       setRegPassword(event.target.value)
    }
    const onConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
     }

    const onSubmitSignIn = () => {
        setLoading(true)
        fetch('https://smartfacesdetection-api.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: regName,
                email: regEmail,
                password: regPassword,
                checkpassword: confirmPassword
            })
        })
        .then(response => {
            if(response.ok) {
                setLoading(false)
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
                changeRoute= {()=> {
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
                                    d="name"
                                    onChange = {onNameChange}
                                    />
                            </div>
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
                                onClick= {onSubmitSignIn}/>
                        </div>
                    </div>
                </main>
            </article>
        
        }
        </>
    )
}
export default Register;    
                