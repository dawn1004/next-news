import React from 'react'
import { MenuIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useRouter } from 'next/router'

interface INavBar{
    isAdmin: boolean
}

const NavBar = ({isAdmin}: INavBar) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className='border-b py-4 lg:px-0 px-4 flex justify-center'>
            <div className='container flex md:flex-row flex-col md:justify-between'>
                
                <div className='flex justify-between items-center'>   
                    <a href="#" className='font-medium text-3xl'>
                        <span className='text-primary'>next</span>
                        <span>{isAdmin? 'Admin': 'News'}</span>
                    </a>
                    <div 
                        className='md:hidden cursor-pointer'
                        onClick={()=>{setIsOpen(oldVal => !oldVal)}}
                    >
                        <MenuIcon className='w-10 h-10'/>
                    </div> 
                </div>

                {
                    isAdmin?
                    <></>:
                    <div className={`flex md:flex-row flex-col md:items-center md:justify-center overflow-hidden ${isOpen? '': 'h-0'} md:h-auto`}>
                        <ul className='flex md:flex-row flex-col md:items-center md:mr-6 font-medium md:mt-0 mt-6'>
                            <li onClick={()=>{router.push('/')}} className='md:mr-6 md:mb-0 mb-2'>About Us</li>
                            <li onClick={()=>{router.push('/')}} className='md:mb-0 mb-2'>Articles</li>
                        </ul>          
                        <button 
                            onClick={()=>{router.push('/')}}
                            className='bg-primary px-6 py-2 rounded-md text-white'
                        >
                            Trending News
                        </button>
                    </div>
                }

            </div>

        </div>
    )
}

export default NavBar