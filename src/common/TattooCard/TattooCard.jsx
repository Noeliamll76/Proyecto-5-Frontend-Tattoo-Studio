
import React, { useState } from 'react';
import './TattooCard.css'

export const TattooCard = ({ description, image, tattoo_artist, selected, selectFunction }) => {

   const [change, setChange] = useState(true);

   const callSelectClick = () => {
      setChange(!change)
      selectFunction()
   }

   return (
      <div className={`tattooCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
         <div>{description}</div>
         <div><img className='avatar' src={image} /></div>
         <div>{tattoo_artist}</div>
      </div>
   )
}