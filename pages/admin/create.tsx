import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import React from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import request from '../../services/request'


const create = () => {
    const router = useRouter()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isReadyToSave, setIsReadyToSave] = useState<boolean>(false);
    const [articleFormData, setArticleFormData] = useState({
        title: "",
        origSizeImgUrl: "",
        thumbSizeImgUrl: "",
        body: "",
        author: ""
    })

    useEffect(() => {
        console.log(selectedFile)
    }, [selectedFile])

    useEffect(() => {
        if(isReadyToSave){
            createArticle()
            setIsReadyToSave(false);
        }
    }, [articleFormData, isReadyToSave])
  

    // Call endpoint to save to create new article
    const createArticle = async () => {
        const createdArticle: any = await request.createArticle(articleFormData);
        console.log('article:',createdArticle)
    }


    const inputFileOnchangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files
        if(files?.length){
            setSelectedFile(files[0]);
        }else{
            setSelectedFile(null);
        }
    }

    const cloudinaryImgUpload = async (): Promise<string> => {

        if(selectedFile){
            const formData = new FormData()
            formData.append("file", selectedFile)
            formData.append("upload_preset", "next-news-uploads")

            const res =  await axios.post("https://api.cloudinary.com/v1_1/dmbclesa4/image/upload", formData)
            const {data} = await res
            let securedUrl = ""
            if(data){
                securedUrl = data.secure_url
            }
            return securedUrl
        }

        return ""
    } 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const imgUrl = await cloudinaryImgUpload()
        
        if(imgUrl === "" || !imgUrl ){
            alert("img is required")
            return 
        }

        setArticleFormData((val)=>{return{...val, origSizeImgUrl : imgUrl, thumbSizeImgUrl: imgUrl.split('image/upload').join('image/upload/w_400')}})
        setIsReadyToSave(true)
    }

    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, target: string) => {
        switch (target) {
            case "title":
                setArticleFormData((val)=>{return{...val, title: e.target.value}})
                break;
            case "author":
                setArticleFormData((val)=>{return{...val, author: e.target.value}})
                break;
            case "body":
                setArticleFormData((val)=>{return{...val, body: e.target.value}}) 
                break;
            default:
                break;
        }
    }

    return (
        <Layout isAdmin={true} >
            <>
                <div className='flex items-center mb-4'>
                <ArrowNarrowLeftIcon 
                    className='w-6 h-6 mr-2 cursor-pointer hover:text-gray-700'
                    onClick={()=>{router.push("/admin")}}
                />
                <h1 className='font-medium text-xl'>Create News Article</h1>
                </div>

                <form 
                    className="w-full border-t pt-8"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-wrap -mx-3 mb-6">

                        <div className="flex flex-wrap -mx-3 mb-6 w-full">
                            <div className="w-full px-3">
                                <label 
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Title
                                </label>
                                <input 
                                    onChange={(e)=> {onChangeInputHandler(e, "title")}}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    placeholder="Eg: Philippine Election 2022" 
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 w-full">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Author
                                </label>
                                <input
                                    onChange={(e)=> {onChangeInputHandler(e, "author")}}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    placeholder="John Doe" 
                                />
                                {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 w-full">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Body
                                </label>
                                <textarea
                                    onChange={(e)=> {onChangeInputHandler(e, "body")}}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    rows={10}
                                    placeholder="Write your article here..." 
                                />
                                {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 w-full">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Image
                                </label>
                                <input 
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    placeholder="Image Upload"
                                    onChange={inputFileOnchangeHandler}
                                />
                                {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                            </div>
                        </div>


                        <div className="flex flex-wrap -mx-3 mb-6 w-full">
                            <div className="w-full px-3">
                                <button 
                                    type='submit'
                                    className='text-white bg-primary hover:opacity-60 px-10 py-2 rounded'
                                >
                                    Save
                                </button>
                                <button 
                                    onClick={()=>{router.push("/admin")}}
                                    className='text-white bg-red-600 hover:opacity-60 px-10 py-2 rounded ml-3'
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>


                    </div>
                </form>
            </>
        </Layout>
    )
}

export default create