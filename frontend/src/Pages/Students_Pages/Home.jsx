import React from 'react'
import Hero from '../../Components/Students/Hero'
import { Compaines } from '../../Components/Students/Compaines'
import CourseSection from '../../Components/Students/CourseSection'
import TestemonalSection from '../../Components/Students/TestemonalSection'
const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      
      <Hero />
      
       <Compaines/>
       <CourseSection/>
       <TestemonalSection/>
    </div>
  )
}

export default Home