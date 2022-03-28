import Error from 'next/error'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Layout, { Head } from '../../components/Layout'
import request from '../../services/request'
import { Article } from '../../services/types'

const Article = () => {
    const router = useRouter()
    const {slug} = router.query
    const [article, setArticle] = useState<Article | null>()
    const [notFound, setNotFound] = useState<boolean>(false)
    const [head, setHead] = useState<Head>()

    
    useEffect(() => {
        if(article==null && slug){
            getArticle()
        }
        console.log('triggered')
    }, [slug, article])
    

    const getArticle = async () => {
        const articlesResponse: Article = await request.getArticlesBySlug(`${slug}`)
        if(!articlesResponse._id){
            console.log(404)
            setNotFound(true)
        }else{
            setNotFound(false)
        }

        setArticle(articlesResponse)
        setHead({
            title: articlesResponse.title,
            meta: {
                description: articlesResponse.body,
                author: articlesResponse.author
            },
            // icon: articlesResponse.thumbSizeImgUrl,
            img: articlesResponse.thumbSizeImgUrl
        })
    }

    return (
        !notFound?
        <Layout head={head}>
            <div className='container max-w-4xl mx-auto'>
                <h1 className='text-4xl font-medium'>{article?.title}</h1>
                <span className='mt-4 block font-semibold text-blue-700'>{article?.author}</span>
                <span className='mt-1 block text-gray-700'>{article?.published}</span>
                
                <img 
                    src={article?.origSizeImgUrl} 
                    className="w-full mt-4"
                />

                <div className='mt-6 text-justify whitespace-pre-wrap'>
                    {
                        article?.body
                    }
                </div>
            </div>
        </Layout>:
        <Error statusCode={404} />
    )
}

export default Article