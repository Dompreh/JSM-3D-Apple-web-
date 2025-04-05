import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils'
import { navLists } from '../constants'

function Navbar() {
    return (
        <header className='w-full py-5 px-5 sm:px-10 flex justify-between items-center '>
            <nav className='flex w-full screen-max-width'>
                <img src={appleImg} alt="Apple Image" width={14} height={18} />

                <div className='flex justify-center flex-1 max-sm:hidden'>
                    {navLists.map((nav) => (
                        <div key={nav} className='px-5 text-gray hover:text-white cursor-pointer text-sm transition-all'>
                            {nav}
                        </div>
                    ))}
                </div>
                <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
                    <img src={searchImg} alt="search" width={18} height={18} />
                    <img src={bagImg} alt="bag" width={18} height={18} />
                </div>
            </nav>
        </header>
    )
}

export default Navbar