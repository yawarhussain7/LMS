import { createContext, useEffect,useState } from "react"
const AppContext = createContext()
import { dummyCourses } from "../assets/assets";

const AppContextProvider =({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;
    const [allCourses, setAllCourses] = useState([]);

    
    // Fetch all courses and set to state
    const FetchAllCourses = async ()=>{
        try{
            setAllCourses(dummyCourses)
            
        }catch(err){
                console.error("Error fetching courses:", err);
        }
    }

    useEffect(()=>{
        FetchAllCourses()
    },[])
    
    const value = { currency, allCourses }


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export  {AppContext, AppContextProvider}