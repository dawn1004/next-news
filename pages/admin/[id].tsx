import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import React from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import request from '../../services/request'
import { Article, CreateArticleBody } from '../../services/types'
import LoadingOverlay from '../../components/loading/LoadingOverlay'
import { toast } from 'react-toastify';


const UpdateArticle = () => {
    const router = useRouter()
    const {id} = router.query
    const [articleFormData, setArticleFormData] = useState({
        title: "",
        body: "",
        author: ""
    })
    const [article, setArticle] = useState<Article>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
  
    useEffect(() => {
        if(id) setInitailArticleValue()
    }, [id])
    

    const setInitailArticleValue = async() => {
        setIsLoading(true)
        const article: any = await request.getArticlesById(`${id}`);
        setIsLoading(false)
        console.log(article)
        setArticleFormData({
            title: article.title,
            body: article.body,
            author: article.author
        })
        setArticle(article)
    }

    // Call endpoint to save to create new article
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(id){
            setIsLoading(true)
            const updatedArticle: any = await request.updateArticle(articleFormData, `${id}`);
            setIsLoading(false)
            console.log('updatedArticle:',updatedArticle)
            toast("Successfully update!")
        }
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
                <LoadingOverlay isShow={isLoading} />
                <div className='flex items-center mb-4'>
                <ArrowNarrowLeftIcon 
                    className='w-6 h-6 mr-2 cursor-pointer hover:text-gray-700'
                    onClick={()=>{router.push("/admin")}}
                />
                <h1 className='font-medium text-xl'>Update Article</h1>
                </div>

                <form 
                    className="w-full border-t pt-8"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-wrap -mx-3 mb-6">

                        <div className="flex flex-wrap -mx-3 mb-9 w-full">
                            <div className="w-full px-3">
                                <label 
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Title
                                </label>
                                <input 
                                    onChange={(e)=> {onChangeInputHandler(e, "title")}}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    placeholder="Eg: Philippine Election 2022" 
                                    required
                                    defaultValue={article?.title}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-9 w-full">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Author
                                </label>
                                <input
                                    onChange={(e)=> {onChangeInputHandler(e, "author")}}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    placeholder="John Doe" 
                                    required
                                    defaultValue={article?.author}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-9 w-full">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Body
                                </label>
                                <textarea
                                    onChange={(e)=> {onChangeInputHandler(e, "body")}}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    rows={10}
                                    placeholder="Write your article here..." 
                                    required
                                    defaultValue={article?.body}
                                />
                            </div>
                        </div>


                        <div className="flex flex-wrap -mx-3 mb-9 w-full">
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

export default UpdateArticle