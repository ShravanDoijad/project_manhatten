import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const Text = ({ text1, text2 }) => {
  const txtRef = useRef()

  useEffect(() => {
    gsap.from(txtRef.current, {
      opacity: 0,
      x: -20,
      duration: 1,
      delay: 0.5
    })
  }, []) 

  return (
    <>
      <h1 ref={txtRef} className=' w-60 justify-center items-center  gap-2 border-[2px] border-amber-700 rounded-[3px] flex montserrat text-md'>
        
        <span className='text-amber-700'>{text1}</span>
        <span className='text-amber-700'>{text2}</span>
      </h1>
      
      <hr className='w-full ' />
    </>
  )
}

export default Text
