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

const { REACT_APP_BASE_URL } = process.env;

function App() {

  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();

  async function getUser() {
    try{
      const response = await fetch(`${REACT_APP_BASE_URL}/auth/login`, {
        credentials: "include",
      })
      if(response.status === 200) {
        const profile = await response.json();
        const resp = await fetch(`${REACT_APP_BASE_URL}/auth/profile`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({
                  email: profile._json.email
                })
              })
        const data = await resp.json();
        setUser({
          id: data.id,
          name: profile._json.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        })
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err)
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
      
  function calculateFaceLocation (data) {
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    const boxData = data.outputs[0].data.regions
    
    if (boxData.length === 0)
      return null;
    
    else if (boxData.length === 1) {
      const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box
      return {
        leftCol: clarifyFace.left_col * width,
        topRow: clarifyFace.top_row * height,
        rightCol: width - (clarifyFace.right_col * width),
        bottomRow: height - (clarifyFace.bottom_row * height)
      }
    }
    else {
      return boxData.map(item => {
              const clarifyFace = item.region_info.bounding_box
                return {
                  leftCol: clarifyFace.left_col * width,
                  topRow: clarifyFace.top_row * height,
                  rightCol: width - (clarifyFace.right_col * width),
                  bottomRow: height - (clarifyFace.bottom_row * height)
                }
            }) 
    }
  };

  const displayFaceBox = (facebox) => { 
    setBox(facebox)
  }
  
  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  async function onPictureSubmit () {
    setBox({})
    setError(null)
    setImageUrl(input)
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/api/imageurl`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
              input: input
            })
          })
      const faceData = await response.json(); 
      if(response.ok) {
        setTimeout(()=> {
          displayFaceBox(calculateFaceLocation(faceData))
        }, 500);
        const resp = await fetch(`${REACT_APP_BASE_URL}/api/image`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({
                  id: user.id
                })
              })
        const count = await resp.json();
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
        <Navigation login={user} setUser={(state)=> setUser(state)}/>
        <Routes>
          <Route path='/signin' element={
            <Signin loadUser={loadUser}/>
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