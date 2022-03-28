import React from 'react'
import Image from 'next/image'
import Spinner from "../../assets/images/spinner.gif"

interface ILoadingOverlay{
    isShow?: boolean;
}

const LoadingOverlay = ({isShow = false}: ILoadingOverlay) => {
  return (
    isShow?
    <div className='flex justify-center items-center bg-gray-900/50 absolute top-0 left-0 w-full h-full z-50'>
        <div className="w-60">
            <Image src={Spinner} />
        </div>
    </div>:
    null
  )
}

export default LoadingOverlay