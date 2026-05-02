import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import Loading from '../../Components/Students/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../Components/Students/Footer'

const CourseDetails = () => {

  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSection, setOpenSection] = useState({})
  const [isAlread_Enrolled, setIsAlread_Enrolled] = useState(false)

  const {
    allCourses,
    calculateAverageRating,
    calculateCourseChapterTime,
    calculateCourseDuration,
    calculateNumberOfLectures,
    currency
  } = useContext(AppContext)

  const fetechCourseData = () => {
    if (allCourses && allCourses.length > 0) {
      const findCourse = allCourses.find(
        course => course._id.toString() === id
      )
      setCourseData(findCourse)
    }
  }

  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  useEffect(() => {
    fetechCourseData()
  }, [allCourses, id])

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative md:px-24 px-5 md:pt-24 pt-16 items-start">

        {/* background */}
        <div className="absolute top-0 left-0 w-full h-96 -z-10 bg-gradient-to-b from-cyan-100/60 to-transparent"></div>

        {/* LEFT SIDE */}
        <div className="flex-1 max-w-2xl z-10 text-gray-700">

          {/* TITLE */}
          <h1 className="md:text-4xl text-2xl font-bold text-gray-900 leading-tight">
            {courseData?.courseTitle}
          </h1>

          {/* DESCRIPTION PREVIEW */}
          <p
            className="pt-4 text-sm md:text-base text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* RATING */}
          <div className="flex items-center gap-2 pt-4 text-sm">
            <p className="font-semibold text-yellow-600">
              {calculateAverageRating(courseData)}
            </p>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className="w-4 h-4"
                  src={
                    i < Math.floor(calculateAverageRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                />
              ))}
            </div>

            <p className="text-gray-500">
              ({courseData.courseRatings.length} ratings)
            </p>

            <p className="text-gray-500">
              • {courseData.enrolledStudents.length} students
            </p>
          </div>

          <p className="text-sm mt-1">
            Course by <span className="text-blue-600 underline">Great Stack</span>
          </p>

          {/* COURSE STRUCTURE */}
          <div className="pt-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Course Structure
            </h2>

            <div className="pt-5 space-y-3">
              {courseData.courseContent.map((chapter, index) => (
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
                        className={`w-4 transition-transform ${
                          openSection[index] ? "rotate-180" : ""
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
                    className={`transition-all duration-300 overflow-hidden ${
                      openSection[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="border-t bg-gray-50 pl-6 pr-3 py-3 text-sm text-gray-600 space-y-2">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start justify-between gap-2">

                          <div className="flex items-start gap-2">
                            <img
                              src={assets.play_icon}
                              className="w-4 h-4 mt-1"
                              alt="play"
                            />
                            <p>{lecture.lectureTitle}</p>
                          </div>

                          <div className="flex items-center gap-3 text-xs">
                            {lecture.isPreviewFree && (
                              <span className="text-blue-500">Preview</span>
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
          </div>

          {/* DESCRIPTION FULL */}
          <div className="mt-14 bg-white p-6 md:p-8 rounded-xl shadow-sm">

            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Course Description
            </h3>

            <div
              className="pt-4 text-gray-600 leading-relaxed text-sm md:text-base
                         [&_ul]:list-disc [&_ul]:pl-5
                         [&_ol]:list-decimal [&_ol]:pl-5"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription
              }}
            />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-80 lg:w-96 z-10 self-start">

          <div className="bg-white shadow-[0px_4px_15px_2px_rgba(0,0,0,0.08)] sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">

            <img
              src={courseData.courseThumbnail}
              className="w-full object-cover"
              alt="thumbnail"
            />

            <div className="p-5">

              <div className="flex items-center gap-2 text-red-500 text-sm">
                <img src={assets.time_left_clock_icon} className="w-4" />
                <p>5 days left at this price</p>
              </div>

              {/* PRICE */}
              <div className="flex items-center gap-3 pt-3">
                <p className="text-3xl font-bold text-gray-900">
                  {currency} {(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}
                </p>

                <p className="line-through text-gray-400 text-sm">
                  {currency} {courseData.coursePrice.toFixed(2)}
                </p>

                <p className="text-green-600 text-sm">
                  {courseData.discount}% OFF
                </p>
              </div>

              {/* INFO */}
              <div className="flex items-center gap-4 pt-3 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <img src={assets.star} className="w-4" />
                  <p>{calculateAverageRating(courseData)}</p>
                </div>

                <div className="h-4 w-px bg-gray-300"></div>

                <div className="flex items-center gap-1">
                  <img src={assets.time_clock_icon} className="w-4" />
                  <p>{calculateCourseDuration(courseData)}</p>
                </div>

                <div className="h-4 w-px bg-gray-300"></div>

                <div className="flex items-center gap-1">
                  <img src={assets.lesson_icon} className="w-4" />
                  <p>{calculateNumberOfLectures(courseData)} lessons</p>
                </div>
              </div>

              {/* BUTTON */}
              <button className="mt-5 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                {isAlread_Enrolled ? "Already Enrolled" : "Enroll Now"}
              </button>

              {/* FEATURES */}
              <div className="pt-6 text-sm text-gray-600">
                <p className="font-semibold text-gray-900">
                  What's in the course?
                </p>

                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Lifetime access</li>
                  <li>Step-by-step projects</li>
                  <li>Quizzes & practice</li>
                  <li>Certificate</li>
                </ul>
              </div>

              

            </div>
          </div>

        </div>

      </div>


      <Footer />
    </>
  ) : <Loading />
}

export default CourseDetails