import {Route, Routes, useLocation, Link} from 'react-router-dom';
import CrisisSupport from './components/CrisisSupport';
import CrisisSupportPage from './components/CrisisSupportPage';

import Layout from './components/Layout';
import Layout2 from './components/Layout/Layout2';
import Layout3 from './components/Layout/Layout3';
import Layout4 from './components/Layout/Layout4';

import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Doctors from './components/Pages/Doctors';
import Blog from './components/Pages/Blog';
import Appointments from './components/Pages/Appointments';
import Departments from './components/Pages/Departments';
import DepartmentDetails from './components/Pages/DepartmentDetails';
import BlogDetails from './components/Pages/BlogDetails';
import DoctorDetails from './components/Pages/DoctorDetails';
import PricingPlan from './components/Pages/PricingPlan';
import Gallery from './components/Pages/Gallery';
import Timetable from './components/Pages/Timetable';
import Contact from './components/Pages/Contact';
import React, {useEffect} from 'react';
import ErrorPage from './components/Pages/ErrorPage';



// Import Admin Dashboard
import AdminDashboard from './components/AdminDashboard';

// Importing the Loading Spinner
import LoadingSpinner from './components/LoadingSpinner';

// Import Registration Form
import RegistrationForm from './components/RegistrationForm';

function App() {
    const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
	<>
      
      
  
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="doctors/:doctorId" element={<DoctorDetails />} />
        <Route path="blog" element={<Blog />} />
		<Route path="register" element={<RegistrationForm />} />
        <Route path="blog/:blogId" element={<BlogDetails />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="departments" element={<Departments />} />
        <Route
          path="departments/:departmentId"
          element={<DepartmentDetails />}
        />
        <Route path="pricing-plan" element={<PricingPlan />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="/crisis-support" element={<CrisisSupportPage/>}/>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
	</>
  );
}

export default App;
