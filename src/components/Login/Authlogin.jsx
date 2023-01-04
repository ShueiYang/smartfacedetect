import React, { useEffect } from "react";

import { httpGetProfile, httpGetUser } from "../../services/Api.request";


const AuthLogin = ({ setUser, setError }) => {

    useEffect(() => {      
        async function getUser() {
            try{
                const response = await httpGetUser();
                const profile = await response.json();
                if(response.status === 200) {
                    const data = await httpGetProfile(profile._json.email)
                    setUser({
                        id: data.id,
                        name: profile._json.name,
                        email: data.email,
                        entries: data.entries,
                        joined: data.joined
                    });
                } else {
                    setError(profile);
                }
            } catch (err) {
                setError(err)
            } 
        };
        getUser();
    
    }, [setUser, setError]);
    

    return (
        <article className="br3 ba b--black-10 mv7 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Connecting...</legend>
                    </fieldset>
                </div>
            </main>
        </article>    
    )
};
export default AuthLogin;                   
    