import React from 'react';
import './Services.css';
import { Link } from 'react-router-dom';
import CanadaMap from './CanadaMap';



const Services = () => {
  return (
    <div className="services-page">

      {/* Header */}
      <header className="services-header">
        <h1>Mental Health Services Available in Canada</h1>
        <p>Learn more about the types of mental health services available to Canadians and how to access them!</p>
      </header>

      {/* Types of Services Section */}
      <section className="types-of-services">
        <h2>Types of Mental Health Services</h2>
        <p>Explore the range of mental health services available, including:</p>
        <ul>
          <li><strong>Therapy and Counseling</strong>: Individual and group therapy sessions, offered by licensed professionals to support mental health and wellbeing.</li>
          <li><strong>Psychiatric Care</strong>: Consultations with psychiatrists for diagnosis, treatment plans, and medication management.</li>
          <li><strong>Medication Support</strong>: Assistance with understanding and managing prescribed medications for mental health conditions.</li>
          <li><strong>Community Support Services</strong>: Resources such as support groups and community centers that provide mental health support.</li>
        </ul>
      </section>

      {/* Coverage by Province Section */}
      <section className="coverage-by-province">
        {/* <h2>Provincial Coverage for Mental Health Services</h2>
        <p>Each province has unique mental health service coverage options. Here’s an overview:</p>
        <ul>
          <li><strong>Ontario</strong>: Coverage information coming soon.</li>
          <li><strong>British Columbia</strong>: Coverage information coming soon.</li>
          <li><strong>Alberta</strong>: Coverage information coming soon.</li>
          <li><strong>Quebec</strong>: Coverage information coming soon.</li>
          <li><strong>Manitoba</strong>: Coverage information coming soon.</li>
          <li><strong>Saskatchewan</strong>: Coverage information coming soon.</li>
          <li><strong>Nova Scotia</strong>: Coverage information coming soon.</li>
          <li><strong>New Brunswick</strong>: Coverage information coming soon.</li>
          <li><strong>Prince Edward Island</strong>: Coverage information coming soon.</li>
          <li><strong>Newfoundland and Labrador</strong>: Coverage information coming soon.</li>
        </ul> */}
        <CanadaMap />
      
      </section>
      {/* Crisis Support Section */}
      <section className="crisis-support-info">
        <h2>Immediate Crisis Support</h2>
        <p>If you or someone you know is in immediate crisis, please visit our <Link to="/crisis-support">Crisis Support page</Link> for resources and contact information, including crisis hotlines, emergency room guidance, and community crisis centers.</p>
      </section>


      {/* Finding Professionals Section */}
      <section className="finding-professionals">
        <h2>Finding Mental Health Professionals</h2>
        <p>Take our personalized questionnaire to get matched with licensed mental health professionals near you who can help. Whether you're looking for therapy, counseling, or other mental health services, we’ll guide you to the right resources.</p>
      </section>
    </div>
  );
};

export default Services;