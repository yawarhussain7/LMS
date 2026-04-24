import React from 'react'
import {assets} from '../../assets/assets'
import Searchbar from './Searchbar'

const Hero = () => {
  return (
  
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center  bg-linear-to-b from-cyan-100/70'>
      <h1 className='font-md:text-home-heading-large text-[48px] text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto'>Empower  you future with the course designed to <span className='text-blue-600'>fit your choice.</span>
      <img src={assets.sketch} alt="Sketch" className='md:block hidden absolute -botton-7 right-0' />
      </h1>

      <p className='md:block hidden text-gray-500 max-w-2xl max-auto'> We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.</p>
      {/* for mobile  */}
      <p className='md:hidden text-gray-500 max-w-sm max-auto'> We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.</p>
      <Searchbar />
    </div>
    
  )
}

export default Hero