import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particle from './components/Particle';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';


function App() {

  const [input, setInput] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [box, setBox] = useState({})
  const [error, setError] = useState(null)
  const [route, setRoute] = useState("signIn")
  const [signIn, setSignIn] = useState(false)
  const [user, setUser] = useState({
                                    id: '',
                                    name: '',
                                    email: '',
                                    entries: 0,
                                    joined: ''
                                  })
 
// The function below load the User information from Signin and Register component.
  const loadUser = (data) => {
     setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      })
  } 
  
  const calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    const boxData = data.outputs[0].data.regions
    
    if (boxData.length === 0) 
      return null
    
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
  }

  const displayFaceBox = (facebox) => { 
    setBox(facebox)
  }
  
  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const onPictureSubmit = () => {
    setImageUrl(input)
    setError(null)
    fetch('https://smartfacesdetection-api.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({
            input: input
          })
        })
    .then(response => {
      if(response.ok) {
        return response.json()
        .then(facedata => {
            fetch('https://smartfacesdetection-api.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body:JSON.stringify({
                id: user.id
              })
            })
            .then(resp => resp.json())
            .then(count => {
              setUser(prevState => ({
                ...prevState,
                entries: count
              }))
            })
            .catch(err => setError(err))
          
        displayFaceBox(calculateFaceLocation(facedata))
        })
            
      } else if (response.status === 400) {
        return response.json()
        .then(err => setError(err))
      }
    })   
    .catch(err => setError(err)) 
  }
  
  const onRouteChange = (state) => {
    setRoute(state) 
  }       
   
  useEffect(() => {  
    if (route === 'home') {
      setSignIn(true)
    } else if (route === 'signIn') {
      setSignIn(false)
      setImageUrl("")
      setBox({})
      setError(null)
    }
  }, [route]) 
  
    
  return (
    <>
      <Particle className="particles"/>
    
      <div className="App">
        <Navigation handleRoute={onRouteChange} isSignIn={signIn} />
        {route === 'home' ? 
        <div>
          <Logo />
          <Rank data= {user}/>
          <ImageLinkForm
            handleChange={onInputChange}
            handleSumit={onPictureSubmit}
          />
          <FaceRecognition
            faceBox={box}
            imageUrl={imageUrl} 
            error={error}
          />          
        </div> 
        : (route === 'signIn' ?       
            <Signin handleRoute={onRouteChange}
                    loadUser= {loadUser}/> 
            : <Register handleRoute={onRouteChange}
                        loadUser= {loadUser}/>
          )
        }          
      </div>
    </>
  );
}
export default App;   
                
                     
              
        
         
  
  
  
      

  
