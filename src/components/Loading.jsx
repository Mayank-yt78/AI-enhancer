import React from 'react'

function Loading() {
  return (
    <div className='flex justify-center items-center h-[80%]'>
        <div className='animate-spin border-dashed border-t-transparent border-4 w-12 h-12 scale-180 rounded-full border-red-200'></div>
    </div>
  )
}

export default Loading