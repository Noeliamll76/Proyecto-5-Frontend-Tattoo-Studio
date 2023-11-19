
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
         <div>Date: {date} Shift: {shift}</div>
         <div>Type work: {type_work}</div>
         <div>Description: {description}</div>
         <div>Tatto artist: {tattoo_artist}</div>

      </div>
   )
}