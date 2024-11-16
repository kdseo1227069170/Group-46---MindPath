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
    thumbUrl: 'images/blog/post_1.jpeg',
    author: 'By Andres Sciolla',
    date: 'August 21, 2024',
    btnText: 'Learn More',
    href: 'https://health.ucdavis.edu/blog/cultivating-health/symptoms-of-anxiety-and-how-to-know-when-you-need-help/2024/08',
    socialShare: false,
  },
  {
    title: `Social Media's Impact on Our Mental Health and Tips to Use It Safely`,
    thumbUrl: 'images/blog/post_2.jpeg',
    date: 'May 10, 2024',
    author: "By Dr. Dawn Bounds",
    btnText: 'Learn More',
    href: 'https://health.ucdavis.edu/blog/cultivating-health/social-medias-impact-our-mental-health-and-tips-to-use-it-safely/2024/05',
    socialShare: false,
  },
  {
    title: 'How to Set Boundaries and Why It Matters for Your Mental Health',
    thumbUrl: 'images/blog/post_3.jpeg',
    date: 'March 13, 2024',
    author: "By Sara Aghamohammadi",
    btnText: 'Learn More',
    href: 'https://health.ucdavis.edu/blog/cultivating-health/how-to-set-boundaries-and-why-it-matters-for-your-mental-health/2024/03',
    socialShare: false,
  },

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
    </>
  );
}
