import { createContext, useEffect,useState } from "react"
const AppContext = createContext()
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

const AppContextProvider =({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);

    
    // Fetch all courses and set to state
    const FetchAllCourses = async ()=>{
        try{
            setAllCourses(dummyCourses)
        }catch(err){
                console.error("Error fetching courses:", err);
        }
    }

    // Funcatoin to calculate average rating of a course
    const calculateAverageRating = (course)=>{
      
        if(course.courseRatings.length===0){
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating=>{
            totalRating += rating.rating;
        })
        return (totalRating / course.courseRatings.length).toFixed(1);
    }

    // function to calculate course chapter time
    const calculateCourseChapterTime = (chapter)=>{
        let time = 0;
        chapter.chapterContent.map((lecture)=>{
            time += lecture.lectureDuration
            
        })
        return humanizeDuration(time* 60 * 1000, {units:['h','m']})
    }
    //funcation to calculate course duration
    const calculateCourseDuration = (course)=>{
        let time = 0;
        course.courseContent.map((chapter)=>{
           chapter.chapterContent.map((lecture)=>{
            time += lecture.lectureDuration
           })
        })
        return humanizeDuration(time* 60 * 1000, {units:['h','m']})
    }
// function to calculate number of lectures in a course
const calculateNumberOfLectures = (course)=>{
    let total_lectures = 0
     course.courseContent.map((chapter)=>{
        if(Array.isArray(chapter.chapterContent)){
            total_lectures += chapter.chapterContent.length
        }
     });
    return total_lectures
}
    useEffect(()=>{
        FetchAllCourses()
    },[])
    
    const value = { currency, allCourses, navigate, calculateAverageRating,calculateCourseChapterTime,calculateCourseDuration,calculateNumberOfLectures,isEducator,setIsEducator }


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export  {AppContext, AppContextProvider}