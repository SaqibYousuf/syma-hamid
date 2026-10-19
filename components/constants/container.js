import React from 'react'

function Container({ children }) {
    return (
        <div className='md:px-6  px-3 w-full flex-1 relative py-20'>
            <div className='max-w-[1720px] mx-auto  w-full'>
                {children}  
            </div>
        </div>
    )
}

export default Container
