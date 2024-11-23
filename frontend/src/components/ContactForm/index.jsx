import React from 'react';
import './contactForm.css';

export default function ContactForm() {
  return (
    <div className="cs_contact_form">
      <div className="row">
        <div className="col-lg-6">
          <label className="cs_input_label">Name</label>
          <input type="text" className="cs_form_field" placeholder="Your Name" />
        </div>
        <div className="col-lg-6">
          <label className="cs_input_label">Email</label>
          <input type="email" className="cs_form_field" placeholder="example@gmail.com" />
        </div>
        <div className="col-lg-12">
          <label className="cs_input_label">Subject</label>
          <input type="text" className="cs_form_field" placeholder="Your subject" />
        </div>
        <div className="col-lg-12">
          <label className="cs_input_label">Message</label>
          <textarea
            cols={30}
            rows={10}
            className="cs_form_field"
            placeholder="Write something..."
          />
        </div>
        <div className="col-lg-12">
          <button className="cs_btn">
            <span>Submit</span>
            <i>
              <img src="/images/icons/arrow_white.svg" alt="Icon" />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
}
