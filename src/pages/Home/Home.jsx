
import './Home.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import background from "./img/fachada.jpg";

export const Home = () => {

    const navigate = useNavigate();
    const [change, setChange] = useState(true);

    const callCardsClick = () => {
        setChange(!change)
        setTimeout(() => {
            navigate("/cards");
        }, 1000);
    }

    return (
        <>
            <div className="homeDesign"> 

            {/* <div 
                // style={{ backgroundImage: `url(${background})` }}> */}
{/* <img src={require(`${background}`)} alt="cover" width={260} height={160}/> */}
                
                <div className={`cardSubmit ${!change}`} onClick={callCardsClick}>
                    View gallery
                </div>
            {/* </div> */}


          </div> 
        </>
    )
}

