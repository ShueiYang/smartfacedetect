import React from "react";
import DetectionDisplay from "./DetectionDisplay";
import './FaceRecognition.css'

const FaceRecognition =({imageUrl, faceBox, error}) => {
    
    return (
        <div className="center">
            <div className="center absolute mt2">
                {error && <p className="f2">{`${error}`}</p>}
                {!error &&
                  <> 
                    <img id='inputImage'src={imageUrl} alt="" width='600px' height='auto'/>
                    {faceBox && <DetectionDisplay faceBox={faceBox} />}
                  </>  
                } 
            </div>
        </div>    
    )
}
export default FaceRecognition;