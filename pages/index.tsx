import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import NavBar from '../components/NavBar'
import PromoBanner from '../components/PromoBanner'
import styles from '../styles/Home.module.css'
import request from '../services/request';
import { useState } from 'react'
import { Article } from '../services/types'
import { SearchIcon } from '@heroicons/react/solid'
import Pagination from '../components/Pagination'
import LoadingOverlay from '../components/loading/LoadingOverlay'
import SearchNotFound from '../assets/images/search_not_found.png'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10)
  const [page, setPage] = useState<number>(0)
  const [totalArticles, setTotalArticles] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    getNews()
  }, [page])

  const getNews =async () => {
    const articlesResponse: any = await request.getArticles({page, pageSize, search})

    setTotalArticles(articlesResponse.totalArticles)
    setArticles(articlesResponse.articles)
    setIsLoading(false)
  }

  const searchInputHandler = ({target}: {target: EventTarget & HTMLInputElement}) => {
    setSearch(target.value)
  }

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === "Enter"){
      setIsLoading(true)
      getNews()
    }
  }

  return (
    <Layout>
      <>
        <LoadingOverlay isShow={isLoading} />
        <div className='flex flex-col justify-center items-center mb-14'>
          <h1 className='font-medium text-7xl text-center'>
              <span className='text-primary'>next</span>
              <span>News</span>
          </h1>
          <div className='flex w-3/5 items-center justify-center relative rounded border mt-6'>
            {/* <div className='w-10 h-full bg-red-500'>as</div> */}
            <div className='px-3'>
              <SearchIcon className='w-5 h-5 text-gray-900' />
            </div>
            <input 
              type="text" 
              className='px-2 py-2 w-full' 
              onChange={searchInputHandler}
              onKeyUp={onSearch}
            />          
          </div>
        </div>

        <div className='container mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pt-6 gap-4'>
          {articles.map((article, idx) => 
            <div 
              key={idx} 
              className="rounded overflow-hidden h-72 transition duration-500 ease-in-out transform hover:scale-90 cursor-pointer relative"
              onClick={()=>{router.push(`/articles/${article.slug}`)}}
            >
              <img 
                className='w-full h-full object-cover'
                src={article.thumbSizeImgUrl}
              />
              <div className='absolute h-full w-full top-0 bg-gradient-to-t from-gray-800/80 to-transparent'>
                <div className='absolute w-full bottom-0 px-4 py-2 flex flex-col text-white'>
                  <span>{article.title}</span>
                  <span className='text-xs '>{article.published}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {
          articles.length >= 1 && totalArticles/pageSize >= 1? 
          <div className='mt-14'>
            <Pagination totalPages={totalArticles/pageSize} page={page} onChange={(selected)=> {setPage(selected.selected)}}  isLoading={isLoading} />
          </div>:
          null
        }
        {
          (articles.length > 0 || isLoading)? 
          null:
          <div className='flex flex-col items-center justify-center'>
            <Image src={SearchNotFound} width={200} height={200}/>
            <span>No results found for '{search}'.</span>
          </div>
        }
      </>
    </Layout>
  )
}

export default Home
