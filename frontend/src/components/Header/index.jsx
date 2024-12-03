import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import DropDown from './DropDown';
import SocialWidget from '../Widget/SocialWidget';
import Newsletter from '../Widget/Newsletter';
import IconBoxStyle11 from '../IconBox/IconBoxStyle11';
import Spacing from '../Spacing';
import {Link as ScrollLink} from 'react-scroll';
import CrisisSupport from '../CrisisSupport';

// Header component for the website
export default function Header({logoSrc, variant}) {
    const [isSticky, setIsSticky] = useState(false);
    const [mobileToggle, setMobileToggle] = useState(false);
    const [searchToggle, setSearchToggle] = useState(false);

    // Add scroll listener to toggle sticky header
    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to FAQ section
    const handleFaqScroll = () => {
        setTimeout(() => {
            const faqSection = document.getElementById('faq-section');
            if (faqSection) faqSection.scrollIntoView({behavior: 'smooth'});
        }, 0);
    };

    return (
        <>
            <header
                className={`cs_site_header cs_style1 cs_sticky_header ${mobileToggle ? 'cs_mobile_toggle_active' : ''} ${variant} ${isSticky ? 'cs_active_sticky' : ''}`}
            >
                <div className="cs_main_header">
                    <div className="container">
                        <div className="cs_main_header_in">
                            <div className="cs_main_header_left">
                                <Link className="cs_site_branding" to="/">
                                    <img src={logoSrc} alt="Logo"/>
                                </Link>
                                <nav className="cs_nav">
                                    <ul className={`${mobileToggle ? 'cs_nav_list cs_active' : 'cs_nav_list'}`}>
                                        <li>
                                            <Link to="/about">About</Link>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <Link to="/services">Services</Link>
                                            <DropDown>
                                                <ul>
                                                    <li><Link to="/questionnaire"
                                                              className="cs_nav_button">Questionnaire</Link></li>
                                                </ul>
                                            </DropDown>
                                        </li>

                                        <li>
                                            <Link to="/" onClick={handleFaqScroll}>FAQ</Link>
                                        </li>
                                        <li>
                                            <Link to="/Blog">Blog</Link>
                                        </li>
                                        <div
                                            style={{
                                                position: "absolute",
                                                right: 200,
                                                zIndex: 1000,
                                            }}
                                        >
                                            <CrisisSupport/>
                                        </div>
                                    </ul>
                                    <span
                                        className={`cs_menu_toggle ${mobileToggle ? 'cs_teggle_active' : ''}`}
                                        onClick={() => setMobileToggle(!mobileToggle)}
                                    >
                    <span></span>
                  </span>
                                </nav>
                            </div>
                            <div className="cs_main_header_right">
                                <div className="cs_toolbox">

                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '35px',
                                            right: '50px',
                                            zIndex: 1000,
                                        }}
                                    >
                                        <Link to="/register">
                                            <button>Register</button>
                                        </Link>
                                    </div>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '35px',
                                            right: '125px',  // Adjust position
                                            zIndex: 1000,
                                        }}
                                    >
                                        <Link to="/login">
                                            <button>Login</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="cs_search_icon_fixed">
                <button
                    className="cs_toolbox_btn cs_search_toggle_btn"
                    type="button"
                    onClick={() => setSearchToggle(!searchToggle)}
                >
                    <svg
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.1684 0C5.91146 0 0 5.90944 0 13.164C0 20.4184 5.91146 26.3394 13.1684 26.3394C16.2681 26.3394 19.1188 25.2535 21.3719 23.4505L26.8571 28.931C27.1339 29.1962 27.5036 29.3426 27.887 29.3386C28.2704 29.3347 28.6371 29.1809 28.9084 28.91C29.1797 28.6392 29.3342 28.2729 29.3386 27.8896C29.3431 27.5064 29.1972 27.1365 28.9322 26.8595L23.4471 21.3762C25.2521 19.1204 26.3397 16.2662 26.3397 13.164C26.3397 5.90944 20.4254 0 13.1684 0ZM13.1684 2.926C18.8435 2.926 23.4099 7.49078 23.4099 13.164C23.4099 18.8371 18.8435 23.4134 13.1684 23.4134C7.4933 23.4134 2.92695 18.8371 2.92695 13.164C2.92695 7.49078 7.4933 2.926 13.1684 2.926Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>

            {/* Search Overlay */}
            <div className={`cs_header_search ${searchToggle ? 'active' : ''}`}>
                <div className="cs_header_search_in">
                    <div className="container">
                        <div className="cs_header_search_box">
                            <form className="cs_search_form">
                                <input type="text" placeholder="Search Doctors"/>
                                <button className="cs_search_btn">
                                    <svg
                                        width={18}
                                        height={18}
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.07914 0C3.62682 0 0 3.62558 0 8.07641C0 12.5272 3.62682 16.1599 8.07914 16.1599C9.98086 16.1599 11.7299 15.4936 13.1122 14.3875L16.4775 17.7498C16.6473 17.9126 16.8741 18.0024 17.1094 18C17.3446 17.9975 17.5695 17.9032 17.736 17.737C17.9025 17.5708 17.9972 17.3461 17.9999 17.111C18.0027 16.8758 17.9132 16.6489 17.7506 16.4789L14.3853 13.1148C15.4928 11.7308 16.16 9.97968 16.16 8.07641C16.16 3.62558 12.5315 0 8.07914 0ZM8.07914 1.79517C11.561 1.79517 14.3625 4.59577 14.3625 8.07641C14.3625 11.557 11.561 14.3647 8.07914 14.3647C4.59732 14.3647 1.79575 11.557 1.79575 8.07641C1.79575 4.59577 4.59732 1.79517 8.07914 1.79517Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            </form>
                            <button
                                className="cs_close"
                                type="button"
                                onClick={() => setSearchToggle(!searchToggle)}
                            >
                                <img src="/images/icons/close.svg" alt="Close"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className="cs_sidenav_overlay"
                    onClick={() => setSearchToggle(!searchToggle)}
                />


            </div>
        </>
    );
}


