import {useEffect, useState} from 'react'

const Rating = ({initialRating,onRate}) => {
  const [rating,setRating] = useState(initialRating || 0)

  const handleRating = (value)=>{
    setRating(value)
    if(onRate){
      onRate(value)
    }
  }

  useEffect(()=>{
    if(initialRating){
      setRating(initialRating)
    }
  },[initialRating])


  return (
    <>
    {Array.from({length:5},(_,index)=>{
      const startValue = index+1 ;
      return (
        <span onClick={()=>handleRating(startValue)} key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${startValue <= rating ? 'text-yellow-400' : 'text-gray-400'}`}>
          &#9733;
        </span>
      )
    })}
    </>
  )
}

export default Rating