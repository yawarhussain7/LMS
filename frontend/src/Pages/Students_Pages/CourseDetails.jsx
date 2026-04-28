import React from 'react'
import {useParams} from 'react-router-dom'

const CourseDetails = () => {

const {id} = useParams()


  return (
    <h1>CourseDetails</h1>
  )
}

export default CourseDetails