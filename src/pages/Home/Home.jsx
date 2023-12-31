
import './Home.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const Home = () => {

    const navigate = useNavigate();
    const [change, setChange] = useState(true);

    const callCardsClick = () => {
        setChange(!change)
        navigate("/cards");
    }

    return (
        <>
            <div className="homeDesign">
                <div className={`cardSubmit ${!change}`} onClick={callCardsClick}>
                    View gallery
                </div>
            </div>
        </>
    )
}

