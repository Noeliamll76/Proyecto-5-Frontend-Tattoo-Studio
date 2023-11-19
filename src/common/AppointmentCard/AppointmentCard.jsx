
import React, { useState } from 'react';
import './AppointmentCard.css'

export const AppointmentCard = ({ artist_id, type_work,description, date, shift, tattoo_artist, selected, selectFunction }) => {

   const [change, setChange] = useState(true);

   const callSelectClick = () => {
      setChange(!change)
      selectFunction()
   }

   return (
      <div className={`appointmentCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
         <div>DATE: {date} SHIFT: {shift}</div>
         <div>TYPE WORK: {type_work}</div>
         <div>DESCRIPTION: {description}</div>
         <div>Artist id: {artist_id}</div>
         <div>TATTOO ARTIST: {tattoo_artist}</div>
      </div>
   )
}