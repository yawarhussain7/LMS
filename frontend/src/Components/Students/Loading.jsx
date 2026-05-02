import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
      <div className="relative flex items-center justify-center">
        
        {/* Outer Spinner */}
        <div className="w-20 h-20 rounded-full border-4 border-transparent 
        border-t-blue-500 border-r-purple-500 animate-spin"></div>

        {/* Glow Ring */}
        <div className="absolute w-20 h-20 rounded-full blur-sm opacity-70 
        border-4 border-transparent border-t-blue-400 border-r-purple-400 animate-spin"></div>

        {/* Center Dot */}
        <div className="absolute w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>

      </div>

    </div>
  )
}

export default Loading