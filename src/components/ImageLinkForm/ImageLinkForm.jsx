import React, { useEffect, useState } from "react";


const ImageLinkForm =({handleChange, handleSumit, faceCount, error}) => {

    const [countDisplay, setCountDisplay] = useState("No picture for checking...");

    function resetCount() {
        setCountDisplay("ongoing...");
    }
    
    useEffect(() => {  
        if(!faceCount) {
            setCountDisplay("No Face Detected !")
        } else if (Object.keys(faceCount).length !== 0 && !faceCount.length) {
            setCountDisplay("1 Face Detected !")
        } else if (faceCount.length) {
            setCountDisplay(`${faceCount.length} Faces Detected !`)
        }
    }, [faceCount]);
    
    return (
        <div>
            <p className="f3">
                {`This Magic Brain will detect faces in your picture. `}<i>GIT</i>{` it a try ;-)`}
            </p>
            <div className="center">
                <div className="form pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70" 
                        placeholder="Submit an image URL here..."
                        type="text" 
                        onChange = {handleChange} />
                    <button className="w-30 grow f4 pv2 dib white
                        bg-light-purple ba b--white link ph3"
                        onClick = {()=> {handleSumit(); resetCount()}}> Detect </button>
                </div>
            </div>
            <p className="f3">{error? "No picture for checking..." : countDisplay}</p>  
        </div>
    )

}
export default ImageLinkForm;