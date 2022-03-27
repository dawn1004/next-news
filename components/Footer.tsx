import React from 'react'

const Footer = () => {
  return (
    <footer className='flex border-t justify-center items-center py-6'>
        <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        >
        Created with love by
        <span className='text-primary ml-1 font-medium uppercase'>
            Dawn {':)'}
        </span>
        </a>
    </footer>
  )
}

export default Footer