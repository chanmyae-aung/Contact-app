import React from 'react'

const BaseLayout = ({children}) => {
  return (
    <div className=' flex flex-col w-96 mx-auto h-screen justify-center'>
        {children}
    </div>
  )
}

export default BaseLayout