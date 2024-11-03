import React from 'react';

const CrisisSupportPage = () => {
    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.mainHeading}>Mental Health Support</h1>
            <p style={styles.paragraph}>
                If you are in crisis, there are services available to help.
                This page offers information and resources for mental health support in Canada.
            </p>

            <section style={styles.section}>
                <h2 style={styles.subheading}>If you or someone you know is in crisis</h2>
                <p style={styles.paragraph}>If you're in immediate danger or need urgent medical support, call
                    9-1-1.</p>
                <p style={styles.paragraph}>If you or someome you know is thinking about suicide, call or text 9-8-8.
                    Support is available 24
                    hours a day, 7 days a week.</p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>9-8-8: Suicide Crisis Helpline</h2>
                <p style={styles.paragraph}>
                    If you or someone you know is thinking about suicide, call or text 9-8-8. Support is available 24
                    hours a day, 7 days a week. The helpline offers support that is: </p>
                <ul style={styles.list}>
                    <li>Bilingual</li>
                    <li>Trauma-informed</li>
                    <li>Culturally appropriate</li>
                    <li>Available to anyone in Canada</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>Services offered by national mental health organizations</h2>
                <h3 style={styles.subSubheading}>Canadian Mental Health Association (CMHA)</h3>
                <ul style={styles.list}>
                    <li>Information about:
                        <ul style={styles.nestedList}>
                            <li>Mental health
                                <a href="https://cmha.ca/find-info/mental-health/general-info/"
                                   target="_blank" rel="noopener noreferrer"
                                   style={styles.link}> resources</a>
                            </li>
                            <li>Mental health
                                <a
                                    href="https://cmha.ca/what-we-do/national-programs/" target="_blank"
                                    rel="noopener noreferrer" style={styles.link}> programs</a>
                            </li>
                            <li>mental health and mental illness</li>
                            <li>how to find support for
                                <a href="https://cmha.ca/find-help/how-to-get-help/"
                                   target="_blank" rel="noopener noreferrer"
                                   style={styles.link}> oneself</a> or <a
                                    href="https://cmha.ca/find-help/helping-others/"
                                    target="_blank" rel="noopener noreferrer"
                                    style={styles.link}> others</a>
                            </li>
                            <li>how to find a
                                <a href="https://cmha.ca/find-help/find-cmha-in-your-area/"
                                   target="_blank" rel="noopener noreferrer" style={styles.link}> CMHA
                                    branch in your area</a>
                            </li>
                        </ul>
                    </li>
                    <li>Available in English and French</li>
                </ul>
                <h3 style={styles.subSubheading}>Centre for Addiction and Mental Health (CAMH)</h3>
                <ul style={styles.list}>
                    <li>Free <a href="https://moodle8.camhx.ca/moodle/"
                                target="_blank" rel="noopener noreferrer" style={styles.link}> online courses</a> for:
                        <ul style={styles.nestedList}>
                            <li>youth</li>
                            <li>students</li>
                            <li>adults</li>
                            <li>families</li>
                        </ul>
                    </li>
                    <li>
                        <a href="https://www.camh.ca/en/health-info/mental-health-101?page=1"
                           target="_blank" rel="noopener noreferrer" style={styles.link}> Mental Health
                            101</a> tutorials on topics related to <a href="https://www.camh.ca/en/" target="_blank"
                                                                      rel="noopener noreferrer"
                                                                      style={styles.link}> mental health and
                        addictions</a>
                    </li>
                </ul>
                <h3 style={styles.subSubheading}>MyGrief.ca</h3>
                <ul style={styles.list}>
                    <li>
                        <a href="https://www.mygrief.ca"
                           target="_blank" rel="noopener noreferrer" style={styles.link}> Online Resources </a> for
                        understanding and moving through grief.
                    </li>
                </ul>
                <h3 style={styles.subSubheading}>KidsGrief.ca</h3>
                <ul style={styles.list}>
                    <li>
                        <a href="https://www.kidsgrief.ca"
                           target="_blank" rel="noopener noreferrer" style={styles.link}> Resources for talking with
                            kids
                            and teens </a> about serious illness, dying and death
                    </li>
                    <li>
                        Includes information for parents and educators
                    </li>
                </ul>
                <h3 style={styles.subSubheading}>YouthGrief.ca</h3>
                <ul style={styles.list}>
                    <li>
                        <a href="https://youthgrief.ca"
                           target="_blank" rel="noopener noreferrer" style={styles.link}> Online Resource </a> developed
                        by grieving youth, for grieving youth
                    </li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subheading}>For First Nations, Inuit, and Métis Peoples</h2>
                <h3 style={styles.subSubheading}>Hope for Wellness Help Line</h3>
                <p style={styles.paragraph}>
                    Call 1-855-242-3310 (toll-free) or connect to the <a href="https://www.hopeforwellness.ca"
                                                                         target="_blank" rel="noopener noreferrer"
                                                                         style={styles.link}> online Hope for Wellness
                    chat </a>.
                </p>
                <p style={styles.paragraph}>
                    Available 24 hours a day, 7 days a week to First Nations, Inuit, and Métis Peoples seeking emotional
                    support, crisis intervention, or referrals to community-based services.
                </p>
                <p style={styles.paragraph}>
                    Support is available in English and French and, by request, in Cree, Ojibway, and Inuktitut.
                </p>
                <h3 style={styles.subSubheading}>The National Indian Residential School Crisis Line</h3>
                <p style={styles.paragraph}>
                    Crisis support is available to former Indian Residential School students and their families 24 hours
                    a day, 7 days a week at 1-866-925-4419 (toll-free).
                </p>
                <h3 style={styles.subSubheading}>Missing and Murdered Indigenous Women and Girls Crisis Line</h3>
                <p style={styles.paragraph}>
                    Crisis support is available to individuals impacted by the issue of missing and murdered Indigenous
                    women, girls, and 2SLGBTQQIA+ people 24 hours a day, 7 days a week at 1-844-413-6649 (toll-free).
                </p>
            </section>
            <section style={styles.section}>
                <h2 style={styles.subheading}>For youth and young adults</h2>
                <h3 style={styles.subSubheading}>Kids Help Phone</h3>
                <p style={styles.paragraph}>
                    Call 1-800-668-6868 (toll-free) or text CONNECT to 686868. Available 24 hours a day, 7 days a week
                    to Canadians aged 5 to 29 who want confidential and anonymous care from trained responders.
                </p>
                <p style={styles.paragraph}>
                    Visit the <a href="https://kidshelpphone.ca"
                                 target="_blank" rel="noopener noreferrer" style={styles.link}> Kids Help Phone
                    website </a> for online chat support or to access online resources for children and youth.
                </p>
            </section>
            <section style={styles.section}>
                <h2 style={styles.subheading}>For Veterans and their families</h2>
                <p style={styles.paragraph}>
                    Find <a
                    href="https://www.veterans.gc.ca/en/mental-and-physical-health/mental-health-and-wellness?utm_source=HealthCanada&utm_medium=Link&utm_campaign=MentalHealth"
                    target="_blank" rel="noopener noreferrer" style={styles.link}> supports, online resources, and
                    mobile apps </a> to improve well-being for releasing and former
                    members of the CAF or RCMP, their families, and their caregivers.
                </p>
            </section>
            <section style={styles.section}>
                <h2 style={styles.subheading}>Mental health and substance use</h2>
                <p style={styles.paragraph}>
                    There are many links between mental health and substance use. If you or someone you know is
                    struggling with substance use, <a
                    href="https://www.canada.ca/en/health-canada/services/substance-use/get-help-with-substance-use.html"
                    target="_blank" rel="noopener noreferrer" style={styles.link}> help is available </a>.
                </p>
            </section>
            <section style={styles.section}>
                <h2 style={styles.subheading}>More ways to get help</h2>
                <p style={styles.paragraph}>If you need help, you can call a:</p>
                <ul style={styles.list}>
                    <li>family physician</li>
                    <li>psychologist</li>
                    <li>mental health nurse</li>
                    <li>social worker</li>
                </ul>
                <p style={styles.paragraph}>You may also want to talk to another trusted professional, such as a
                    counsellor or spiritual leader.</p>
            </section>
            <section style={styles.section}>
                <h2 style={styles.subheading}>Related links</h2>
                <ul style={styles.list}>
                    <li><a href="https://www.canada.ca/en/public-health/services/about-mental-health.html"
                           target="_blank" rel="noopener noreferrer" style={styles.link}> About mental health </a>
                    </li>
                    <li><a
                        href="https://www.canada.ca/en/health-canada/services/publications/healthy-living/evacuations-mental-health.html"
                        target="_blank" rel="noopener noreferrer" style={styles.link}> Evacuations and your mental
                        health</a>
                    </li>
                    <li><a
                        href="https://www.sac-isc.gc.ca/eng/1576089278958/1576089333975?utm_source=canada.ca&utm_medium=hc&utm_content=en-healthcanada-mentalhealthsupportpage&utm_campaign=sac-isc-mentalhealth-22-23"
                        target="_blank" rel="noopener noreferrer" style={styles.link}> Mental wellness in First Nations
                        and Inuit communities </a>
                    </li>
                    <li><a href="https://canemerg-urgencecan.com"
                           target="_blank" rel="noopener noreferrer" style={styles.link}> Canadian Emergency Response
                        Psychosocial Support Network: Mental health guidance and resource </a>
                    </li>
                </ul>
            </section>
        </div>
    );
};

const styles = {
    pageContainer: {
        padding: '20px',
        paddingTop:
            '120px',
        color:
            '#333',
        margin:
            '0 auto',
        maxWidth:
            '1200px',
    }
    ,
    mainHeading: {
        fontSize: '28px',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '16px',
        lineHeight: '1.6',
        marginBottom: '10px',
    },
    section: {
        marginBottom: '20px',
    },
    subheading: {
        fontSize: '32px',
        textAlign: 'left',
        display: 'block',
    },
    subSubheading: {
        fontSize: '22px',
        textAlign: 'left',
    },
    link: {
        color: '#007bff',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    nestedList: {
        paddlingLeft: '20px',
        listStyleType: 'circle',
    },
};

export default CrisisSupportPage;