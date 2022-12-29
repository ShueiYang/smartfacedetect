import React from "react";

const Rank =({data}) => {
    return (
        <div>
            <div className="white f3">
               {`Hello ${data.name}, your current entry count is...`} 
            </div>
            <div className="white f1">
               {`${data.entries}`} 
            </div>
        </div>
    )

}

export default Rank;    
            
       