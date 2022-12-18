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
              faceBox.map((box, index) => (     
                <div className="bounding-box" key ={index}        // it's safe to use index as key, the Data is static,
                    style={{top: box.topRow, right: box.rightCol, // reordering the list or filtering is not going to happen.
                    bottom: box.bottomRow, left: box.leftCol }}>
                </div>
              ))    
            }
        </>        
    )
}
export default DetectionDisplay;
