import { Route, Routes, useLocation, Link } from 'react-router-dom';
import CrisisSupportPage from './components/CrisisSupportPage';
import Questionnaire from "./components/Questionnaire";
import Layout from './components/Layout';
import RegistrationForm from './components/RegistrationForm';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Doctors from './components/Pages/Doctors';
import Blog from './components/Pages/Blog';
import Appointments from './components/Pages/Appointments';
import BlogDetails from './components/Pages/BlogDetails';
import DoctorDetails from './components/Pages/DoctorDetails';
import PricingPlan from './components/Pages/PricingPlan';
import Gallery from './components/Pages/Gallery';
import Timetable from './components/Pages/Timetable';
import Contact from './components/Pages/Contact';
import React, { useState,createContext, useEffect } from 'react';
import ErrorPage from './components/Pages/ErrorPage';
import Services from './components/Services/Services';
import AdminDashboard from './components/AdminDashboard';
import LoadingSpinner from './components/LoadingSpinner';
import ContactForm from './components/Pages/Contact';
import LoginForm from './components/LoginForm';  
import './App.css';
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext(null);

function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    const [theme,setTheme] = useState("light");
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    }

    return (
        <ThemeContext.Provider value={{toggleTheme}}>
        <div className="App" id={theme}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="doctors" element={<Doctors />} />
                    <Route path="doctors/:doctorId" element={<DoctorDetails />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="blog/:blogId" element={<BlogDetails />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="pricing-plan" element={<PricingPlan />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="timetable" element={<Timetable />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="/crisis-support" element={<CrisisSupportPage />} />
                    <Route path="questionnaire" element={<Questionnaire />} />
                    <Route path="services" element={<Services />} />
                    <Route path="/contact" element={<ContactForm />} />
                    <Route path="register" element={<RegistrationForm />} />
					<Route path="login" element={<LoginForm />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <div className="switch">
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
            </div>
        </div>
        </ThemeContext.Provider>
    );
}

export default App;