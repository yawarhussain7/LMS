import React from 'react'
import Hero from '../../Components/Students/Hero'
import { Compaines } from '../../Components/Students/Compaines'
import CourseSection from '../../Components/Students/CourseSection'
import TestemonalSection from '../../Components/Students/TestemonalSection'
import { CalltoAction } from '../../Components/Students/CalltoAction'
import Footer from '../../Components/Students/Footer'
const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      
      <Hero />
      
       <Compaines/>
       <CourseSection/>
       <TestemonalSection/>
       <CalltoAction/>
       <Footer/>
    </div>
  )
}

export default Home