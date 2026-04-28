import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import Searchbar from '../../Components/Students/Searchbar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../Components/Students/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../Components/Students/Footer'

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext)

  const [filter, setfilter] = useState([])

  // get data form url 
  const { input } = useParams()

 useEffect(() => {
  if (!allCourses) return

  let result = allCourses

  if (input) {
    result = allCourses.filter(item =>
      item.courseTitle?.toLowerCase().includes(input.toLowerCase())
    )
  }

  setfilter(result)
}, [allCourses, input])

  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left'>
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
            <p className='text-gray-500 cursor-pointer'>
              <span onClick={() => { navigate('/') }} className='text-blue-600 cursor-pointer'>Home</span> / <span>Course List</span>
            </p>
          </div>

          <div>
            <Searchbar data={input} />
          </div>
        </div>
        {/* <--- Courses --->  */}
        {
          input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-800'>
          <p className='text-sm'>{input}</p>
          <img src={assets.cross_icon} alt="cross icon" className='cursor-pointer' onClick={()=>{navigate('/course-list')}} />
          </div>
        }
        <div className='grid md:grid-cols-4 sm:grid-cols-1 px-4 md:px-0 md:my-16 my-10 gap-4'>
          {
            filter.map((course,index) => {
              return <CourseCard key={index} course={course} />
            })
          }

        </div>
      </div>

      <Footer/>
    </>
  )
}

export default CoursesList