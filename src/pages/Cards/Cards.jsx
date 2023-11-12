import React, { useState, useEffect } from 'react';
import { GetTattoo } from '../../services/apiCalls';
import { TattooCard } from '../../common/TattooCard/TattooCard';
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

import "./Cards.css";

export const Cards = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [tattoos, setTattoos] = useState([]);

    useEffect(() => {
        if (tattoos.length === 0) {
            setIsLoading(true);
            setTimeout(() => {
                {isLoading ? <LoadingSpinner /> : 
                    GetTattoo()
                    .then(
                        tattoos => {
                            setTattoos(tattoos.data.data)
                            // disabled={isLoading}
                            setIsLoading(false)
                        }
                    )
                    .catch(error => {
                        console.log(error)
                        // disabled={isLoading}
                        setIsLoading(false)
                    }
                    )
                }
            }, 500)
        }
    }, [tattoos]);

    const tellMe = (argumento) => {
        console.log(argumento)
    }

    return (
        <div className='cardsDesign'>

            {tattoos.length > 0 ? (
                <div className='tattoosRoster'>
                    { tattoos.map(tattoo =>  {
                         return (
                            <TattooCard
                                key={tattoo.id}
                                description={tattoo.description}
                                image={tattoo.image}
                                createdBy_id={tattoo.createdBy_id}
                                selected={"selectedCard"}
                                selectFunction={() => tellMe(tattoo)}
                            />)
                        })
                    }
                </div>
            )
                : (
                    <div></div>
                )
            }
        </div>
    )
}