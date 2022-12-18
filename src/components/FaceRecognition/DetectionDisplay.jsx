import React from "react";

const DetectionDisplay = ({faceBox}) => {
    
    return (
        <>
            { 
              (!Array.isArray(faceBox)) ?
                <div className="bounding-box" 
                    style={{top: faceBox.topRow, right: faceBox.rightCol, 
                    bottom: faceBox.bottomRow, left: faceBox.leftCol }}>
                </div> : 
              faceBox.map(box => (     
                <div className="bounding-box" key ={box.topRow}
                    style={{top: box.topRow, right: box.rightCol, 
                    bottom: box.bottomRow, left: box.leftCol }}>
                </div>
              ))    
            }
        </>        
    )
}
export default DetectionDisplay;
