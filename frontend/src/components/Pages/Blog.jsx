import React from 'react';
import BannerSectionStyle9 from '../Section/BannerSection/BannerSectionStyle9';
import Section from '../Section';
import BlogSectionStyle2 from '../Section/BlogSection/BlogSectionStyle2';
import Breadcrumb from '../Breadcrumb';
import { pageTitle } from '../../helpers/PageTitle';
const blogData = [
  {
    title:
      'Symptoms of anxiety and how to know when you need help',
    thumbUrl: 'images/blog/SymptomsAnxiety.png',
    author: 'By Andres Sciolla',
    date: 'August 21, 2024',
    btnText: 'Learn More',
    href: 'https://health.ucdavis.edu/blog/cultivating-health/symptoms-of-anxiety-and-how-to-know-when-you-need-help/2024/08',
    socialShare: false,
  },
  {
    title: `Social Media's Impact on Our Mental Health and Tips to Use It Safely`,
    thumbUrl: 'images/blog/SocialMediaImpact.png',
    date: 'May 10, 2024',
    author: "By Dr. Dawn Bounds",
    btnText: 'Learn More',
    href: 'https://health.ucdavis.edu/blog/cultivating-health/social-medias-impact-our-mental-health-and-tips-to-use-it-safely/2024/05',
    socialShare: false,
  },
  {
    title: 'How to Set Boundaries and Why It Matters for Your Mental Health',
    thumbUrl: 'images/blog/BoundariesMentalHealth.png',
    date: 'March 13, 2024',
    author: "By Sara Aghamohammadi",
    btnText: 'Learn More',
    href: 'https://health.ucdavis.edu/blog/cultivating-health/how-to-set-boundaries-and-why-it-matters-for-your-mental-health/2024/03',
    socialShare: false,
  },
  {
    title:'10 tips to manage stress and anxiety',
    thumbUrl:'images/blog/rethink.jpg',
    date:'October 18, 2024',
    author:'By Rethink Mental Illness',
    btnText:'Learn More',
    href:'https://www.rethink.org/news-and-stories/news-and-views/2024/10-tips-to-manage-anxiety-and-stress/',
    socialShare:false,
  },
  {
    title:'Building Connections: How Relationships and Time with Peers Can Improve Mental Health',
    thumbUrl:'images/blog/namilogo.png',
    date:'October 06, 2023',
    author:'By David Krasky',
    btnText:'Learn More',
    href:'https://www.nami.org/complimentary-health-approaches/building-connections-how-relationships-and-time-with-peers-can-improve-mental-health/',
    socialShare:false,
  },
  {
    title:'Center for Mental Health and Aging (CMHA) Blog',
    thumbUrl:'images/blog/CMHA.png',
    date:'October 17,2024',
    btnText:'Learn More',
    href:'https://www.mentalhealthandaging.com/blog/',
    socialShare:false,
  }
  
];

export default function Blog() {
  pageTitle('Blog');
  return (
    <>
      <Section topMd={170} bottomMd={96} bottomLg={70}>
        <Breadcrumb title="Learn more about the importance of Mental Health" />
      </Section>
      <Section bottomMd={200} bottomLg={150} bottomXl={110}>
        <BlogSectionStyle2 data={blogData} />
      </Section>
      <Section className="cs_footer_margin_0">
      </Section>
      <Section>

      </Section>
    </>
  );
}
