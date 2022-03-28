import React from 'react'

interface IDeleteModal{
    isShow?: boolean;
    setIshow: React.Dispatch<React.SetStateAction<boolean>>;
    deleteHandler: () => Promise<void>;
}

const DeleteModal = ({isShow = false, setIshow, deleteHandler}: IDeleteModal) => {
  return (
    isShow?
    <div className='flex justify-center items-center bg-gray-900/50 absolute top-0 left-0 w-full h-full'>
        <div className="px-6 py-4 bg-white rounded">
            <h3 className='mb-4'>Are you sure you want to delete this article?</h3>
            <button className='bg-red-600 text-white hover:opacity-60 px-6 py-1 rounded mr-2' onClick={deleteHandler}>Delete</button>
            <button className='bg-gray-400 text-white hover:opacity-60 px-6 py-1 rounded' onClick={()=>{setIshow(false)}}>Cancel</button>
        </div>
    </div>:
    null
  )
}

export default DeleteModal