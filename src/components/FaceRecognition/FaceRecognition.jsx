import React from "react";
import './FaceRecognition.css'

const FaceRecognition =({imageUrl, faceBox, error}) => {
    
    return (
        <>
        { (error) && 
            <div className="center">
                <div className="center absolute mt2">
                    <p className="f2">{`${error}`}</p>
                </div>
            </div>
        }
        
        { (!faceBox) ? 
            <div className="center">
                <div className="absolute mt2">
                    <img id='inputImage'src={imageUrl} alt="" width='600px' height='auto'/>
                </div>
            </div>
        
        : <div className="center">
            <div className="absolute mt2">
                <img id='inputImage'src={imageUrl} alt="" width='600px' height='auto'/>
                { (!Array.isArray(faceBox)) ?
                    <div className="bounding-box" 
                        style={{top: faceBox.topRow, right: faceBox.rightCol, 
                        bottom: faceBox.bottomRow, left: faceBox.leftCol }}>
                    </div> 
                  : faceBox.map(box => (     
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