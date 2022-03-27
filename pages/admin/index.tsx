import { PlusIcon } from '@heroicons/react/solid'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ArticlesTable from '../../components/ArticlesTable'
import Layout from '../../components/Layout'
import request from '../../services/request'
import { Article } from '../../services/types'
import { useRouter } from 'next/router'

const admin = () => {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getNews()
  }, [])
  

  const getNews =async () => {
    const articlesResponse: any = await request.getArticles();
    setArticles(articlesResponse)
  }

  return (
    <Layout isAdmin={true} >
        <>
          <div className='flex justify-end mb-4'>
            <button 
              onClick={()=>{router.push("admin/create")}}
              className='flex px-10 py-2 bg-primary hover:opacity-70 cursor-pointer text-white rounded'
            >
              <div className='mr-2'>
                Create Article
              </div>
            </button>
          </div>

          <ArticlesTable articles={articles} />
        </>
    </Layout>
  )
}

export default admin