import React  from 'react';
import './ArtistAppCard.css'

export const ArtistAppCard = ({ tattoo_artist, user_id, Client, phone, type_work, description, date, shift }) => {

   return (
      <div className={`artistAppCardDesign`}>
         <div>DATE: {date} </div>
         <div>SHIFT: {shift}</div>
         <div>CLIENT: {Client}</div>
         <div>PHONE: {phone}</div>
         <div>TYPE WORK: {type_work}</div>
         <div>DESCRIPTION: {description}</div>
         <div>TATTOO ARTIST: {tattoo_artist}</div>
      </div>
   )
}

