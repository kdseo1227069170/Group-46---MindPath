import React from 'react';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import MenuWidget from '../Widget/MenuWidget';
import SocialWidget from '../Widget/SocialWidget';
import Newsletter from '../Widget/Newsletter';
import TextWidget from '../Widget/TextWidget';

const menuDataOne = [
  { title: 'About Us', href: '/about' },
  { title: 'Departments', href: '/departments' },
  { title: 'Doctors', href: '/doctors' },
  { title: 'Timetable', href: '/timetable' },
  { title: 'Appointment', href: '/appointments' },
  { title: 'Testimonials', href: '/' },
];
const menuDataTwo = [
  { title: 'Blog', href: '/blog' },
  { title: 'Contact Us', href: '/contact' },
  { title: 'FAQs', href: '/' },
  { title: 'Privacy Policy', href: '/' },
  { title: 'Terms and Conditions', href: '/' },
];

export default function Footer() {
  return (
    <footer className="cs_footer cs_style_1 cs_heading_color">
      <div
        className="cs_footer_logo_wrap"
        style={{ backgroundImage: 'url(/images/footer_bg_1.svg)' }}
      >
        <div
          className="cs_footer_brand"
          style={{ backgroundImage: 'url(/images/footer_logo_bg.svg)' }}
        >
          <img
            src="/images/canadaLeaf.svg"
            alt="Canada Leaf Icon"
            className="cs_footer_brand_icon"
          />
          <h2 className="cs_footer_brand_text">MindPath</h2>
        </div>
      </div>
      <div className="cs_footer_main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="cs_footer_item">
                <TextWidget text="CanAge" />
                <ContactInfoWidget />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="cs_footer_item">
                <MenuWidget data={menuDataOne} />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="cs_footer_item">
                <MenuWidget data={menuDataTwo} />
              </div>
            </div>
            <div className="col-lg-4">
            <div className="helpline">
              <h3>Mental Health Helplines</h3>

              <ul className="helpline-list">
                <li><strong>National Helpline:</strong><a href="tel:1-855-242-3310"> 1-855-242-3310</a></li>

                <li><strong>Alberta Helpline:</strong><a href="tel:1-877-303-2642"> 1-877-303-2642</a></li>

                <li><strong>British Columbia Helpline:</strong> <a href="tel:310-6789">310-6789</a></li>

                <li><strong>Manitoba Helpline:</strong> <a href="tel:1-877-435-7170">1-877-435-7170</a></li>

                <li><strong>New Brunswick Helpline:</strong><a href="tel:1-866-355-5550"> 1-866-355-5550</a></li>

                <li><strong>Newfoundland and Labrador  Helpline: </strong><a href="tel:1-877-999-7589">1-877-999-7589 </a> </li>
                
                <li><strong>Nova Scotia  Helpline:</strong><a href="tel:1-855-466-4994"> 1-855-466-4994</a></li>
                
                <li><strong>Ontario Helpline:</strong><a href="tel:1-866-531-2600"> 1-866-531-2600</a></li>

                <li><strong>Prince Edward Island Helpline:</strong><a href="tel:1-833-553-6983"> 1-833-553-6983</a></li>

                <li><strong>Quebec Helpline:</strong> <a href="tel:1-800-263-2266"> 1-800-263-2266</a></li>

                <li><strong>Saskatchewan Helpline:</strong><a href="tel:1-800-611-6349"> 1-800-611-6349</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="cs_footer_bottom cs_accent_bg">
        <div className="container">
          <div className="cs_footer_bottom_in">
            <SocialWidget />
            <div className="cs_copyright">
              Copyright © 2024 MindPath. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
