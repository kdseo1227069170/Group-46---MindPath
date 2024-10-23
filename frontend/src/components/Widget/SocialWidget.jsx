import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SocialWidget() {
  return (
    <div className="cs_social_links_wrap">
      <h2>Follow Us</h2>
      <div className="cs_social_links">
        <Link to="https://www.facebook.com/CanAgeSeniors/">
          <Icon icon="fa-brands:facebook-f" />
        </Link>
        <Link to="https://www.youtube.com/channel/UC5nlhaON3apFHdrc2xiccWQ/featured?view_as=subscriber">
          <Icon icon="fa-brands:youtube" />
        </Link>
        <Link to="https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F43302807">
          <Icon icon="fa-brands:linkedin-in" />
        </Link>
        <Link to="https://www.x.com/canageseniors/">
          <Icon icon="fa-brands:twitter" />
        </Link>
        <Link to="https://www.instagram.com/canageseniors/">
          <Icon icon="fa-brands:instagram" />
        </Link>
      </div>
    </div>
  );
}
