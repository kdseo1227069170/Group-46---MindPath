import React from 'react';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';
import BannerSectionStyle4 from '../Section/BannerSection/BannerSectionStyle4';
import Section from '../Section';
import DepartmentSectionStyle2 from '../Section/DepartmentSection/DepartmentSectionStyle2';
import FeaturesSectionStyle2 from '../Section/FeaturesSection/FeaturesSectionStyle2';
import FunFactSection from '../Section/FunFactSection';
import TeamSection from '../Section/TeamSection';
import GallerySection from '../Section/GallerySection';
import AwardSectionStyle2 from '../Section/AwardSection/AwardSectionStyle2';
import { pageTitle } from '../../helpers/PageTitle';
import './About.css';
import { Link } from 'react-router-dom';



const aboutData = [
  {
    title: '',
    subTitle:
      "MindPath is dedicated to helping Canadians navigate the complex mental health services landscape across different provinces. Whether you’re looking for information on therapy, counseling, psychiatric care, or medication coverage, MindPath offers a comprehensive, user-friendly platform to find what you need with ease.",
    iconUrl: 'images/icons/professional.svg',
  }
];

const funFactData = [
  { number: '20+', title: 'Years of experience' },
  { number: '95%', title: 'Patient satisfaction rating' },
  { number: '5000+', title: 'Patients served annually' },
  { number: '10+', title: 'Healthcare providers on staff' },
  { number: '22+', title: 'Convenient locations in the area' },
];

const teamData = [
  {
    imgUrl: 'images/about/doctor_1.png',
    name: 'Dr. James Lee, MD',
    designation: 'Head of Cardiologist',
    description:
      'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
  },
  {
    imgUrl: 'images/about/doctor_2.png',
    name: 'Dr. John Smith, MD',
    designation: 'Emergency Medicine Physician',
    description:
      'With expertise in treating acute illnesses and injuries in medicine physician',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
  },
  {
    imgUrl: 'images/about/doctor_3.png',
    name: 'Dr. Susan Bones, MD',
    designation: 'Board-certified Pediatrician',
    description:
      'With experience in managing complex medical conditions in children',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
  },
];

const galleryData = [
  { imgUrl: '/images/about/portfolio_2_lg.jpeg' },
  { imgUrl: '/images/about/portfolio_3_lg.jpeg' },
  { imgUrl: '/images/about/portfolio_1_lg.jpeg' },
  { imgUrl: '/images/about/portfolio_4_lg.jpeg' },
  { imgUrl: '/images/about/portfolio_5_lg.jpeg' },
];
const awardData = [
  {
    iconUrl: '/images/icons/award.svg',
    title: 'Malcolm Baldrige National Quality Award',
  },
  { iconUrl: '/images/icons/award.svg', title: 'HIMSS Davies Award' },
  {
    iconUrl: '/images/icons/award.svg',
    title: 'Healthgrades National’s Best Hospital',
  },
  {
    iconUrl: '/images/icons/award.svg',
    title: 'Joint Commission Gold Seal of Approval',
  },
];

export default function About() {
  pageTitle('About');
  return (
    <div className='about'>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/about/MindPathAboutMe.png"
        title="Welcome to MindPath!"
        subTitle="Your Guide to Provincial Mental Health Services and Coverage!"
      />
      <div class="about-me-services">
        <Section topMd={200} topLg={150} topXl={110}>
          <DepartmentSectionStyle2
            sectionTitle="Learn More About Our Services"
            sectionTitleUp="SERVICES"
          />
          <Link to="/services">
          <center><button style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '20px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#D4DEF1'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#007BFF'}>
              Services
            </button></center>
          </Link>
        </Section>
      </div>
      <div className="section-container">
      <div className='about-me'>
      <Section>
        <h1>About MindPath </h1>
        <p>MindPath is dedicated to helping Canadians navigate the complex mental health services landscape across different provinces. Whether you’re looking for information on therapy, counseling, psychiatric care, or medication coverage, MindPath offers a comprehensive, user-friendly platform to find what you need with ease.</p>
      </Section>
      </div>
      {/* <Section>
        <FunFactSection
          bgUrl="images/about/fun_fact_bg.jpeg"
          data={funFactData}
        />
      </Section>
      <Section topMd={190} topLg={145} topXl={105}>
        <TeamSection
          sectionTitle="Experts Doctor"
          sectionTitleUp="MEET OUR"
          data={teamData}
        />
      </Section> */}
    <div className="mission-section">
      <Section>
        <h1>Our Mission</h1>
        <p>We believe that understanding and accessing mental health services should be simple and stress-free. MindPath is designed to bridge the information gap, empowering Canadians to connect with available services, understand their coverage options, and make informed choices about their mental health journey.</p>
      </Section>
    </div>
    </div>
    <div className="help-section section-box">
      <Section>
        <h1> How MindPath Can Help You</h1>
        <ol>
          <li>Explore Services</li>
            <p>Use our searchable database to find mental health services in each province, so you can access support that best meets your needs.</p>
          <li>Understand Coverage</li>
            <p>Get detailed information about provincial health coverage for therapy, counseling, psychiatric care, and medications. Know what’s covered and what options are available in your area.</p>
          <li>Personalized Recommendations</li>
            <p>Take our confidential questionnaire to assess your mental health needs. Based on your responses, we’ll suggest relevant services that may benefit you.</p>
          <li>Crisis and Emergency Support</li>
            <p>Access resources for immediate support in times of crisis, including emergency mental health services.</p>
          <li>Track Your Journey</li>
            <p>Securely manage your mental health appointments, medication schedules, and personal progress notes, all in one place.</p>
        </ol>


      </Section>    
      </div>

      <div className="privacy-section section-box">
        <Section>
          <h1>Our Commitment to Privacy</h1>
          <p>At MindPath, your privacy and security are our priority. We’ve implemented secure data protection measures to ensure that your personal information remains confidential and protected.</p>
        </Section>
        <Section>
          <h1>Get Started with MindPath</h1>
          <p>Let MindPath be your partner in navigating mental health and wellness. Together, we will help you find the services and support you deserve.</p>
        </Section>
      </div>

      {/* <Section topMd={170} topLg={120} topXl={80}>
        <GallerySection
          sectionTitle="Our Facilities and <br />Latest Activities"
          sectionTitleUp="HAVE A LOOK AT"
          data={galleryData}
        />
      </Section>
      <Section
        topMd={190}
        topLg={145}
        topXl={105}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <AwardSectionStyle2
          sectionTitle="Winning Awards and <br />Recognition"
          sectionTitleUp="AWARDS"
          sectionSubTitle="We have been recognized for our commitment to <br />excellence in healthcare."
          data={awardData}
        />
      </Section>
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle4
          bgUrl="images/about/banner_bg_2.jpeg"
          title="Don’t Let Your Health <br />Take a Backseat!"
          subTitle="Schedule an appointment with one of our experienced <br />medical professionals today!"
          center
        />
      </Section> */}
    </div>
  );
}
