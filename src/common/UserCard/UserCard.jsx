import React  from 'react';
import './UserCard.css'

export const UserCard = ({ name, email, phone}) => {

   return (
      <div className={`userCardDesign`}>
         <div>NAME: {name} </div>
         <div>EMAIL: {email}</div>
         <div>PHONE: {phone}</div>
      </div>
   )
}