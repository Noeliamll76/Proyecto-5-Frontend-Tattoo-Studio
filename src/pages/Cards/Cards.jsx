import React, { useState, useEffect } from 'react';
import { GetTattoo } from '../../services/apiCalls';
import { TattooCard } from '../../common/TattooCard/TattooCard';

import "./Cards.css";

export const Cards = () => {

    const [tattoos, setTattoos] = useState([]);

    useEffect(() => {
        if (tattoos.length === 0) {
             setTimeout(()=>{
            GetTattoo()
                .then(
                    tattoos => {
                        setTattoos(tattoos.data.data)
                    }
                )
                .catch(error => console.log(error))
             }, 2000)
        }
    }, [tattoos]);

    const tellMe = (argumento) => {
        console.log(argumento)
    }

    return (
        <div className='cardsDesign'>
            {tattoos.length > 0 ? (
                <div className='tattoosRoster'>
                    {
                    tattoos.map(tattoo => {
                        return (<TattooCard
                                    key={tattoo.id}
                                    description={tattoo.description}
                                    image={tattoo.image}
                                    createdBy_id={tattoo.createdBy_id}
                                    selected={"selectedCard"}
                                    selectFunction={() => tellMe(tattoo)}
                                /> )
                        })
                    }
                </div>
            )
            : (
                <div>Aún no han venido</div>
            )
            }
        </div>
    )
}