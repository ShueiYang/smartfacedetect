import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particle from './components/Particle';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Login/Signin';
import Register from './components/Login/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

import { calculateFaceLocation } from './services/faceDisplay';
import { httpGetProfile, httpGetUser, imageApiCall, submitMeter } from './services/Api.request';

function App() {
  
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadScreen, setLoadScreen] = useState(false);
  
  const navigate = useNavigate();

  async function getUser() {
    try{
      const response = await httpGetUser();
      if(response.status === 200) {
        setLoadScreen(true)
        const profile = await response.json();
        const data = await httpGetProfile(profile._json.email)
        setUser({
          id: data.id,
          name: profile._json.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoadScreen(false);
    }
  };
  
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => { 
    // Checking if user is loggedIn or not
    if (!user) {
      setInput("")
      setImageUrl("")
      setBox({})
      setError(null);
    } else {
      navigate("/home");
    }
  }, [user, navigate]);
    
  // The function below load the User information from Signin and Register component.
  function loadUser (data) {
     setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      })
  };

  const onInputChange = (event) => {
    setInput(event.target.value)
  };

  async function onPictureSubmit () {
    setBox({})
    setError(null)
    setImageUrl(input)
    try {
      const response = await imageApiCall(input);
      const faceData = await response.json(); 
      if(response.ok) {
        setTimeout(async ()=> {
          setBox(await calculateFaceLocation(faceData));
        }, 600);
        const count = await submitMeter(user.id)
        setUser(prevState => ({
                  ...prevState,
                  entries: count
                }))
                   
      } else if (response.status >= 400) {
        setError(faceData)
      }
    } catch (err) {
      setError(err)
    } 
  };
   
  return (
    <>
      <Particle className="particles"/>
    
      <div className="App">
        <Navigation login={user} setUser={setUser}/>
        <Routes>
          <Route path='/signin' element={
            <Signin 
              loadUser={loadUser} loadScreen={loadScreen}/>
          }/> 
          <Route path='/register' element={    
           <Register loadUser={loadUser}/>
          }/>           
          <Route path='/home' element={
            <ProtectedRoute login={user}>
              <div>
                <Logo />
                <Rank data={user}/>
                <ImageLinkForm
                  handleChange={onInputChange}
                  handleSumit={onPictureSubmit}
                  faceCount={box}
                  error={error}
                />
                <FaceRecognition
                  faceBox={box}
                  imageUrl={imageUrl}
                  error={error}
                />          
              </div>
            </ProtectedRoute> 
          }/>
          <Route path='*' element={<Navigate to='/signin'/>}/>
        </Routes>
      </div>
    </>
  );
}
export default App;