import React, { useEffect, useState } from 'react'
import humanizeDuration from 'humanize-duration'
import { AppContext } from '../../Context/AppContext'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import YouTube from 'react-youtube'
import Footer from '../../Components/Students/Footer'
import Rating from '../../Components/Students/Rating'

const Player = () => {

  const {calculateCourseChapterTime,enrolledCourse} = useContext(AppContext)
  const {courseId} = useParams()
  const [courseData,setcourseData] = useState(null)
  const [openSection, setOpenSection] = useState({})
  const [playerData,setplayerData] = useState(null)

  const GetCourseData = ()=>{
    enrolledCourse.map((course)=>{
      if(course._id === courseId){
        setcourseData(course)
      }
    })
  }

  const toggleSection = (index) => {
    setOpenSection((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }

  useEffect(()=>{
    GetCourseData()
  },[enrolledCourse])

  return (
  <>
   <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
    {/* left column */}
    <div className='text-gray-800'>
      <h2 className='text-xl font-semibold'>Course Structure</h2>

        <div className="pt-5 space-y-3">
                    {courseData && courseData.courseContent.map((chapter, index) => (
                      <div
                        key={index}
                        className="border rounded-lg bg-white shadow-sm overflow-hidden"
                      >
      
                        {/* HEADER */}
                        <div
                          className="flex items-center justify-between px-4 py-3 cursor-pointer"
                          onClick={() => toggleSection(index)}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              className={`w-4 transition-transform ${openSection[index] ? "rotate-180" : ""
                                }`}
                              src={assets.down_arrow_icon}
                              alt="arrow"
                            />
                            <p className="font-medium text-sm md:text-base text-gray-800">
                              {chapter.chapterTitle}
                            </p>
                          </div>
      
                          <p className="text-xs md:text-sm text-gray-500">
                            {chapter.chapterContent.length} lectures •{" "}
                            {calculateCourseChapterTime(chapter)}
                          </p>
                        </div>
      
                        {/* CONTENT */}
                        <div
                          className={`transition-all duration-300 overflow-hidden ${openSection[index] ? "max-h-96" : "max-h-0"
                            }`}
                        >
                          <ul className="border-t bg-gray-50 pl-6 pr-3 py-3 text-sm text-gray-600 space-y-2">
                            {chapter.chapterContent.map((lecture, i) => (
                              <li key={i} className="flex items-start justify-between gap-2">
      
                                <div className="flex items-start gap-2">
                                  <img
                                    src={false ? assets.blue_tick_icon : assets.play_icon}
                                    className="w-4 h-4 mt-1"
                                    alt="play"
                                  />
                                  <p>{lecture.lectureTitle}</p>
                                </div>
      
                                <div className="flex items-center gap-3 text-xs">
                                  {lecture.lectureUrl && (
                                    <span onClick={() => {
                                      setplayerData({
                                        ...lecture, chapter:index + 1,lecture: i + 1
                                      })
                                    }} className="text-blue-500 cursor-pointer">Watch</span>
                                  )}
                                  <span>
                                    {humanizeDuration(
                                      lecture.lectureDuration * 60 * 1000,
                                      { units: ['h', 'm'] }
                                    )}
                                  </span>
                                </div>
      
                              </li>
                            ))}
                          </ul>
                        </div>
      
                      </div>
                    ))}
                  </div>

                  <div className='flex items-center gap-2 py-3 mt-10'>
                    <h1 className='text-xl font-bold'>Rate this Course:</h1>
                    <Rating inititalRating={0}/>
                  </div>
    </div>
    {/* right column */}
    <div className='md:mt-10'>
     {
      playerData ? (
      <div>
        <YouTube videoId={playerData.lectureUrl.split('/').pop()}  iframeClassName='w-full aspect-video'/>
        <div className='flex items-center justify-between mt-1'>
          <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
          <button className='text-blue-600 cursor-pointer'>{false ? 'Marks Complete': 'Not Complete'}</button>
        </div>
      </div>
      ): <img src={courseData ? courseData?.courseThumbnail : ""} alt="" />
     }

    </div>
   </div>

    <Footer/>
  </>
  )
}

export default Player