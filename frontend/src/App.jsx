import React from 'react'
import { Route, Routes,useMatch } from 'react-router-dom';
import Home from './Pages/Students_Pages/Home.jsx';
import CourseDetails from './Pages/Students_Pages/CourseDetails.jsx';
import MyEnrollments from './Pages/Students_Pages/MyEnrollments.jsx';
import CoursesList from './Pages/Students_Pages/CoursesList.jsx';
import Player from './Pages/Students_Pages/Player.jsx';
import Loading from './Pages/Students_Pages/Loading.jsx';

import Navbar from './Components/Students/Navbar.jsx';

import Educator from './Pages/Educator_Pages/Educator.jsx';
import AddCourse from './Pages/Educator_Pages/AddCourse.jsx';
import MyCourses from './Pages/Educator_Pages/MyCourses.jsx';
import Dashboard from './Pages/Educator_Pages/Dashboard.jsx';
import EnrolledStudents from './Pages/Educator_Pages/StudentEnrolled.jsx';



const App = () => {

  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className="text-default min-h-screen bg-white">
      {!isEducatorRoute && <Navbar />}
      <Routes>
         {/* students routes  */}
        <Route path='/' element={<Home />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course-list' element={<CoursesList />} />

        <Route path='/courses/:id' element={<CoursesList />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />

        <Route path='/course-details/:id' element={<CourseDetails />} />

        {/* <Route path='/courses-list/:id' element={<CoursesList />} /> */}
        {/* educator routes  */}
        <Route path='/educator' element={<Educator />} >
          <Route path='/educator/dashboard' element={<Dashboard />} />
          <Route path='/educator/add-course' element={<AddCourse />} />
          <Route path='/educator/my-courses' element={<MyCourses />} />
          <Route path='/educator/enrolled-students' element={<EnrolledStudents />} />
         

        </Route>
       


      </Routes >

    </div>
    
  
  )
}

export default App;