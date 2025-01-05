import React from 'react'

const page = () => {
  return (
    <div className='h-98 w-98 flex items-center justify-center mt-2'>
         <video width="1000" autoPlay controls>
        <source src="https://firebasestorage.googleapis.com/v0/b/osc-official-b3cab.appspot.com/o/files%2FWhatsApp%20Video%202025-01-05%20at%2010.24.27%20PM.mp4?alt=media&token=c0e973d6-277a-4d62-af03-31d6adaebe2b" type="video/mp4" />
        Your browser does not support the video tag.
        
      </video>
    </div>
  )
}

export default page