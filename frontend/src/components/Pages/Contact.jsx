import React from 'react';
import ContactForm from '../ContactForm';
import { pageTitle } from '../../helpers/PageTitle';
import './Contact.css';

export default function Contact() {
  pageTitle('Contact');
  return (
    <>
    <div className='contactPage'>
      <div className="cs_banner_contact">
        <h1 className="cs_banner_contact_title">Contact Us</h1>
        <div className="cs_banner_contact_img">
          <img src="/images/contact/mentalHealth.jpg" alt="Mental Health" />
        </div>
      </div>
          <div className="col-lg-10 offset-lg-1">
            <ContactForm />
          </div>
    </div>
    </>
  );
}