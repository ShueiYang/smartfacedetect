import React from "react";
import './FaceRecognition.css'

const FaceRecognition =({imageUrl, faceBox, error}) => {
    
    return (
        <>
        { (error) ? 
            <div className="center">
                <div className="center absolute mt2">
                    <p className="f2">{`${error}`}</p>
                </div>
            </div>    
        : (faceBox) === null ?
        <div className="center">
            <div className="absolute mt2">
                <p className="f3">{`No Face Detected`}</p>
                <img id='inputImage'src={imageUrl} alt="" width='600px' height='auto'/>
            </div>
        </div>
        
        : (!Array.isArray(faceBox)) ?
        <div className="center">
            <div className="absolute mt2">
                <img id='inputImage'src={imageUrl} alt="" width='600px' height='auto'/>
                <div className="bounding-box" 
                    style={{top: faceBox.topRow, right: faceBox.rightCol, 
                    bottom: faceBox.bottomRow, left: faceBox.leftCol }}>
                </div>     
            </div>
         </div>
        
        :   <div className="center">
                <div className="absolute mt2">
                <img id='inputImage'src={imageUrl} alt="" width='600px' height='auto'/>
                    {faceBox.map(box => (     
                        <div className="bounding-box" key ={box.topRow}
                            style={{top: box.topRow, right: box.rightCol, 
                            bottom: box.bottomRow, left: box.leftCol }}>
                        </div>
                      ))
                    }
                </div>
            </div>
        }     
        </>
    )
}
export default FaceRecognition;          
                
             
          
                        
            
               
                  
                             
            