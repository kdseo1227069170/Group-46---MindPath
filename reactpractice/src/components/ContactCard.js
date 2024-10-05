import React from "react";

function ContactCard(props){
    return (
        <div className="contact-card">
            <img className="contact-img" src={props.contact.imgURL} />
            <h3>{props.contact.name}</h3>
            <p>Phone: {props.contact.phone}</p>
            <p>Email: {props.contact.email} </p>
        </div>

    )

}

export default ContactCard