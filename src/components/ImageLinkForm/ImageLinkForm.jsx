import React from "react";



const ImageLinkForm =({handleChange, handleSumit, faceCount, error}) => {
    
    return (
        <div>
            <p className="f3">
                {`This Magic Brain will detect faces in your picture. `}<i>GIT</i>{` it a try ;-)`}
            </p>
            <div className="center">
                <div className="form pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70" 
                        type="text" 
                        onChange = {handleChange} />
                    <button className="w-30 grow f4 pv2 dib white
                        bg-light-purple ba b--white link ph3"
                        onClick = {handleSumit}> Detect </button>
                </div>
            </div>
            
            { (!error) && 
                <p className="f3">{(!faceCount) ? "No Face Detected !" 
                    : (Object.keys(faceCount).length !== 0 && !faceCount.length) ? "1 Face Detected !"
                    : (faceCount.length) && `${faceCount.length} Faces Detected !`}</p> 
            }
        </div>
    )

}
export default ImageLinkForm;