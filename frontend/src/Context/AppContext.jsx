import { createContext, useEffect,useState } from "react"
const AppContext = createContext()
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

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

    useEffect(()=>{
        FetchAllCourses()
    },[])
    
    const value = { currency, allCourses, navigate, calculateAverageRating,isEducator,setIsEducator }


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export  {AppContext, AppContextProvider}