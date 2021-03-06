import { NextPage, NextPageContext } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Layout from '../../components/Layout'
import request from '../../services/request'
import { Article } from '../../services/types'

const Article: NextPage<InitialProps> = ({headData}) => {
    const router = useRouter()
    const {slug} = router.query
    const [article, setArticle] = useState<Article | null>()
    const [notFound, setNotFound] = useState<boolean>(false)

    
    useEffect(() => {
        if(article==null && slug){
            getArticle()
        }
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
    }

    return (
        !notFound?
        <Layout head={headData}>
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

interface InitialProps{
    headData?: Article;
    error?: string;
}

Article.getInitialProps = async (ctx: NextPageContext): Promise<InitialProps> => {
    const slug = ctx.asPath?.split("/articles/").join("")

    if(slug){
        const articlesResponse: Article = await request.getArticlesBySlug(slug)
        console.log(articlesResponse)
        return {headData: articlesResponse}
    }

    return {error: "no article found"}
} 

export default Article