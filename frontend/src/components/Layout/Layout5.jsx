import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FooterStyle4 from '../Footer/FooterStyle4';
import HeaderStyle2 from '../Header/HeaderStyle2';

export default function Layout5() {
  return (
    <>
      <HeaderStyle2
        logoSrc="/images/logoTest.png"
        variant="cs_heading_color cs_color_2"
        btnText="Book Now"
        btnUrl="/appointments"
      />
	  <div>
      
      <nav>
        <Link to="/register">Register</Link>
      </nav>
     
    </div>
      <Outlet />
      <FooterStyle4 />
    </>
  );
}

