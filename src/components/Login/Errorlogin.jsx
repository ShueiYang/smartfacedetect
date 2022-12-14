import React from "react";
import { useNavigate } from "react-router-dom";

const Errorlogin = ({ errorLogin, setError }) => {

const serverError = `You must authenticate to get access, or my code suck and some errors occur,
    so you are unable to authenticate... plz contact the admin`

const navigate = useNavigate();   
    
    return (
        <div className='Signin'>
            <article className="br3 ba b--black-10 mv7 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">
                                {errorLogin ? errorLogin : serverError}
                            </legend>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" value="Try again" 
                                onClick= {()=> {setError(null); navigate("/")}}/>
                        </div>
                    </div>
                </main>
            </article>    
        </div>
    )
};
export default Errorlogin;